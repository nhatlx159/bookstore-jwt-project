const User = require('../models/userModels');

const paymentController = {
    getOrder: async (req, res) => {
        try {
            const user = await User.find();
            let orders = [];
            for (let i = 0; i < user.length; i++) {
                const _user = user[i];
                for (let j = 0; j < _user.order.length; j++) {
                    const order = _user.order[j];
                    orders.push(order);
                }
            }
            res.status(200).json(orders)
        } catch (error) {
            res.status(500).json(error)
        }
    },
    userGetOrder: async (req, res) => {
        try {
            const user = await User.findById(req.params.id);

            res.status(200).json(user.order)
        } catch (error) {
            res.status(500).json(error)
        }
    },
    setOrder: async (req, res) => {
        try {
            const total = req.body.total;
            const username = req.body.username;
            const fullname = req.body.fullname;
            const billOfLadingCode = req.body.billOfLadingCode;
            const shippingUnit = req.body.shippingUnit;
            const intendTime = req.body.intendTime;
            const status = req.body.status
            const user = await User.findOne({ username: username });
            for (let i = 0; i < user.order.length; i++) {
                const order = user.order[i];
                if (order.username == username && order.fullname == fullname && order.total == total) {
                    order.transport.billOfLadingCode = billOfLadingCode;
                    order.transport.shippingUnit = shippingUnit;
                    order.transport.intendTime = intendTime;
                    order.status = status;
                    user.save()
                }
            }
            res.status(200).json(user.order)
        } catch (error) {
            res.status(500).json(error)
        }
    },
    makePayment: async (req, res) => {
        try {
            const username = req.body.username
            const fullname = req.body.fullname
            const phone = req.body.phone
            const address = req.body.address
            const paymentMethod = req.body.paymentMethod
            const total = req.body.total
            const cart = req.body.cart
            const user = await User.findOne({ username: username })
            user.order.push({
                username: username, fullname: fullname,
                phone: phone, address: address, method: paymentMethod,
                total: total, product: cart,
            })
            user.save()
            res.status(200).json(user.order)
        } catch (error) {
            res.status(500).json(error)
        }
    }
}

module.exports = paymentController
