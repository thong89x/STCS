const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new mongoose.Schema({
    userID: {type:Schema.Types.ObjectID,required: true},
    postID: {type:Schema.Types.ObjectID,required: true},
    starRatings:{type:Number, default:1},
    cmtContent:{type:String, minlength: 4, maxlength: 3000, required:true},
    repCommentID:{type:Schema.Types.ObjectID, default:null},
},{timestamps:true});

const Comment = mongoose.model('comment', commentSchema, 'comment');
module.exports = Comment;  