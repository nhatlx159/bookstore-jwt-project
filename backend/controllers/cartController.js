const User = require('../models/userModels')
const Product = require('../models/Products')

const cartController = {
    addToCart: async (req, res) => {
        try {
            const id = req.params.id;
            const product = await Product.findById(id)
            const user = await User.findOne({ username: req.headers.username })
            user.cart.push(product)
            user.save()
            res.status(200).json(user)
        } catch (err) {
            res.status(500).json("sai o day ne")
        }
    },
    getCart: async (req, res) => {
        try {
            let carts = [];
            const user = await User.findOne({ username: req.headers.username })
            for (let i = 0; i < user.cart.length; i++) {
                const item = user.cart[i];
                if (item != "") {
                    carts.push(item)
                }
            }
            res.status(200).json(carts)
        } catch (err) {
            res.status(500).json(err)
        }
    },
    removeItemInCart: async (req, res) => {
        try {
            const id = req.params.id;
            const product = await Product.findById(id)
            const user = await User.findOne({ username: req.headers.username });
            for (let i = 0; i < user.cart.length; i++) {
                if (user.cart[i].productname == product.productname) {
                    user.cart[i] = "";
                    user.save()
                    res.status(200).json(user);
                    break;
                }
            }
        } catch (err) {
            res.status(500).json(err)
        }
    }
}

module.exports = cartController