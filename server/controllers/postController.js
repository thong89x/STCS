const Post = require('../models/Post');
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
const getPostByID = asyncHandler(async (req, res) => {
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
    const {  typeProduct, nameProduct } = req.body
    const username = req.user
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
    const { typeProduct, nameProduct,address, describePost,addionInfo,pricePruduct,imageURL,amountRegistry  } = req.body
    const id = req.params.id
    const username = req.user
    const UserOwner = await Users.findOne({ username:username}).exec()
    // Confirm data 
    // if () {
    //     return res.status(400).json({ message: 'All fields except password are required' })
    // }

    // Does the Post exist to update?
    const posts = await Post.findById(id).exec()
    if (!posts) {
        return res.status(400).json({ message: 'Post not found' })
    }

    console.log(UserOwner._id.equals(posts.userID))


    if (UserOwner._id.equals(posts.userID)) {
        posts.typeProduct = typeProduct
        posts.nameProduct = nameProduct
        posts.address = address
        posts.describePost = describePost
        posts.addionInfo = addionInfo
        posts.pricePruduct = pricePruduct
        posts.amountRegistry = amountRegistry
        posts.timeRegistry = posts.timeRegistry
        posts.imageURL = imageURL

    
        const updatedPost = await posts.save()
    
        res.json({ message: `${updatedPost.nameProduct} updated` })
    }
    console.log("hi")
    return res.status(400).json({ message: 'Unauthorized' })


   
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
    const id  = req.params.id 
    const RolesFromToken = req.role
    const userFromToken = req.user
    const posts = await Post.findById(id).exec()
    if (!posts) {
        return res.status(400).json({ message: 'Post not found' })
    }
    const users = await Users.findById(posts.userID).exec()
    var valid = false;
    if(RolesFromToken == "admin" && RolesFromToken == "subAdmin")
    {
        valid= true;
    }
    else{
        if(userFromToken == users.username)
        {
            valid = true;
        }
    }

    if(!valid) {
        return res.status(400).json({ message: 'Unauthorized' })
    }
    const result = await posts.deleteOne()

    const reply = `Postname ${result.nameProduct} with ID ${result._id} deleted`

    res.json(reply)
})

module.exports = {
    getAllPosts,
    getPostByID,
    createPost,
    updatePost,
    deletePost,
    getPostByUserName
}