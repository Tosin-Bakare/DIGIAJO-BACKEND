const mongoose = require('mongoose');

const groupSchema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    groupName: String,
    groupLimit: Number,
});

module.exports = mongoose.model('group', groupSchema);