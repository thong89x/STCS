const mongoose = require('mongoose');

const notifySchema = new mongoose.Schema({
    headerNotifyAll:{type:String, required:true},
    footerNotifyAll:{type:String, default:''},
    contentNotifyAll:{type:String, minlength: 100, maxlength:3000,required:true},
    timeNotify: {
        timestamps:true
    },
});

const Notify = mongooAse.model('notify', notifySchema, 'notify');
module.exports = Notify;