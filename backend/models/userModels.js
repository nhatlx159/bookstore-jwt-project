const mongoose = require('mongoose')

const userModelSchema = mongoose.Schema({
    username: {
        type:String,
        required:true,
        minlength:6,
        maxlength:50,
        unique:true
    },
    email: {
        type:String,
        required:true,
        minlength:6,
        unique:true
    },
    phone: {
        type:String,
        required:true,
        minlength:8,
        maxlength:13
    },
    password: {
        type:String,
        required:true,
        minlength:6
    },
    cart: [],
    order:[{username: {type:String, required:true}, fullname: {type: String, required:true}, 
        phone: {type: Number, required:true}, address: {type: String, required:true}, total: {type: String},
        method: {type: String}, product: [], status: {type: String, default: "pending"}, 
        transport: {
            billOfLadingCode: {type: String, default: null},
            shippingUnit: {type: String, default: null},
            intendTime: {type: String, default: null}
        }
    }],
    admin: {
        type: Boolean,
        default: false
    }
},  {timestamps:true})

module.exports = mongoose.model('userlist', userModelSchema)
