const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
    //not need id, mongoose auto create
    //trim: remove while space
    username: {type:String, unique: true, required:[true,'Username must be requited'], trim: true},
    password: {type:String, required:[true,'Password must be requited'], trim: true, minlength:[6, 'Password must be at least 6 characters']},
    userroles: {type:String, required:true},
    isActive: {type:Boolean, default: true},
    role: { type:String, default: 'user'},
    profile: {
        fullname: {type:String, default: ''},
        age: {type:Number,default: ''},
        address: {type:String, default: ''},
        sex: {type:String, default:''},
        email:{type:String, default:''}
    },
    lastLogin: {
        type: Date,
        default: Date.now
    },
    autoForm: {type:String, maxlength: 3000, default:''}
}, {timestamps: true});

const Users = mongoose.model('user', userSchema, 'user');
module.exports = Users;