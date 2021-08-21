const color = require('../../config/color.json')
const { MessageEmbed } = require('discord.js')
const premium = require('../../utils/schema/premium_server_schema')

module.exports = {
    name: 'premium-status',
    description: `Shows the server's premium status`,
    aliases: ['status'],
    userpermissions: [],
    cooldown: 5,
    args: true,
    devOnly: true,
   async execute(client, message, args) {
        let server = await premium.findOne({
            serverID: message.guild.id
        })
        let status;
        let time;
        if (!server) {
            status = 'False'
            time = 'N/A'
        } else {
            status = 'True'
            time = server.date
        }
        const embed = new MessageEmbed()
            .setTitle('Premium')
            .setDescription(`${status}`)
            .addField('Time', time)
            .setColor(color.normal);
       message.channel.send({embeds: [embed]});
    },
};