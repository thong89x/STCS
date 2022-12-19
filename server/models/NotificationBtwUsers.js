const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    topic:{type:String, required:true, minlength: 100, maxlength:3000},
    link:{type:String, required:true},
    status:{type:Boolean, default:flase},
    timeNotification: {
        type: Date,
        default: Date.now
    },
});

const Notification = mongooAse.model('notification', notificationSchema, 'notification');
module.exports = Notification;