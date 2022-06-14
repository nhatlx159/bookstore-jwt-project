const User = require('../models/userModels')

const userController = {
    getAllUser: async (req, res)=> {
        try {
            const user = await User.find()
            res.status(200).json(user)
        } catch (err) {
            res.status(500).json(err)
        }
    },
    deleteUser: async(req, res)=>{
        try {
            const user = await User.findByIdAndRemove(req.params.id)
            user.save()
            res.status(200).json("delete successfully!")
        } catch (err) {
            res.status(500).json(err)
        }
    }
}

module.exports  = userController
