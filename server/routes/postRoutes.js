const router = require('express').Router();
const postController = require('../controllers/postController')
const commentController = require('../controllers/commentControllers')
const registryController = require('../controllers/registryControllers')
const verifyJWT = require('../middleware/verifyJWT')
router.route('/:id/comment')
.get(commentController.getCommentByPostID)
router.route('/:id/registrys')
.get(verifyJWT, registryController.getRegistryFormsByPostID)

// router.use(verifyJWT)
router.route('/search')
.get(postController.searchProduct)
router.route('/')
.get(postController.getAllPosts)
.post(verifyJWT,postController.createPost)
router.route('/:id')
.get(postController.getPostByID)
.patch(verifyJWT,postController.updatePost)
.delete(verifyJWT,postController.deletePost)
//localhost:5000/posts/:id/comment


module.exports = router 