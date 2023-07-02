const express = require('express')
const {
  createProduct,
  getAllProducts,
} = require('../controllers/productsControllers')
const UploadProductImage = require('../controllers/uploadsControllers')
const router = express.Router()

router.route('/').post(createProduct).get(getAllProducts)
router.route('/uploads').post(UploadProductImage)

module.exports = router
