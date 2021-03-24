const mongoose = require('mongoose');

const groupSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    groupName: { type: String, required: true },
    groupLimit: { type: Number, required: true },
});

module.exports = mongoose.model('group', groupSchema);