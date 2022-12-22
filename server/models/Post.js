const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new mongoose.Schema({
    userID: Schema.Types.ObjectID,
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
    listQuestion:[String],
    pricePruduct: {type:Number, default: 0}
}, {timestamps: true}) ;

const Post = mongoose.model('post', postSchema, 'post');
module.exports = Post;  