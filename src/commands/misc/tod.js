
// const { fail, success } = require('../../config/emojis.json')
const color = require('../../config/color.json')
// // const config = require('../../config/config.json')
const { MessageEmbed } = require("discord.js");
const truth = require("../../utils/tod/truths/truths.json")
const dares = require("../../utils/tod/dares/dares.json")

    module.exports = {
        name: 'tod',
        description: `truth or dare`,
        aliases: [],
        userpermissions: [],
        cooldown: 5,
        args: true,
        async execute(client, message, args) {
            const embed = new MessageEmbed()
                .setTitle(`Truth or Dare?`)
                .setColor(color.normal)
            let msg = awaitmessage.channel.send({embeds: [embed]});
            msg.react("🇹")
            msg.react("🇩")
            const filter = (reaction, user) => {
                return ['🇹', '🇩'].includes(reaction.emoji.name) && user.id === message.author.id;
            };
            msg.awaitReactions(filter, { max: 1, time: 60000, errors: ['time'] })
                .then(async collected => {
                    const reaction = collected.first();

                    if (reaction.emoji.name === '🇹') {
                        await msg.reactions.removeAll()
                        let question = truth[Math.floor(Math.random() * truth.length)]
                        const tembed = new MessageEmbed()
                            .setTitle('Truth')
                            .setDescription(question)
                            .setColor(color.normal)
                        msg.edit({embed: tembed});
                    }
                    if (reaction.emoji.name === '🇩') {
                        await msg.reactions.removeAll()
                        let question = dares[Math.floor(Math.random() * dares.length)]
                        const dembed = new MessageEmbed()
                            .setTitle('Dare')
                            .setDescription(question)
                            .setColor(color.normal)
                        msg.edit({embed:dembed});
                    }
                }).catch(() => {
                    return message.channel.send("Timeout")
                })
        },
    };