const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    starRatings:{type:Number, default:0},
    //cmtLike:{type:Number, default:0},
    repComment:{type:String, default:''},
    timeCreateComment: {
        type: Date,
        default: Date.now
    },
});

const Comment = mongooAse.model('comment', commentSchema, 'comment');
module.exports = Comment;  