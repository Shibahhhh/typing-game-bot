
// const Blacklist = require('../../utils/schema/blacklist_schema')
// const mongoose = require('mongoose')
// const { fail, success } = require('../../config/emojis.json')
// const color = require('../../config/color.json')
// // const config = require('../../config/config.json')
// const rgx = /^(?:<@!?)?(\d+)>?$/;
// const premium = require('../../utils/schema/premium_server_schema')
// const { MessageEmbed } = require("discord.js");
// const { normal } = require('../../config/color.json')
// const currentGames = {};
// const gameconfig = require('../../config/game.json')
// const {insertSpaces} = require('../../utils/utils')

const fetch = require("node-fetch");
const atob = require('atob')
const discord = require('discord.js')
module.exports = {
    name: 'test',
    description: `Testing commands`,
    aliases: [],
    userpermissions: [],
    cooldown: 5,
    args: true,
    devOnly: true,
    async execute(client, message, args) {
        let embed = new Discord.MessageEmbed()
        .setTitle('test')
        let msg = awaitmessage.channel.send({embeds: [embed]});
        let test = new Discord.MessageEmbed()
        .setTitle('testing')
        msg.edit({embeds: [test]})
    },
};