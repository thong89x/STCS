const router = require('express').Router();

const commentController = require('../controllers/commentControllers')
const verifyJWT = require('../middleware/verifyJWT')

// router.use(verifyJWT)

router.route('/')
.get(commentController.getAllComments)
.post(commentController.createComment)
router.route('/:id')
.get(commentController.getCommentById)



module.exports = router