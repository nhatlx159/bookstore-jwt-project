const userController = require("../controllers/userController")
const userMiddleware = require("../middlewares/userMiddleware")
const productController = require('../controllers/productController');
const paymentController = require("../controllers/paymentController");

const route = require("express").Router()
const middleware = userMiddleware.verifyTokenAndIsAdmin;
// GET ALL USER
route.get("/getuser", middleware, userController.getAllUser)
// DELETE USER
route.delete("/delete/:id", middleware, userController.deleteUser)

//ADD PRODUCT 
route.post("/addproduct", middleware, productController.addProduct)
//UPDATE PRODUCT
route.patch("/update/:id", middleware, productController.updateProduct)
//DELETE PRODUCT
route.delete("/deleteproduct/:id", middleware, productController.deleteProduct)

//GET ORDERS
route.get("/getorders", middleware, paymentController.getOrder)
//SET ORDERS
route.patch("/setorders/:id", middleware, paymentController.setOrder)
module.exports = route
