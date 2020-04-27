const mongoose = require('mongoose');

const SettingSchema = new mongoose.Schema({
    userID: {
        type: String,
        required: true,
        unique: true
    },
    darkMode: {
        type: Boolean,
        default: false
    },
    color: {
        type: String,
        default: 'blue'
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const Setting = mongoose.model('Setting', SettingSchema);

module.exports = Setting;