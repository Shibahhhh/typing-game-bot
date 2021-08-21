const { fail, success } = require('../../config/emojis.json')
const color = require('../../config/color.json')
const { MessageEmbed } = require('discord.js')
const { oneLine } = require('common-tags');
const { readFileSync, writeFileSync } = require('fs')

module.exports = {
    name: 'suggest',
    description: `suggestions for the bot`,
    aliases: ['suggestion'],
    userpermissions: [],
    cooldown: 5,
    args: true,
    async execute(client, message, args) {

        if (!args[0]) return message.channel.send(`${fail} Please provide a message!`);
        let feedback = message.content.slice(message.content.indexOf(args[0]), message.content.length);

        var readmessagefile = readFileSync('./logs/suggest.log', 'utf-8');
        var writemessagefile = writeFileSync('./logs/suggest.log', `Server: ${message.guild.name} | ${message.guild.id}. User: ${message.member} Suggestion: ${feedback}\n` + readmessagefile)



        if (feedback.length > 1024) feedback = feedback.slice(0, 1021) + '...';
        const embed = new MessageEmbed()
            .setTitle('Feedback')
            .setDescription(oneLine`
        Successfully sent feedback! [Support Server](https://discord.gg/9NDFD5GA6n)`)
            .addField('Message', feedback)
            .setTimestamp()
            .setColor(color.normal);
        message.channel.send({embeds: [embed]});
    },
};