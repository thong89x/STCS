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

    res.json(Comments)
})
const getCommentById = asyncHandler(async (req, res) => {

    // Get all Comments from MongoDB
    const Comments = await Comment.findById(req.params.id)

    // If no Comments 
    if (!Comments) {
        return res.status(400).json({ message: 'No Comments found' })
    }

    res.json(Comments)
})

const getCommentByPostID = asyncHandler(async (req, res) => {

    // Get all Comments from MongoDB
    const Post = await Posts.findById(req.params.id).exec()
    if(!Post){
        return res.status(400).json({ message: 'Not found postID' })
    }
    const Comments = await Comment.find({ postID:Post[0]._id}).exec()

    // If no Comments 
    if (Comments.length == 0) {
        return res.status(400).json({ message: 'No Comments found' })
    }

    res.json(Comments)
})

const createComment = asyncHandler(async (req, res) => {
    console.log("has req")
    const {  postID, starRatings, cmtContent } = req.body
    //const username = req.user
    const username = "ThongVo"
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
// @desc Update a Post
// @route PATCH /Comments
// @access Private
// const updatePost = asyncHandler(async (req, res) => {
//     const { typeProduct, nameProduct,address, describePost,addionInfo,pricePruduct,imageURL,amountRegistry  } = req.body
//     const id = req.params.id
//     const username = req.user
//     const UserOwner = await Users.findOne({ username:username}).exec()
//     // Confirm data 
//     // if () {
//     //     return res.status(400).json({ message: 'All fields except password are required' })
//     // }

//     // Does the Post exist to update?
//     const Comments = await Post.findById(id).exec()
//     if (!Comments) {
//         return res.status(400).json({ message: 'Post not found' })
//     }

//     console.log(UserOwner._id.equals(Comments.userID))


//     if (UserOwner._id.equals(Comments.userID)) {
//         Comments.typeProduct = typeProduct
//         Comments.nameProduct = nameProduct
//         Comments.address = address
//         Comments.describePost = describePost
//         Comments.addionInfo = addionInfo
//         Comments.pricePruduct = pricePruduct
//         Comments.amountRegistry = amountRegistry
//         Comments.timeRegistry = Comments.timeRegistry
//         Comments.imageURL = imageURL

    
//         const updatedPost = await Comments.save()
    
//         res.json({ message: `${updatedPost.nameProduct} updated` })
//     }
//     console.log("hi")
//     return res.status(400).json({ message: 'Unauthorized' })


   
// })

// // @desc Delete a Post
// // @route DELETE /Comments
// // @access Private
// const deletePost = asyncHandler(async (req, res) => {

// //     Post.remove({}, function(err) {
// //         if (err) {
// //             console.log(err)
// //         } else {
// //             res.end('success');
// //         }
// //     }
// // );
// //     return;
//     const id  = req.params.id 
//     const RolesFromToken = req.role
//     const userFromToken = req.user
//     const Comments = await Post.findById(id).exec()
//     if (!Comments) {
//         return res.status(400).json({ message: 'Post not found' })
//     }
//     const users = await Users.findById(Comments.userID).exec()
//     var valid = false;
//     if(RolesFromToken == "admin")
//     {
//         valid= true;
//     }
//     else{
//         if(userFromToken == users.username)
//         {
//             valid = true;
//         }
//     }

//     if(!valid) {
//         return res.status(400).json({ message: 'Unauthorized' })
//     }
//     const result = await Comments.deleteOne()

//     const reply = `Postname ${result.nameProduct} with ID ${result._id} deleted`

//     res.json(reply)
// })

module.exports = {
    getAllComments,
    getCommentById,
    createComment,
    getCommentByPostID
}