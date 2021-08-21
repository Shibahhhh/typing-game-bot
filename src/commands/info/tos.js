const { fail, success } = require('../../config/emojis.json')
const color = require('../../config/color.json')
const { MessageEmbed } = require('discord.js')
const {stripIndent } = require("common-tags");

module.exports = {
    name: 'tos',
    description: `Typing Games Tos`,
    // aliases: [],
    userpermissions: [],
    cooldown: 5,
    async execute(client, message, args) {
        const embed = new MessageEmbed()
        .setTitle("Bot's TOS")
        .setDescription(stripIndent`
        ***TERMS OF SERVICE***
        ━━━━━━━━━━━━━━━━━━━━━━
        <:dot:839288010990157884> By using, and/or interacting with Typing Game, you will abide by **Discord's TOS**
        <:dot:839288010990157884> You agree to have your **activity(running commands), user id and server id** data cached or stored by our bot. The data are stored with lots of care and only accessible by our management team. The data will not be used outside of discord or against you. **You may request your data and/or get it deleted from our bot by dm-ing any of our bot developers or by making a ticket in our [Support Server](https://discord.gg/9NDFD5GA6n)**
        <:dot:839288010990157884> Our management team has permission to blacklist your Discord server anytime if we believe the server does not follow our TOS.
        <:dot:839288010990157884> You agree that, upon purchasing any perks regarding the bot, you will not chargeback,. Any attempt to chargeback or refund in any way, and that doing so is **prohibited** and will get your server blacklisted from our bot.
        <:dot:839288010990157884>** You understand that these Terms of Service can change at anytime, with or without notice**
        
        :warning: **Breaking any of these Terms might or will result in a server blacklist**
        
        ***You agree with our TOS when using Typing Game***
       `)
        .setFooter(
            message.member.displayName,
            message.author.displayAvatarURL({ dynamic: true })
          )
          .setTimestamp()
          .setColor(color.normal);
         message.channel.send({embeds: [embed]});
    },
};