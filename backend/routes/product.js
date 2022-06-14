const route = require('express').Router();
const productController = require('../controllers/productController');

//GET ALL PRODUCT
route.get("/", productController.getAllProduct)
//FIND BY ID
route.get("/:id", productController.findOneProduct)



module.exports = route
