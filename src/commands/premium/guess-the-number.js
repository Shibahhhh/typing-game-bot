const { MessageEmbed, MessageCollector } = require("discord.js");
const { normal } = require('../../config/color.json')
const currentGames = {};
const gameconfig = require('../../config/game.json')
const {fail, success} = require('../../config/emojis.json')

module.exports = {
    name: 'guess',
    description: `Guess a number`,
    aliases: ['gu'],
    userpermissions: [],
    cooldown: 5,
    args: true,
    premiumOnly: true,
    async execute(client, message, args) {

        if (currentGames[message.guild.id]) {
            const errrembed = new MessageEmbed()
                .setTitle(`There already a game running!`)
                .setColor(normal)
            return message.channel.send(errrembed)
        }
        const amount = parseInt(args[0]);
        if (isNaN(amount) === true || !amount || amount < 5 || amount > 1001) return message.channel.send(`${fail} Please provide a number limit. Must be between 5-1000!`);
    
        const participants = [];
        const number = Math.floor(Math.random() * amount);

        const startembed = new MessageEmbed()
            .setTitle('Game Starting!')
            .setDescription(`Number is between 1-${amount}`)
            .setColor(normal)
        message.channel.send({embeds: [startembed]});
 

        const collector = new MessageCollector(
            message.channel,
            m => !m.author.bot,
            {
                time: 480000 // 8 minutes
            }
        );
        currentGames[message.guild.id] = true;

        collector.on("collect", async msg => {
            if (!participants.includes(msg.author.id)) {
                participants.push(msg.author.id);
            }

            // if it's not a number, return
            if (isNaN(msg.content)) {
                return;
            }

            const parsedNumber = parseInt(msg.content, 10);

            if (parsedNumber === number) {
                let endembed = new MessageEmbed()
                    .setTitle('Game Over')
                    .setDescription(`Winner: **${msg.author.toString()}**`)
                    .addField("Participants", `**${participants.length}**`)
                    .addField(`Number:`, `**${number}**`)
                    .setColor(normal)
                message.channel.send({embeds: [endembed]});
                collector.stop(msg.author.username);
            }
        });

        collector.on("end", (_collected, reason) => {
            delete currentGames[message.guild.id];
            if (reason === "time") {
                let endembed = new MessageEmbed()
                    .setTitle('Game Over')
                    .setDescription(`Number: **${number}**`)
                    .addField("Participants", `**${participants.length}**`)
                    .setColor(normal)
                return message.channel.send({embeds: [endembed]});
            }
        });

    },
};