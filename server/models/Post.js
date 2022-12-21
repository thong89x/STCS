const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    userID: {type: mongooseID},
    imageURL:[String],
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
    listQuestion:[String],
    pricePruduct: {type:Number, default: 0}
});

const Post = mongooAse.model('post', postSchema, 'post');
module.exports = Post;  