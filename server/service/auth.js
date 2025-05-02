const dotenv = require("dotenv")
const jwt = require("jsonwebtoken")

dotenv.config();
const secret = process.env.JWT_SECRET_KEY

function setUser(user){
    return jwt.sign({
        _id : user._id,
        username : user.username,
        email : user.email
    } , secret)
}

function getUser(token){
    if (!token) return null
    return jwt.verify(token , secret)
}

module.exports = {
    setUser,
    getUser
}