const RegistryForm = require('../models/RegistryForm');
const bcrypt = require('bcrypt')
const asyncHandler = require('express-async-handler');
const Users = require('../models/User');
const Posts = require('../models/Post');



// @desc Get all RegistryForms
// @route GET /RegistryForms
// @access Private
const getAllRegistryForms = asyncHandler(async (req, res) => {
    // Get all RegistryForms from MongoDB
    const RegistryForms = await RegistryForm.find().lean()

    // If no RegistryForms 
    if (!RegistryForms?.length) {
        return res.status(400).json({ message: 'No RegistryForms found' })
    }

    res.json(RegistryForms)
})
const getRegistryFormsByPostID = asyncHandler(async (req, res) => {
    console.log(req.params.id)
    // Get all RegistryForms from MongoDB
    const RegistryForms = await Posts.findById(req.params.id)

    // If no RegistryForms 
    if (!RegistryForms) {
        return res.status(400).json({ message: 'No RegistryForms found' })
    }

    res.json(RegistryForms)
})

const getRegistryFormByUserName = asyncHandler(async (req, res) => {
    console.log(req.params.username)
    // Get all RegistryForms from MongoDB
    const User = await Users.find({ username:req.params.username}).exec()
    if(User.length == 0){
        return res.status(400).json({ message: 'Not found username' })
    }
    console.log(User)
    const RegistryForms = await RegistryForm.find({ userID:User[0]._id}).exec()

    // If no RegistryForms 
    if (!RegistryForms) {
        return res.status(400).json({ message: 'No RegistryForms found' })
    }

    res.json(RegistryForms)
})

const createRegistryForm = asyncHandler(async (req, res) => {
    console.log("has req")
    const {  statusRegForm } = req.body
    const username = req.user
    const User = await Users.find({ username:username}).exec()
    if(User.length == 0){
        return res.status(400).json({ message: 'Not found username' })
    }
    
    // Confirm data
    if (!statusRegForm ) {
        return res.status(400).json({ message: 'Status of Registry Form is required' })
    }
   
    var RegistryFormObject = { userID:User[0]._id, statusRegForm }

    // Create and store new Post 
    const RegistryForms = await RegistryForm.create(RegistryFormObject)

    if (RegistryForms) { //created 
        res.status(201).json({ message: `New RegistryForm ${nameProduct} created` })
    } else {
        res.status(400).json({ message: 'Invalid RegistryForm data received' })
    }
})
// @desc Update a Post
// @route PATCH /RegistryForms
// @access Private
const updateRegistryForms = asyncHandler(async (req, res) => {
    const { typeProduct, nameProduct,address, describePost,addionInfo,pricePruduct,imageURL,amountRegistry  } = req.body
    const id = req.params.id
    const username = req.user
    const UserOwner = await Users.findOne({ username:username}).exec()
    // Confirm data 
    // if () {
    //     return res.status(400).json({ message: 'All fields except password are required' })
    // }

    // Does the Post exist to update?
    const RegistryForms = await Post.findById(id).exec()
    if (!RegistryForms) {
        return res.status(400).json({ message: 'Post not found' })
    }

    console.log(UserOwner._id.equals(RegistryForms.userID))


    if (UserOwner._id.equals(RegistryForms.userID)) {
        RegistryForms.typeProduct = typeProduct
        RegistryForms.nameProduct = nameProduct
        RegistryForms.address = address
        RegistryForms.describePost = describePost
        RegistryForms.addionInfo = addionInfo
        RegistryForms.pricePruduct = pricePruduct
        RegistryForms.amountRegistry = amountRegistry
        RegistryForms.timeRegistry = RegistryForms.timeRegistry
        RegistryForms.imageURL = imageURL

    
        const updatedPost = await RegistryForms.save()
    
        res.json({ message: `${updatedPost.nameProduct} updated` })
    }
    console.log("hi")
    return res.status(400).json({ message: 'Unauthorized' })


   
})


module.exports = {
    getAllRegistryForms,
    getRegistryFormsByPostID,
    createRegistryForm,
    updateRegistryForms ,
    getRegistryFormByUserName
}