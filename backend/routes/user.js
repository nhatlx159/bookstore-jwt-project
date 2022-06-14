const cartController = require("../controllers/cartController")
const paymentController = require("../controllers/paymentController")
const userMiddleware = require("../middlewares/userMiddleware")

const route = require("express").Router()
const middleware = userMiddleware.verifyToken
// GET CART
route.get("/cart", middleware, cartController.getCart)
// GET ORDERS
route.get("/getorders/:id", middleware, paymentController.userGetOrder)
// ADD ITEM TO CART
route.post("/addtocart/:id", middleware, cartController.addToCart)
route.post("/details/addtocart/:id", middleware, cartController.addToCart)
// REMOVE ITEM IN CART
route.delete("/remove/:id", middleware, cartController.removeItemInCart)
// PAYMENT
route.post("/payment", middleware, paymentController.makePayment)
// GET PAYMENT
route.get("/checkbill", middleware, cartController.addToCart)

module.exports = route
