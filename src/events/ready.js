const mongoose = require('mongoose')
const config = require('../config/config')
const DBL = require("@top-gg/sdk");
const api = new DBL.Api(config.api)
// const { readFileSync, writeFileSync } = require('fs')
module.exports = async (client, message) => {
  // var readmessagefile = readFileSync('./logs/server.log', 'utf-8');
  // var writemessagefile = writeFileSync('./logs/server.log', `Time - ${message.createdAt} `+ 'test\n' + readmessagefile)

  mongoose.connect(config.mongoPath, {
    keepAlive: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })

  client.logger.info('Connected to mongo-db')

  const status = require("../config/config").status,
    version = require("../../package.json").version;
  let i = 0;
  setInterval(async function () {
    // let servers = await client.shard.fetchClientValues('guilds.cache.size').reduce((a,b)=> a + b, 0)
    const toDisplay = status[parseInt(i, 10)].name+" | v"+version;
    client.user.setActivity(toDisplay, {
      type: status[parseInt(i, 10)].type
    });
    if (status[parseInt(i + 1, 10)]) i++;
    else i = 0;

  }, 20000);


  setTimeout(function () {
    setInterval(() => {
      console.log('Posted stats to Top.gg!')
      api.postStats({
        serverCount: client.guilds.cache.size,
        shardId: client.shard.ids[0], // if you're sharding
        shardCount: client.options.shardCount
      })

    }, 180000)
  }, 80000)

  client.logger.info('Updating bot...');
  client.logger.info(`Bot is online`);
}