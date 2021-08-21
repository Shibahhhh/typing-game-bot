
const color = require('../../config/color.json')
const { MessageEmbed } = require('discord.js')
const fetch = require('node-fetch')
module.exports = {
    name: 'funfact',
    description: `Fun facts`,
    aliases: ['fact', 'ff'],
    userpermissions: [],
    cooldown: 5,
    args: true,
    async execute(client, message, args) {

        fetch('https://no-api-key.com/api/v1/facts')
            .then((res) => res.json())
            .then(async (json) => {
                const embed = new MessageEmbed()
                    .setTitle('Fun Fact')
                    .setDescription(json.fact)
                    .setColor(color.normal);
                return message.channel.send({embeds: [embed]});
            });
    },
};