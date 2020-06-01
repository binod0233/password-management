const mongoose = require('mongoose');

var userModule = require('../modules/user');



var conn = mongoose.Collection;
var passcatSchema = new mongoose.Schema({


    username: {
        type: String,
        required: true,
        index: {
            unique: true,
        }

    },
    password_category: {
        type: String,
        required: true,
        index: {
            unique: true,
        }
    },

    date: {
        type: Date,
        default: Date.now
    }
});

var passCateModel = mongoose.model('password_categories', passcatSchema);
module.exports = passCateModel;