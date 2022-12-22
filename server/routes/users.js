const router = require('express').Router();
const usersController = require('../controllers/usersController')
const postController = require('../controllers/postController')
const verifyJWT = require('../middleware/verifyJWT')

// router.use(verifyJWT)

router.route('/')
.get(usersController.getAllUsers)
.post(usersController.createUser)
router.route('/:id')
.get(usersController.getUserById)
.patch(verifyJWT,usersController.updateUser)
.delete(verifyJWT,usersController.deleteUser)
router.route('/:username/posts')
.get(postController.getPostByUserName)

module.exports = router