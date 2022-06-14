const jwt = require('jsonwebtoken')

const userMiddleware = {
    verifyToken: (req, res, next)=>{
        const token = req.headers.token
        if(token){
            const accessToken = token.split(" ")[1];
            jwt.verify(accessToken, process.env.JWT_ACCESS_KEY, (err, user )=>{
                if(err){
                    return res.status(403).json("Token is not valid!")
                }
                req.user = user
                next()
            })
        } else {
            return res.status(401).json("You're not authenticated!")
        }
    },
    verifyTokenAndIsAdmin: (req, res, next)=>{
        userMiddleware.verifyToken(req, res, ()=>{
            if(req.user.admin){
                next()
            }
            else {
                return res.status(403).json("You're not allowed")
            }
        })
    }
}

module.exports = userMiddleware