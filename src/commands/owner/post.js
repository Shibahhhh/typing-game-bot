const Statcord = require("statcord.js");


module.exports = {
    name: 'post',
    description: `post stats`,
    aliases: [],
    userpermissions: [],
    cooldown: 5,
    args: true,
    devOnly: true,
    async execute(client, message, args) {
        Statcord.ShardingClient.post(client);
        message.channel.send(`Posting`)
    },
};