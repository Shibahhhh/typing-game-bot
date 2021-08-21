const { MessageEmbed } = require("discord.js");
const { readdirSync } = require("fs");
const emojis = require('../../config/emojis.json')
const color = require('../../config/color.json')
const {stripIndent } = require("common-tags");
const config = require('../../config/config')
const { capitalize } = require('../../utils/utils')
const prefixx = require("../../utils/schema/premium_server_schema")
module.exports = {
	name: 'help',
	description: `Displays a list of all current commands, sorted by category. Can be used in conjunction with a command for additional information.`,
	aliases: ['menu'],
	usage: "help [command]",
	userpermissions: [],
	args: true,
	cooldown: 5,
	// premiumOnly: true,
	async execute(client, message, args) {
		    let guildData = await prefixx.findOne({
		serverID: message.guild.id
	})
	let prefix;
	if (!guildData) {
		prefix = config.prefix
		console.log(prefix)
	} else {
		prefix = guildData.prefix
    }
		const roleColor = color.normal
		if (!args[0]) {
			
			let categories = [];
			const dirEmojis = {
				info: emojis.info,
				fun: emojis.fun,
				premium: emojis.premium,
				voter: emojis.voter,
				owner: emojis.owner,
				misc: emojis.misc
			}
			let ignorechategories;
			if (!config.owner.id.includes(message.author.id)){
				ignorechategories = ['owner']
			}else{
				ignorechategories = []
			}
		
			
			readdirSync("./src/commands/").forEach((dir) => {
				if (ignorechategories.includes(dir)) return;
				const emojicommand = `${dirEmojis[dir]} ${capitalize(dir)}`
				const commands = readdirSync(`./src/commands/${dir}/`).filter((file) =>
					file.endsWith(".js")
				);

				const cmds = commands.filter((command) => {
					let file = require(`../../commands/${dir}/${command}`);
					return !file.hidden;
				}).map((command) => {
					let file = require(`../../commands/${dir}/${command}`);

					if (!file.name) return "No command name.";

					let name = file.name.replace(".js", "");

					return `\`${name}\``;
				});

				let data = new Object();

				data = {
					name: emojicommand,
					value: cmds.length === 0 ? "No Commands found" : cmds.join(" "),
				};

				categories.push(data);
			});

			const embed = new MessageEmbed()
				.setTitle("Bot's Commands")
				.addFields(categories)
				.setDescription(
					stripIndent`**Prefix:** \`${prefix}\`\n**More Information:** \`${prefix}help [command]\``
				)
				.addField(
					'**Links**', 
					'**[Invite Me](https://discord.com/oauth2/authorize?client_id=788569083368833076&permissions=93184&scope=bot) | ' +
					'[Support Server](https://discord.gg/9NDFD5GA6n) | ' + '[Vote For Me](https://top.gg/bot/788569083368833076) | ' + '[Docs](https://docs.typing-game.ml/)**' 
				  )
				.setFooter(`${prefix}tos to see our tos!`
				)
				.setTimestamp()
				.setColor(roleColor);
			return message.channel.send({embeds: [embed]});
		} else {
			const command =
				client.commands.get(args[0].toLowerCase()) ||
				client.commands.find(
					(c) => c.aliases && c.aliases.includes(args[0].toLowerCase())
				);

			if (!command) {
				const embed = new MessageEmbed()
					.setTitle(` ${emojis.fail} Unable to find command, please check command list`)
					.setColor(color.error);
				return message.channel.send({embeds: [embed]});
			}

			const embed = new MessageEmbed()
				.setTitle(`Command \`${command.name}\``)
				.setDescription(
					`**Description** ${command.description ? command.description : "No description for this command."}`
				)
				.addField(
					"Aliases:",
					command.aliases
						? `\`${command.aliases.join("` `")}\``
						: "No aliases for this command.", true
				)
				.addField(
					"Usage",
					command.usage
						? `\`${prefix}${command.usage}\``
						: `\`${prefix}${command.name}\``, true
				)
				.addField(
					"Cooldown",
					`\`${command.cooldown || 1} second(s)\``

				)
				.setFooter(
					message.member.displayName,
					message.author.displayAvatarURL({ dynamic: true })
				)
				.setTimestamp()
				.setColor(roleColor);
			return message.channel.send({embeds: [embed]});
		}

	},
};