const { readFileSync, writeFileSync } = require('fs')
module.exports = (client, guild) => {
  var readmessagefile = readFileSync('./logs/server.log', 'utf-8');
  var writemessagefile = writeFileSync('./logs/server.log', `Bot left ${guild.name} | ${guild.id}\n` + readmessagefile)
  client.logger.info(`Bot has left ${guild.name}`);
};