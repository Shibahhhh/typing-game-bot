const config = require('../../config/config')
const { MessageEmbed } = require('discord.js')
const color = require('../../config/color.json')
const { fail, success } = require('../../config/emojis.json')

module.exports = {
    name: 'restart',
    description: `Changes the bot's function`,
    aliases: ['res'],
    usage: "res",
    userpermissions: [],
    args: true,
    cooldown: 5,
    devOnly: true,
    async execute(client, message, args) {
        const embed = new MessageEmbed()
            .setTitle("Bot Panel")
            .setColor(color.normal);
        let rea = awaitmessage.channel.send({embeds: [embed]});
        rea.react("⏺️")

        const filter = (reaction, user) => {
            return ['⏺️'].includes(reaction.emoji.name) && user.id === message.author.id;
        };
        rea.awaitReactions({filter,  max: 1, time: 60000, errors: ['time'] })
            .then(async collected => {
                const reaction = collected.first();

                if (reaction.emoji.name === '⏺️') {
                    await rea.reactions.removeAll()
                    await message.channel.send(`${success} Shutting Down Bot...`)
                    return client.shard.broadcastEval(client => process.exit())
                }
            }).catch(() => {
                return message.channel.send("Timeout")
            })
    },
}