const { MessageEmbed } = require("discord.js");
const pkg = require('../../../package.json');
const config = require('../../config/config')
const {owner}= require('../../config/emojis.json')
const color = require('../../config/color.json')
const {stripIndent } = require("common-tags");
const prefixx = require("../../utils/schema/premium_server_schema")
const prettyMilliseconds = require("pretty-ms");

module.exports = {
  name: 'bot-info',
  description: `Shows bot's information.`,
  aliases: ['bot', 'botinfo'],
  userpermissions: [],
  guildOnly: true,
  cooldown: 7,
  async execute(client, message) {


    const tech = stripIndent`
    Version     -- ${pkg.version}
    Library     -- Discord.js v12.5.3
    Environment -- Node.js v15.14.0
    Uptime      -- ${prettyMilliseconds(client.uptime)}
  `;

    // const promises = [
    //   client.shard.fetchClientValues('guilds.cache.size'),
    // ];

    // Promise.all(promises)
    //   .then(results => {
    //     const totalGuilds = results.reduce((acc, guildCount) => acc + guildCount);
    // const guilds = await client.shard.fetchClientValues("guilds.cache.size").reduce((a,b)=> a + b)
    client.shard.fetchClientValues('guilds.cache.size')
      .then(results => {
        const guilds = (`${results.reduce((acc, guildCount) => acc + guildCount, 0)} total guilds`);
        const embed = new MessageEmbed()
        .setTitle("Bot Information")
        .addField("Client ID", `\`${message.client.user.id}\``, true)
        .addField(`Developers`, `\`${config.owner.name}\``, true)
        .addField("Tech", `\`${tech}\``)
        .addField("Server Count", guilds.toString(), true)
        // ( client.shard.fetchClientValues("guilds.cache.size")).reduce((a,b)=> a + b).toString()
        // .addField("Server Count", (client.shard.broadcastEval(client => client.guilds.cache.size).then(results => (`${results.reduce((prev, val) => prev + val, 0)}`))), true )
        .setFooter(
          message.member.displayName,
          message.author.displayAvatarURL({ dynamic: true })
        )
        .setTimestamp()
        .setColor(color.normal);
      message.channel.send({ embeds: [embed] })
      }).catch(console.error);
    
  },
};