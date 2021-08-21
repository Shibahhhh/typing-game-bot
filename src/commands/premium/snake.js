// const { MessageEmbed, MessageCollector } = require("discord.js");
const { normal } = require('../../config/color.json')
// const {fail, success} = require('../../config/emojis.json')
const SnakeGame = require('snakecord');

module.exports = {
    name: 'snake',
    description: `Snake game`,
    // aliases: [],
    userpermissions: [],
    cooldown: 5,
    args: true,
    premiumOnly: true,
    async execute(client, message, args) {
        const snakeGame = new SnakeGame({
            title: 'Snake Game',
            color: normal,
            timestamp: false,
            gameOverTitle: "Game Over"
        });
        return await snakeGame.newGame(message);
    },
};