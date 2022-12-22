const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    userID:{type:Sting, default:''},
    postID:{type:Sting, default:''},
    starRatings:{type:Number, default:0},

    //cmtLike:{type:Number, default:0},
    repComment:{type:String, default:''},
    timeCreateComment: {
       timestamps:true
    },
});

const Comment = mongooAse.model('comment', commentSchema, 'comment');
module.exports = Comment;  