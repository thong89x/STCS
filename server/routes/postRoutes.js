const router = require('express').Router();
const postController = require('../controllers/postController')
const verifyJWT = require('../middleware/verifyJWT')

// router.use(verifyJWT)

router.route('/')
.get(postController.getAllPosts)
.post(verifyJWT,postController.createPost)
router.route('/:id')
.get(postController.getPostById)
.patch(verifyJWT,postController.updatePost)
.delete(verifyJWT,postController.deletePost)
// router.route('/:id/comment')
// .get(commentController.getCommentbyPost)
module.exports = router