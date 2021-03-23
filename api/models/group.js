const mongoose = require('mongoose');

const groupSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    groupName: String,
    groupLimit: Number,
});

module.exports = mongoose.model('group', groupSchema);