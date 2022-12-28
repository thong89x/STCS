const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const notifySchema = new mongoose.Schema({
    headerNotifyAll:{type:String, required:true},
    footerNotifyAll:{type:String, default:''},
    contentNotifyAll:{type:String, minlength: 100, maxlength:3000,required:true},
},{ timestamps:true });

const Notify = mongoose.model('notify', notifySchema, 'notify');
module.exports = Notify;