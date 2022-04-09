const productController = require('../controllers/userController')

const router = require('express').Router();

router.post('/signUp', productController.signUp)
router.post('/signIn', productController.signIn)
router.get('/get-all', productController.allUser)

module.exports = router;