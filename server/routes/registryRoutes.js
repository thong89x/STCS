const router = require('express').Router();
const registryController = require('../controllers/registryControllers')
const verifyJWT = require('../middleware/verifyJWT')

// router.use(verifyJWT)

router.route('/')
.get(registryController.getAllRegistryForms)
.post(verifyJWT,registryController.createRegistryForm)
router.route('/:id')
.get(registryController.updateRegistryForms)
.patch(verifyJWT,registryController.updatePost)

router.route('/v1/:username/registrys')
.get(registryController.getRegistryFormByUserName)

router.route('/:id/registry')
.get(registryController.getRegistryFormsByPostID)
module.exports = router