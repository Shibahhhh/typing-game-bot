const { success, fail } = require("../../config/emojis.json");
const premium = require('../../utils/schema/premium_server_schema')
const Discord = require("discord.js");
const mongoose = require('mongoose')
const { error, normal } = require('../../config/color.json')
const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'set-prefix',
    description: `Sets a new prefix`,
    aliases: ['set-pre', 'setprefix', 'setpre', 'prefix'],
    usage: "set_prefix [new prefix]",
    userpermissions: ['MANAGE_GUILD'],
    args: true,
    cooldown: 5,
    premiumOnly: true,
    async execute(client, message, args) {

        if (!args[0]) return message.channel.send(`${fail} Please provide a new prefix!`);

        if (args[0].length > 5) return message.channel.send(`${fail} Your new prefix must be under **5** characters!`);
        let data;
        try {

            data = await premium.findOne({
                serverID: message.guild.id
            });

            if (!data) {
                const failembed = new MessageEmbed()
                    .setAuthor(
                        `${message.author.tag}`,
                        message.author.displayAvatarURL({ dynamic: true })
                    )
                    .setTitle(`${fail} Error`)
                    .setDescription(`An error occured, [Support Server](https://discord.gg/9NDFD5GA6n)`)
                    .setTimestamp()
                    .setColor(error);
                return message.channel.send({embeds: [failembed]});

            } else {


                await premium.updateOne({
                    serverID: message.guild.id,
                    prefix: args[0],
                })

            }
            const embed = new MessageEmbed()
                .setDescription(`${success} The new prefix is now **\`${args[0]}\`**`)
            message.channel.send({embeds: [embed]});
        } catch (err) {
            console.log(err)
        }
    },
}