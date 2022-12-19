const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    imageURL:{type:String, required:true},
    amountRegistry:{type:Number, default:0},
    typeProduct:{type:String, required:true},
    nameProduct:{type:String, required:true},
    address:{type:String, default:''},
    describePost:{type:String, default:''},
    addionInfo:{type:String, default:''},
    timeRegistry:{
        type:Date,
        required:true
    },
    timeCreatePost: {
        type: Date,
        default: Date.now
    },
    listQuestion:[String]
});

const Post = mongooAse.model('post', postSchema, 'post');
module.exports = Post;  