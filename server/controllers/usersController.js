const User = require('../models/User');
const bcrypt = require('bcrypt')
const asyncHandler = require('express-async-handler')


// @desc Get all users
// @route GET /users
// @access Private
const getAllUsers = asyncHandler(async (req, res) => {
    console.log(getAllUsers);
    // Get all users from MongoDB
    if (req.role != "admin" && req.role != "subAdmin"){
        return res.status(400).json({ message: 'Cant access' })
    }
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
        console.log("ID")
        users = await User.findById(id).select('-password').lean()

        // If no users 
        if (!users) {
            return res.status(400).json({ message: 'No users found' })
        }
    
        
    }
    if(!id){
        console.log("Name")
        users = await User.findOne({username:username}).select('-password').lean()

        // If no users 
        if (!users) {
            return res.status(400).json({ message: 'No users found' })
        }
    
    }
    // Get all users from MongoDB
    res.json(users)
    
})
const createUser = asyncHandler(async (req, res) => {
    console.log("has req")

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
        res.status(201).json({ message: `New user ${username} created` })
    } else {
        res.status(400).json({ message: 'Invalid user data received' })
    }
})
// @desc Update a user
// @route PATCH /users
// @access Private
const updateUser = asyncHandler(async (req, res) => {
    const {username,id}= req.params
    var users = null

    const { password, isActive  } = req.body

    // Confirm data 
    if ( typeof isActive !== 'boolean') {
        return res.status(400).json({ message: 'All fields except password are required' })
    }
    const RolesFromToken = req.role
    const userFromToken = req.user
    if(id){
        users = await User.findById(id).select('-password').lean()
    }
    if(username){
        users = await User.findOne({ username }).exec()
    }
    if (!users) {
        return res.status(400).json({ message: 'User not found' })
    }
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
    // Does the user exist to update?
    if(!valid) {
        return res.status(401).json({ message: 'Unauthorized' })
    }
    users.role= role
    users.isActive = isActive

    if (password) {
        // Hash password 
        users.password = await bcrypt.hash(password, 10) // salt rounds 
    }

    const updatedUser = await users.save()

    res.json({ message: `${updatedUser.username} updated` })
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

    res.json(reply)
})

module.exports = {
    getAllUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser
}