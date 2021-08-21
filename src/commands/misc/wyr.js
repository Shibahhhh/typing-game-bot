const color = require('../../config/color.json')
const { MessageEmbed } = require("discord.js");
const wyr = require("../../utils/wyr/wyr.json")


module.exports = {
    name: 'wyr',
    description: `would you rather`,
    aliases: [],
    userpermissions: [],
    cooldown: 5,
    args: true,
    async execute(client, message, args) {
        let question = wyr[Math.floor(Math.random() * wyr.length)]
        const embed = new MessageEmbed()
            .setTitle(`Would you rather?`)
            .setDescription(question)
            .setColor(color.normal)
       message.channel.send({embeds: [embed]});

    },
};