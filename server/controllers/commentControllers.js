const Comment = require('../models/Comment');
const bcrypt = require('bcrypt')
const asyncHandler = require('express-async-handler');
const Users = require('../models/User');
const Posts = require('../models/Post')


// @desc Get all Comments
// @route GET /Comments
// @access Private
const getAllComments = asyncHandler(async (req, res) => {
    // Get all Comments from MongoDB
    const Comments = await Comment.find().lean()

    // If no Comments 
    if (!Comments?.length) {
        return res.status(400).json({ message: 'No Comments found' })
    }

    return res.json(Comments)
})
const getCommentById = asyncHandler(async (req, res) => {

    // Get all Comments from MongoDB
    const Comments = await Comment.findById(req.params.id)

    // If no Comments 
    if (!Comments) {
        return res.status(400).json({ message: 'No Comments found' })
    }

    return res.json(Comments)
})

const getCommentByPostID = asyncHandler(async (req, res) => {

    // Get all Comments from MongoDB
    const Post = await Posts.findById(req.params.id).exec()
    if(!Post){
        return res.status(400).json({ message: 'Not found postID' })
    }
    const Comments = await Comment.find({ postID:Post._id}).sort({"createdAt":-1});

    // If no Comments 
    if (Comments.length == 0) {
        return res.status(400).json({ message: 'No Comments found' })
    }

    return res.json(Comments)
})

const createComment = asyncHandler(async (req, res) => {
    console.log("has req")
    const {  postID, starRatings, cmtContent } = req.body
    //const username = req.user
   const username = "DungBui"
    const User = await Users.find({ username:username}).exec()
    if(User.length == 0){
        return res.status(400).json({ message: 'Not found username' })
    }
    
    // Confirm data
    if (!postID || !starRatings || !cmtContent) {
        return res.status(400).json({ message: 'PostID, StarRatings and Comment content are required' })
    }
   
    var CommentObject = { userID:User[0]._id, postID, starRatings, cmtContent }

    // Create and store new Post 
    const Comments = await Comment.create(CommentObject)

    if (Comments) { //created 
        res.status(201).json({ message: `New comment ${Comments._id} is created` })
    } else {
        res.status(400).json({ message: 'Invalid Comment data received' })
    }
})


module.exports = {
    getAllComments,
    getCommentById,
    createComment,
    getCommentByPostID
}