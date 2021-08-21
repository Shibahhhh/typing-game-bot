const mongoose = require('mongoose')

const premiumSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    serverID: String,
    date: String,
    time: Number,
    perm: Boolean,
    reason: String,
    prefix: String,
})

module.exports = new mongoose.model('Premium_server', premiumSchema, 'premium_servers')