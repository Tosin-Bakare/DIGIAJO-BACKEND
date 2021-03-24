const mongoose = require('mongoose');

const savingSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    group: { type: mongoose.Schema.Types.ObjectId, ref: 'Group', required: true },
    amount: { type: Number, default: 1 }
});

module.exports = mongoose.model('saving', savingSchema);