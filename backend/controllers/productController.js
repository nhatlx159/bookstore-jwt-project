const Product = require('../models/Products')

const productController = {
    addProduct: async (req, res) => {
        try {
            const newProduct = new Product({
                productname: req.body.productname,
                productprice: req.body.productprice,
                description: req.body.description,
                author: req.body.author,
                quantily: req.body.quantily,
                classify: req.body.classify,
                image: req.body.image
            })
            const product = await newProduct.save()
            res.status(200).json(product)
        } catch (error) {
            res.status(500).json(error)
        }
    },
    getAllProduct: async (req, res) => {
        try {
            const product = await Product.find()
            res.status(200).json(product)
        } catch (err) {
            res.status(500).json(err)
        }
    },
    deleteProduct: async (req, res) => {
        try {
            const product = await Product.findById(req.params.id)
            res.status(200).json("delete " + product.productname + " successfully!")
        } catch (err) {
            res.status(500).json(err)
        }
    },
    updateProduct: async (req, res) => {
        try {
            const id = req.params.id;
            const update = req.body;
            const option = { new: true }
            const product = await Product.findByIdAndUpdate(id, update, option)
            res.status(200).json({ status: "update successfully", product: product })
        } catch (err) {
            res.status(500).json(err)
        }
    },
    findOneProduct: async (req, res) => {
        try {
            const id = req.params.id;
            const product = await Product.findById(id)
            res.status(200).json(product)
        } catch (error) {
            res.status(500).json(error)
        }
    }
}

module.exports = productController
