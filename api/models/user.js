const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    picture: { type: String, default: "https://www.minervastrategies.com/wp-content/uploads/2016/03/default-avatar.jpg" },
    password: { type: String, required: true },
});

module.exports = mongoose.model('user', userSchema);