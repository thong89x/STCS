const router = require('express').Router();
const registryController = require('../controllers/registryControllers')
const verifyJWT = require('../middleware/verifyJWT')

//router.use(verifyJWT)

router.route('/')
.get(registryController.getAllRegistryForms)
.post(verifyJWT,registryController.createRegistryForm)
router.route('/:id')
.get(verifyJWT,registryController.getRegistryFormByID)
.patch(verifyJWT,registryController.updateRegistryForms)

module.exports = router