const { fail, success } = require('../../config/emojis.json')
const mongoose = require('mongoose')
const color = require('../../config/color.json')
const { MessageEmbed } = require('discord.js')
const config = require('../../config/config')
const rgx = /^(?:<@!?)?(\d+)>?$/;
const premium = require('../../utils/schema/premium_server_schema')

const day = require('dayjs')

module.exports = {
    name: 'premium',
    description: `premium command`,
    aliases: ['prem'],
    usage: "prem [year]-[month]-[day]",
    userpermissions: [],
    args: true,
    cooldown: 5,
    devOnly: true,
    async execute(client, message, args) {
        if (!args[0]) return message.channel.send('Please provide a valid server ID');
        const guildId = args[0];
        // const guild = client.shard.broadcastEval(`this.guilds.cache.get(${guildId})`);
        // if (!guild) return message.channel.send('Unable to find server, please check the provided ID');

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
        let reason = args.slice(1).join(" ")
        if (!reason) reason = 'No reason given';

        const embed = new MessageEmbed()
            .setTitle("Premium Panel")
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
                    let server = await premium.findOne({
                        serverID: guildId,
                    })
                    if (server) return message.channel.send('Server already has premium')
                    if (args[1]) {
                        const time = day(args[1]).valueOf()
                        server = await new premium({
                            _id: mongoose.Types.ObjectId(),
                            serverID: guildId,
                            date: args[1],
                            time: time,
                            perm: false,
                            reason: reason,
                            prefix: 'tg!',
                        }).save()
                    } else {
                        server = await new premium({
                            _id: mongoose.Types.ObjectId(),
                            serverID: guildId,
                            date: "forever",
                            time: 0,
                            perm: true,
                            reason: reason,
                            prefix: 'tg!',
                        }).save()
                    }
                    try {
                        message.channel.send(`${success} Given premium to \`${guildId}\`!`)
                    } catch (err) {
                        console.log(err)
                        message.channel.send(`${fail}server was not given premium`)
                    }

                } if (reaction.emoji.name === '📤') {
                    await rea.reactions.removeAll()
                    let server = await premium.findOne({
                        serverID: guildId,
                    })
                    let data = await prefix.findOne({
                        serverID: message.guild.id
                    });
                    if (!data) message.channel.send('No prefix data')
                    if (!server) return message.channel.send('Server does not have premium')
                    try {
                        if (data) data.delete()
                        await server.delete()
                        message.channel.send(`${success} Removed premium from \`${guildId}\`!`)
                    } catch (err) {
                        console.log(err)
                        message.channel.send(`${fail} server was not removed from premium`)
                    }
                }

            }).catch(() => {
                return message.channel.send("Timeout")
            })

    },
}