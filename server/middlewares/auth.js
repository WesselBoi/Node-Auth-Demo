const {getUser} = require("../service/auth")

function restrictToLoggedInUserOnly(req,res,next){
    const userToken = req.cookies?.token;
    if(!userToken) return res.status(401).json({ msg: "Unauthorized: Login required" });

    const user = getUser(userToken);
    if(!user) return res.status(401).json({ msg: "Unauthorized: Login required" });

    req.user = user;
    next();
}

module.exports =  {restrictToLoggedInUserOnly}