const { MessageEmbed } = require('discord.js')

module.exports = {
    name: 'perms',
    description: `get perms`,
    aliases: ['perm'],
    userpermissions: [],
    cooldown: 5,
    args: true,
    devOnly: true,
    async execute(client, message, args) {
        if (!args[0]) return message.channel.send('Please provide a valid server ID');
        const guildId = args[0];
        const guild = client.shard.broadcastEval(`this.guilds.cache.get(${guildId})`);
        if (!guild) return message.channel.send('Unable to find server, please check the provided ID');
        if (guild) {
            const perm = guild.me.permissions.toArray()
            const embed = new MessageEmbed()
            .setDescription(`${perm}`)
           message.channel.send({embeds: [embed]});
        } else {
            return message.channel.send(`Not in that Server.`);
        }



    },
};