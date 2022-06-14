const User = require('../models/userModels')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

let refreshTokenArr = [];
const authController = {
    //register
    registerUser: async(req, res) =>{
        try {
            const salt = await bcrypt.genSalt(10)
            const hashed = await bcrypt.hash(req.body.password, salt)
            // create user
            const newUser = new User({
                username: req.body.username,
                phone: req.body.phone,
                email: req.body.email,
                password: hashed
            })
            // save
            const user = await newUser.save()
            res.status(200).json(user)

        } catch (err) {
            res.status(500).json("err")
        }
    },
    // generateToken
    generateAccessToken: (user)=>{
        return jwt.sign({
            id: user.id,
            admin: user.admin
        },  process.env.JWT_ACCESS_KEY, {
            expiresIn: "10m"
        })
    },
    generateRefreshToken: (user)=>{
        return jwt.sign({
            id: user.id,
            admin: user.admin
        },  process.env.JWT_REFRESH_KEY, {
            expiresIn: "2h"
        })
    },
    //login 
    loginUser: async(req, res) =>{
        try {
            const user = await User.findOne({username: req.body.username})
            if(!user){
                res.status(404).json("Wrong username")
                return;
            }
            const validPassword = await bcrypt.compare(req.body.password, user.password)
            if(!validPassword){
                res.status(404).json("Wrong password")
                return;
            }
            if(user && validPassword){
                const accessToken = authController.generateAccessToken(user)
                const refreshToken = authController.generateRefreshToken(user)
                refreshTokenArr.push(refreshToken)
                res.cookie("refreshToken", refreshToken, {
                    path:"/",
                    httpOnly:true,
                    sameSite:"strict",
                    secure:false
                })
                res.cookie("username", user.username)
                const {password, ...orther} = user._doc
                res.status(200).json({...orther, accessToken})
            }
        } catch (err) {
            res.status(500).json("Loi server")
        }
    },
    requestRefreshToken: async (req, res)=>{
        const refreshToken = req.cookies.refreshToken;
        if(!refreshToken){
            res.status(401).json("You're not authenticated")
        }
        if(!refreshTokenArr.includes(refreshToken)){
            res.status(403).json("Refresh token is not valid")
        }
        refreshTokenArr = refreshTokenArr.filter((token)=> token !== refreshToken);
        jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY, (err, user) =>{
            if(err){
                res.status(500).json(err)
            }
            const newAccessToken = authController.generateAccessToken(user)
            const newRefreshToken = authController.generateRefreshToken(user)
            refreshTokenArr.push(newRefreshToken);
            res.cookie("refreshToken", newRefreshToken, {
                httpOnly:true,
                secure:false,
                path:"/",
                sameSite:"strict"
            })
            res.status(200).json({accessToken: newAccessToken})
        })
    },
    logoutUser: async (req, res)=>{
        if(!req.cookies.refreshToken){
            res.status(403).json("You're not authenticated")
        }
        res.clearCookie("refreshToken");
        refreshTokenArr = refreshTokenArr.filter(token => token !== req.cookies.refreshToken)
        res.status(200).json("Logout successfully!")
    }
}

module.exports = authController
