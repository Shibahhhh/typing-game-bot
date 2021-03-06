const { readdirSync } = require("fs");
const config = require('../../config/config')
module.exports = {
	name: 'reload',
	description: `Reload's a command`,
	aliases: [],
	usage: "reload [command]",
	userpermissions: [],
	args: true,
	cooldown: 5,
    devOnly: true,
    async execute(client, message, args){
        if(!args[0]) return message.channel.send('Please provide command to reload')
        const commandName = args[0].toLowerCase();
        const command = message.client.commands.get(commandName)
            || message.client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

        if (!command) {
            return message.channel.send(`There is no command with name or alias \`${commandName}\``);
        }
        const commandFolders = readdirSync('./src/commands');
		let folderName = commandFolders.find(folder => readdirSync(`./src/commands/${folder}`).includes(`${command.name}.js`));
		delete require.cache[require.resolve(`../${folderName}/${command.name}`)];
        try {
            const newCommand = require(`../${folderName}/${command.name}`);
		    message.client.commands.set(newCommand.name, newCommand);
			await message.channel.send(`Command \`${newCommand.name}\` was reloaded!`);
        } catch (error) {
            return message.channel.send(`There was an error while reloading a command \`${commandName}\`:\n\`${error.message}\``);
        }
    },
}