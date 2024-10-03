const express = require('express') ;
const productController = require('./../controllers/productController')
const router = express.Router()
const upload = require('./../middleware/upload')
const protect=require('./../middleware/protect.js')
const admin=require('./../middleware/admin.js')
router.post('/addproduct',protect,admin, upload.single('image'), productController.createProduct)
router.get('/getproducts',productController.getProduct)

module.exports = router ;