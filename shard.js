// const Cluster = require("discord-hybrid-sharding");
const path = require('path');
const config = require('./src/config/config')
const Statcord = require("statcord.js");
const { ShardingManager } = require('discord.js');

const manager = new ShardingManager(path.join(__dirname, 'index.js'), { 
    totalShards: config.shards,
    token: config.token,
    respawn: true
});

const statcord = new Statcord.ShardingClient({
    key: config.statcord,
    manager,
    postCpuStatistics: true, /* Whether to post CPU statistics or not, defaults to true */
    postMemStatistics: true, /* Whether to post memory statistics or not, defaults to true */
    postNetworkStatistics: true, /* Whether to post memory statistics or not, defaults to true */
    autopost: true /* Whether to auto post or not, defaults to true */
});

manager.on('shardCreate', shard => console.log(`Launched shard ${shard.id}`));
manager.spawn({ amount: this.totalShards, delay: 5500, timeout: 30000 })


statcord.on("autopost-start", () => {
    console.log("Started autopost");
});

statcord.on("post", status => {
    if (!status) console.log("Successful post");
    else console.error(status);
});