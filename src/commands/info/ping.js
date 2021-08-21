const { MessageEmbed } = require("discord.js");
const { pong } = require('../../config/emojis.json')
const color = require('../../config/color.json')

module.exports = {
  name: 'ping',
  description: `Gets bot's current latency and API latency.`,
  // aliases: [],
  userpermissions: [],
  cooldown: 5,
  async execute(client, message) {
    const embed = new MessageEmbed()
      .setDescription('`Pinging...`')
      .setColor(color.normal)
    let msg = await message.channel.send({embeds: [embed]});
    const timestamp = (message.editedTimestamp) ? message.editedTimestamp : message.createdTimestamp; // Check if edited
    const latency = `\`${Math.floor(msg.createdTimestamp - timestamp)}ms\``;
    const apiLatency = `\`${Math.round(message.client.ws.ping)}ms\``;
    embed.setTitle(`${pong} Pong!`)
      .setDescription(`Shard ${message.guild.shardID}`)
      .addField('Latency', latency, true)
      .addField('Websocket', apiLatency, true)
      .setFooter(message.member.displayName, message.author.displayAvatarURL({ dynamic: true }))
      .setTimestamp();
    msg.edit({ embeds: [embed] });

  },
};
