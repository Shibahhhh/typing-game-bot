const { fail, success } = require('../../config/emojis.json')
const Blacklist = require('../../utils/schema/blacklist_schema')
const mongoose = require('mongoose')
const color = require('../../config/color.json')
const { MessageEmbed } = require('discord.js')
const config = require('../../config/config')

module.exports = {
    name: 'blacklist',
    description: `blacklist command`,
    aliases: ['bl'],
    usage: "bl",
    userpermissions: [],
    args: true,
    cooldown: 5,
    devOnly: true,
    async execute(client, message, args) {
        if (!args[0]) return message.channel.send('Please provide a valid server ID');
        const guildId = args[0];
        client.shard.broadcastEval(async (c, { serverId }) => {
            const server = c.guilds.cache.get(serverId);
            if (server) {
                server.leave().catch(err => {
                    console.log(`there was an error leaving the guild: \n ${err.message}`)
                })
                return true;
            }
            return false;
        }, { context: { serverId: guildId } }).then(sentArray => {
            if (!sentArray.includes(true)) message.channel.send('Unable to find server, please check the provided ID.');

        });
        // const guild = client.shard.broadcastEval(`this.guilds.cache.get(${guildId})`);
        // if (!guild) return message.channel.send('Unable to find server, please check the provided ID');


        let reason = args.slice(1).join(" ")
        if (!reason) reason = 'No reason given';

        const embed = new MessageEmbed()
            .setTitle("Blacklist Panel")
            .setColor(color.normal);
        let rea = await message.channel.send({ embeds: [embed] });
        rea.react("📥")
        rea.react("📤")

        const filter = (reaction, user) => {
            return ['📤', '📥',].includes(reaction.emoji.name) && user.id === message.author.id;
        };
        rea.awaitReactions(filter, { max: 1, time: 60000, errors: ['time'] })
            .then(async collected => {
                const reaction = collected.first();

                if (reaction.emoji.name === '📥') {
                    await rea.reactions.removeAll()
                    let profile = await Blacklist.findOne({
                        serverID: guildId
                    })
                    if (profile) return message.channel.send('Server is already blacklisted')
                    profile = await new Blacklist({
                        _id: mongoose.Types.ObjectId(),
                        serverID: guildId,
                        reason: reason,
                    })
                    try {
                        await profile.save()
                    } catch (err) {
                        console.log(err)
                        return message.channel.send(`${fail} Server was not blacklisted`)
                    }
                    const embed = new MessageEmbed()
                        .setTitle(`${success} Blacklisted \`${guildId}\` from the bot!`)
                        .setColor(color.normal);
                    rea.edit({ embed: embed })
                } if (reaction.emoji.name === '📤') {
                    await rea.reactions.removeAll()
                    let profile = await Blacklist.findOne({
                        serverID: guildId
                    })
                    if (!profile) return message.channel.send('Server is not blacklisted')
                    try {
                        await profile.delete()
                        message.channel.send(`${success} unblacklisted \`${guildId}\`!`)
                    } catch (err) {
                        console.log(err)
                        message.channel.send(`${fail} server was not removed from blacklist`)
                    }
                }
            }).catch(() => {
                return message.channel.send("Timeout")
            })

    },
}