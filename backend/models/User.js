const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
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
    order:[],
    admin: {
        type: Boolean,
        default: false
    },
    
},  {timestamps:true})

module.exports = mongoose.model('user', userSchema)
