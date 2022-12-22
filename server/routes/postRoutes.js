const router = require('express').Router();
const postController = require('../controllers/postController')
const verifyJWT = require('../middleware/verifyJWT')

// router.use(verifyJWT)

router.route('/')
.get(postController.getAllPosts)
.post(postController.createPost)
router.route('/:id')
.get(postController.getPostById)
.patch(postController.updatePost)
.delete(postController.deletePost)

module.exports = router