const { Client, Collection } = require("discord.js");
// const Cluster = require("discord-hybrid-sharding");
const config = require('./src/config/config')
global.__basedir = __dirname;
const client = new Client({
  disableEveryone: true,
  // shards: Cluster.data.SHARD_LIST,        
	// shardCount: Cluster.data.TOTAL_SHARDS,
});



client.commands = new Collection();
client.cooldowns = new Collection();
client.logger = require('./src/utils/logger.js');

["command",, "event"].forEach(handler => {
  require(`./src/utils/handlers/${handler}`)(client);
});

// client.cluster = new Cluster.Client(client)
client.login(config.token)

process.on("unhandledRejection", (err) => client.logger.error(err));