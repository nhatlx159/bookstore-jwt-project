const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const authRoute = require('./routes/auth')
const userRoute = require('./routes/user')
const adminRoute = require('./routes/admin')
const productRoute = require('./routes/product')
dotenv.config()
const port = process.env.PORT || 3000
const app = express()
// conn db
mongoose.connect(process.env.MONGODB_URL, () => {
  console.log("connect success!!")
})
app.use(cors())
app.use(express.json())
app.use(cookieParser())

// routes
app.use("/", productRoute)
app.use("/user", userRoute)
app.use("/v1", authRoute)
app.use("/admin", adminRoute)



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
