let Post = require('../models/Post');
const bcrypt = require('bcrypt')
const asyncHandler = require('express-async-handler');
const Users = require('../models/User');


// @desc Get all Posts
// @route GET /Posts
// @access Private
const getAllPosts = asyncHandler(async (req, res) => {
    // Get all Posts from MongoDB
    const Posts = await Post.find().lean()

    // If no Posts 
    if (!Posts?.length) {
        return res.status(400).json({ message: 'No Posts found' })
    }

    res.json(Posts)
})
const getPostById = asyncHandler(async (req, res) => {
    console.log(req.params.id)
    // Get all Posts from MongoDB
    const Posts = await Post.findById(req.params.id).select('-password').lean()

    // If no Posts 
    if (!Posts) {
        return res.status(400).json({ message: 'No Posts found' })
    }

    res.json(Posts)
})

const getPostByUserName = asyncHandler(async (req, res) => {
    console.log(req.params.username)
    // Get all Posts from MongoDB
    const User = await Users.find({ username:req.params.username}).exec()
    if(User.length == 0){
        return res.status(400).json({ message: 'Not found username' })
    }
    console.log(User)
    const Posts = await Post.find({ userID:User[0]._id}).exec()

    // If no Posts 
    if (!Posts) {
        return res.status(400).json({ message: 'No Posts found' })
    }

    res.json(Posts)
})

const createPost = asyncHandler(async (req, res) => {
    console.log("has req")
    const { username, typeProduct, nameProduct } = req.body
    const User = await Users.find({ username:username}).exec()
    if(User.length == 0){
        return res.status(400).json({ message: 'Not found username' })
    }
    
    var timeRegistry = Date.now();
    // Confirm data
    if (!typeProduct || !nameProduct) {
        return res.status(400).json({ message: 'Postname and password fields are required' })
    }
   
    var PostObject = { userID:User[0]._id, nameProduct, typeProduct, timeRegistry }

    // Create and store new Post 
    const Posts = await Post.create(PostObject)

    if (Posts) { //created 
        res.status(201).json({ message: `New Post ${nameProduct} created` })
    } else {
        res.status(400).json({ message: 'Invalid Post data received' })
    }
})
// @desc Update a Post
// @route PATCH /Posts
// @access Private
const updatePost = asyncHandler(async (req, res) => {
    const { Postname, password,roles, active  } = req.body

    // Confirm data 
    if (!id || !Postname || !roles.length || typeof active !== 'boolean') {
        return res.status(400).json({ message: 'All fields except password are required' })
    }

    // Does the Post exist to update?
    const Post = await Post.findOne({ Postname }).exec()

    if (!Post) {
        return res.status(400).json({ message: 'Post not found' })
    }


    Post.roles = roles
    Post.active = active

    if (password) {
        // Hash password 
        Post.password = await bcrypt.hash(password, 10) // salt rounds 
    }

    const updatedPost = await Post.save()

    res.json({ message: `${updatedPost.Postname} updated` })
})

// @desc Delete a Post
// @route DELETE /Posts
// @access Private
const deletePost = asyncHandler(async (req, res) => {

//     Post.remove({}, function(err) {
//         if (err) {
//             console.log(err)
//         } else {
//             res.end('success');
//         }
//     }
// );
//     return;
    const id  = req.params.id  || req.body.id
    console.log(id);
    // Confirm data
    if (!id) {
        return res.status(400).json({ message: 'Post ID Required' })
    }

    // Does the Post still have assigned notes?
    // const note = await Note.findOne({ Post: id }).lean().exec()
    // if (note) {
    //     return res.status(400).json({ message: 'Post has assigned notes' })
    // }

    // Does the Post exist to delete?
    const Post = await Post.findById(id).exec()
    

    if (!Post) {
        return res.status(400).json({ message: 'Post not found' })
    }

    const result = await Post.deleteOne()

    const reply = `Postname ${result.Postname} with ID ${result._id} deleted`

    res.json(reply)
})

module.exports = {
    getAllPosts,
    getPostById,
    createPost,
    updatePost,
    deletePost,
    getPostByUserName
}