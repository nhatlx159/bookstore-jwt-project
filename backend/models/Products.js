const mongoose = require('mongoose')
const {Schema} = mongoose;

const bookSchema = new Schema({
    productname: {
        type:String,
        minlength:6,
        maxlength:100,
        required:true,
        unique:true
    },
    productprice: {
        type:String,
        minlength:4,
        required:true,
    },
    author: {
        type:String,
        required:true
    },
    description: {
        type:String,
        minlength:10,
    },
    quantily: {
        type:String,
        required:true,
    },
    classify: {
        type:String
    },
    image: {
        type:String,
        required:true
    }
},  {timestamps:true})

module.exports = mongoose.model('book', bookSchema)
