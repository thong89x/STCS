const User = require('../models/User');
const bcrypt = require('bcrypt')
const asyncHandler = require('express-async-handler');
const Users = require('../models/User');


// @desc Get all users
// @route GET /users
// @access Private
const getAllUsers = asyncHandler(async (req, res) => {
  
    // Get all users from MongoDB
    // if (req.role != "admin" && req.role != "subAdmin"){
    //     return res.status(400).json({ message: 'Cant access' })
    // }
    const users = await User.find().select('-password').lean()

    // If no users 
    if (!users?.length) {
        return res.status(400).json({ message: 'No users found' })
    }

    res.json(users)
})
const getUser = asyncHandler(async (req, res) => {
    const {username,id}= req.params

    
    var users = null
    if (!username )
    {

        users = await User.findById(id).select('-password').lean()

        // If no users 
        if (!users) {
            return res.status(400).json({ message: 'No users found' })
        }
    
        
    }
    if(!id){

        users = await User.findOne({username:username}).select('-password').lean()

        // If no users 
        if (!users) {
            return res.status(400).json({ message: 'No users found' })
        }
    
    }
    // Get all users from MongoDB
    return res.json(users)
    
})
const createUser = asyncHandler(async (req, res) => {

    const { username, password } = req.body

    // Confirm data
    if (!username || !password) {
        return res.status(400).json({ message: 'username and password fields are required' })
    }

    // Check for duplicate username
    const duplicate = await User.findOne({ username }).lean().exec()

    if (duplicate) {
        return res.status(409).json({ message: 'Duplicate username' })
    }

    // Hash password 
    const hashedPwd = await bcrypt.hash(password, 10) // salt rounds

    var userObject = { username, "password": hashedPwd }
    
    const user = await User.create(userObject)

    if (user) { //created 
        return res.status(201).json({ message: `New user ${username} created` })
    } else {
        return res.status(400).json({ message: 'Invalid user data received' })
    }
})
// @desc Update a user
// @route PATCH /users
// @access Private
const updateUser = asyncHandler(async (req, res) => {
    const {username,id}= req.params
    console.log(username,id)
    var users = null

    const { password, isActive ,role,profile } = req.body
    console.log(isActive, role)
    // Confirm data 
   
    const RolesFromToken = req.role
    const userFromToken = req.user
    console.log(RolesFromToken,userFromToken)
    if(id){
        users = await User.findByIdAndUpdate(id)
    }
    if(username){
        users = await User.findOne({ username })
    }
    if (!users) {
        return res.status(400).json({ message: 'User not found' })
    }
    var valid = false;
    if(RolesFromToken == "admin" || RolesFromToken == "sub-admin")
    {
        valid= true;
    }
    else{
        if(userFromToken == users.username)
        {
            valid = true;
        }
    }
    // Does the user exist to update?
    if(!valid) {
        return res.status(401).json({ message: 'Unauthorized' })
    }
    console.log(users);
    if(role)
        users.role= role
    if ( typeof isActive == 'boolean') {
        users.isActive = isActive
    }
    if(profile)
    {
        users.profile.fullname = profile.fullname
        users.profile.age = profile.age
        users.profile.address = profile.address
        users.profile.sex = profile.sex 
        users.profile.email = profile.email
    }
   
    
    if (password) {
        // Hash password 
        users.password = await bcrypt.hash(password, 10) // salt rounds 
    }
    console.log(users);
    const updatedUser = await users.save()

    return res.json({ message: `${updatedUser.username} updated` })
})

// @desc Delete a user
// @route DELETE /users
// @access Private
const deleteUser = asyncHandler(async (req, res) => {

//     User.remove({}, function(err) {
//         if (err) {
//             console.log(err)
//         } else {
//             res.end('success');
//         }
//     }
// );
//     return;
    if (req.role != "admin" && req.role != "subAdmin"){
        return res.status(400).json({ message: 'Cant access' })
    }
    const id  = req.params.id 
    console.log(id);
    // Confirm data
    if (!id) {
        return res.status(400).json({ message: 'User ID Required' })
    }

    // Does the user still have assigned notes?
    // const note = await Note.findOne({ user: id }).lean().exec()
    // if (note) {
    //     return res.status(400).json({ message: 'User has assigned notes' })
    // }

    // Does the user exist to delete?
    const user = await User.findById(id).exec()
    

    if (!user) {
        return res.status(400).json({ message: 'User not found' })
    }

    const result = await user.deleteOne()

    const reply = `Username ${result.username} with ID ${result._id} deleted`

    return res.json(reply)
})

module.exports = {
    getAllUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser
}