const { MessageEmbed, MessageCollector } = require("discord.js");
const { normal } = require('../../config/color.json')
const currentGames = {};
const gameconfig = require('../../config/game.json')

module.exports = {
    name: 'sports',
    description: `starts a word game on the topic of sports`,
    // aliases: [],
    userpermissions: [],
    cooldown: 5,
    args: true,
    async execute(client, message, args) {

        if (currentGames[message.guild.id]) {
            const errrembed = new MessageEmbed()
                    .setTitle(`There already a game running!`)
                    .setColor(normal)
                return message.channel.send(errrembed)
        }
        // Reads words file
        const wordList = require('../../utils/words/sports.json');

        // Init some utils variables
        const participants = [],
            winners = [],
            words = [],
            nbGames = gameconfig.sports;

        for (let i = 0; i < nbGames; i++) {
            const result = Math.floor((Math.random() * wordList.length));
            words.push(wordList[result].toLowerCase());
        }

        let i = 0; // Inits i variable to count games
        currentGames[message.guild.id] = true; // Update current game variable
        generateGame.call(this, words[i]); // Generate a new round

        function generateGame(word) {
            word = word.toLowerCase();

            // Launch timer
            const delay = (i === 0) ? 5000 : 3000;
            if (i === 0) {
                const startembed = new MessageEmbed()
                    .setTitle('Game Starting!')
                    .setColor(normal)
                message.channel.send({embeds: [startembed]});
            }

            setTimeout(() => {
                const wordembed = new MessageEmbed()
                    .setTitle(`New word is **\`${word}\`**`)
                    .setColor(normal)
                message.channel.send(wordembed, false, false, "warn")

                // init a collector to receive the answers
                const collector = new MessageCollector(message.channel, (m) => !m.author.bot, {
                    time: 30000
                });

                collector.on("collect", (msg) => {
                    if (!participants.includes(msg.author.id)) {
                        participants.push(msg.author.id);
                    }
                    if (msg.content.toLowerCase() === word.toLowerCase()) {
                        collector.stop(msg.author.id); // Stop the collector
                    }
                });

                collector.on("end", async (collected, reason) => {
                    if (reason === "time") {
                        message.channel.send('**No one answered in time**')
                    } else {
                        const embed = new MessageEmbed()
                            .setColor(normal)
                            .setTitle(`${message.author.username} answered first`)
                        message.channel.send({embeds: [embed]});
                        winners.push(reason);
                    }
                    if (i < nbGames - 1) {
                        i++;
                        generateGame.call(this, words[i]);
                    } else {
                        currentGames[message.guild.id] = false;
                        if (winners.length < 1) {
                            let endembed = new MessageEmbed()
                                .setTitle('Game Over')
                                .setDescription(`No Winners`)
                                .setColor(normal)
                            return message.channel.send({embeds: [endembed]});
                        }
                        const winnerID = await getWinner(winners);
                        const user = await client.users.fetch(winnerID);
                        let endembed = new MessageEmbed()
                            .setTitle('Game Over')
                            .setDescription(`Winner: **${user.username}**`)
                            .addField("Participants", `**${participants.length}**`)
                            .setColor(normal)
                        message.channel.send({embeds: [endembed]});
                    }
                });
            }, delay);
        }

        async function getWinner(array) {
            return new Promise(function (resolve) {
                const counts = {};
                let compare = 0;
                let mostFrequent;
                for (let i = 0, len = array.length; i < len; i++) {
                    const winner = array[i];
                    if (!counts[winner]) {
                        counts[winner] = 1;
                    } else {
                        counts[winner] = counts[winner] + 1;
                    }
                    if (counts[winner] > compare) {
                        compare = counts[winner];
                        mostFrequent = array[i];
                    }
                }
                resolve(mostFrequent);
            });
        }
    },
};