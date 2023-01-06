const RegistryForm = require('../models/RegistryForm');
const bcrypt = require('bcrypt')
const asyncHandler = require('express-async-handler');
const Users = require('../models/User');
const Posts = require('../models/Post');
const { request } = require('express');



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

    res.status(200).json(RegistryForms)
})
const getRegistryFormsByPostID = asyncHandler(async (req, res) => {

    // Get all RegistryForms from MongoDB
    const RegistryForms = await RegistryForm.find({postID:req.params.id}).sort({"createdAt":-1});

    // If no RegistryForms 
    if (!RegistryForms?.length) {
        return res.status(400).json({ message: 'No RegistryForms found' })
    }

    res.status(200).json(RegistryForms)
})

const getRegistryFormByUserName = asyncHandler(async (req, res) => {

    // Get all RegistryForms from MongoDB
    const User = await Users.findOne({ username:req.params.username}).exec()
    if(!User){
        return res.status(400).json({ message: 'Not found username' })
    }

    const usernamefromToken = req.user

    if (usernamefromToken != User.username){
        return res.status(400).json({ message: 'This Registry Form is not belong to you' })
    }
    const RegistryForms = await RegistryForm.find({ userID:User._id}).sort({"createdAt":-1});

    // If no RegistryForms 
    if (!RegistryForms?.length) {
        return res.status(400).json({ message: 'No RegistryForms found' })
    }

    return res.status(200).json(RegistryForms)
})
const getRegistryFormByID = asyncHandler(async (req, res) => {
    const userFromToken = req.user
    console.log({username:userFromToken})
    
    const User =  await Users.findOne({username:userFromToken}).lean()
    console.log(User)
    if (!User){
        return res.status(400).json({ message: 'User not found' })
    }

  
    // Get all RegistryForms from MongoDB
    const RegistryForms = await RegistryForm.findById(req.params.id)

    // If no RegistryForms 
    if (!RegistryForms) {
        return res.status(400).json({ message: 'No RegistryForms found' })
    }
    console.log(RegistryForms.userID)
    console.log(User._id)
    if (!RegistryForms.userID.equals(User._id)){
        return res.status(400).json({ message: 'Unauthorized' })
    }
    return res.status(200).json(RegistryForms)
})
const createRegistryForm = asyncHandler(async (req, res) => {

    const {  statusRegForm, listAnswer, postID} = req.body
    const username = req.user
    const User = await Users.find({ username:username}).exec()

    if(User.length == 0){
        return res.status(400).json({ message: 'Not found username' })
    }

    const Post = await Posts.findById(postID).exec()

    if (!Post){
        return res.status(400).json({ message: 'Not found postID' })
    }
    if (Post.amountRegistry <= 0){
        return res.status(400).json({ message: 'Sold out' })
    }
    // Confirm data
    if (!listAnswer?.length) {
        return res.status(400).json({ message: 'Status of Registry Form and Answer are required' })
    }
   
    var RegistryFormObject = { userID:User[0]._id, statusRegForm, listAnswer, postID }

    // Create and store new Post 
    const RegistryForms = await RegistryForm.create(RegistryFormObject)

    if (RegistryForms) { //created 
        res.status(201).json({ message: `New RegistryForm ${RegistryForms._id} created` })
    } else {
        res.status(400).json({ message: 'Invalid RegistryForm data received' })
    }
})
// @desc Update a Post
// @route PATCH /RegistryForms
// @access Private
const updateRegistryForms = asyncHandler(async (req, res) => {
    const statuStandard = ["Pending", "Refused", "Accepted", "Cancelled", "Done"]
    const { statusRegForm  } = req.body
    if (!statuStandard.includes(statusRegForm)){
        return res.status(400).json({ message: 'Status must be in Status standard: Pending, Refused, Accepted, Cancelled, Done'})
    }
    const id = req.params.id
    // People who interact the registry form
    const username = req.user
    const UserInteract = await Users.findOne({ username:username}).exec()
    // Confirm data 
    // if () {
    //     return res.status(400).json({ message: 'All fields except password are required' })
    // }

    // Does the Post exist to update?
    const RegistryForms = await RegistryForm.findById(id).exec()
    if (!RegistryForms) {
        return res.status(400).json({ message: 'RegistryForm not found' })
    }

    
    //UserInteract.userID ==> Buyer
    // Post (userID)

    const Post = await Posts.findById(RegistryForms.postID).exec()

    if (!Post) {
        return res.status(400).json({ message: 'Post not found' })
    }

    const Seller = await Users.findById(Post.userID).exec()

    if (!Seller) {
        return res.status(400).json({ message: 'Seller not found' })
    }

    if (UserInteract._id.equals(RegistryForms.userID) || UserInteract._id.equals(Seller._id)) {
        if (RegistryForms.statusRegForm == statuStandard[1] || RegistryForms.statusRegForm == statuStandard[3] || RegistryForms.statusRegForm == statuStandard[4]){
            return res.status(400).json({ message: 'Registry Form cant update' })
        }
        if (RegistryForms.statusRegForm == statuStandard[0] && (statusRegForm == statuStandard[4] || statusRegForm == statuStandard[3])){
            return res.status(400).json({ message: 'Cant update this status' })
        }  
        if (RegistryForms.statusRegForm == statuStandard[2] && (statusRegForm == statuStandard[0] || statusRegForm == statuStandard[1])){
            return res.status(400).json({ message: 'Cant update this status' })
        }
        if (RegistryForms.statusRegForm == statuStandard[2] && statusRegForm == statuStandard[3]){
            var dateAccecpt = new Date(RegistryForms.updatedAt)
            var dateNow = new Date(Date.now())
            var timeDistance = (dateNow - dateAccecpt)/1000

            if(timeDistance > 86400){
                return res.status(400).json({ message: 'Overtime to decline' })
            }
        }
        RegistryForms.statusRegForm = statusRegForm
        const updateRegistryForms = await RegistryForms.save()
    
        return res.json({ message: `${updateRegistryForms._id} updated` })
    }
   
    return res.status(400).json({ message: 'Unauthorized' })
})


module.exports = {
    getAllRegistryForms,
    getRegistryFormsByPostID,
    createRegistryForm,
    updateRegistryForms ,
    getRegistryFormByUserName,
    getRegistryFormByID
}