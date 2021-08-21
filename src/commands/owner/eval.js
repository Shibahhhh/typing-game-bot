
const { fail, success } = require('../../config/emojis.json'),
    config = require('../../config/config')
    Discord = require('discord.js'),
    color = require('../../config/color.json')

module.exports = {
    name: 'eval',
    description: `eval code`,
    aliases: [],
    userpermissions: [],
    cooldown: 5,
    args: true,
    devOnly: true,
    async execute(client, message, args) {
        const content = message.content.split(" ").slice(1).join(" ");
        const result = new Promise((resolve) => resolve(eval(content)));

        return result.then(async (output) => {
            if (typeof output !== "string") {
                output = require("util").inspect(output, { depth: 0 });
            }
            if (output.includes(config.token)) {
                output = output.replace(config.token, "T0K3N");
            }
            message.channel.send(output, {
                code: "js"
            });
        }).catch((err) => {
            err = err.toString();
            if (err.includes(config.token)) {
                err = err.replace(config.token, "T0K3N");
            }
            message.channel.send(err, {
                code: "js"
            });
        });

    }
};