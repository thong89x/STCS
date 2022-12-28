const router = require('express').Router();
const usersController = require('../controllers/usersController')
const postController = require('../controllers/postController')
const registryController = require('../controllers/registryControllers')
const verifyJWT = require('../middleware/verifyJWT')

//router.use(verifyJWT)

router.route('/v2')
.get(verifyJWT, usersController.getAllUsers)
.post(usersController.createUser)
router.route('/v2/:id')
.get(usersController.getUser)
.patch(verifyJWT,usersController.updateUser)
.delete(verifyJWT,usersController.deleteUser)

router.route('/v1/:username')
.get(usersController.getUser)
.patch(verifyJWT,usersController.updateUser)

router.route('/v1/:username/posts')
.get(postController.getPostByUserName)

router.route('/v1/:username/registrys')
.get(verifyJWT, registryController.getRegistryFormByUserName)

    
module.exports = router