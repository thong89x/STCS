const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    topic:
    {
        newComment:{type:String, default:'', minlength: 100, maxlength:3000},
        replyComment:{type:String, default:'', minlength: 100, maxlength:3000},
        newOrder:{type:String, default:'', minlength: 100, maxlength:3000},
        cancelOrder:{type:String, default:'', minlength: 100, maxlength:3000},
        approvedOrder:{type:String, default:'', minlength: 100, maxlength:3000},
        declinedOrder:{type:String, default:'', minlength: 100, maxlength:3000},
        confirmOrder:{type:String, default:'', minlength: 100, maxlength:3000},
        otherNotification:{type:String, default:'', minlength: 100, maxlength:3000}
    },
    link:{type:String, required:true},
    status:{type:Boolean, default:flase},
    timeNotification: {
       timestamps:true
    },
});

const Notification = mongooAse.model('notification', notificationSchema, 'notification');
module.exports = Notification;