const mongoose = require('mongoose')

const blacklistSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    serverID: String,
    reason: String,
})

module.exports = new mongoose.model('Blacklist', blacklistSchema, 'blacklisted-servers')