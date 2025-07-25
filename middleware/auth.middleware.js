const jwt = require('jsonwebtoken');
const User = require('../models/user.model.js')

const verifyAccessToken = async(req, res, next)=>{
    const token = req.cookies?.accessToken || req.headers['authorization']?.replace("Bearer ","");

    if(!token){
        return res
                .status(401)
                .json({message:"Access Token missing"});
    }

    try{
        const decodedToken= jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        const user = await User.findById(decodedToken?._id).select("-password -refreshToken")

        if(!user){
            return res.status(401).json({message:"Invalid Access Token"})
        }

        req.user =user;
        next()
    }catch(error){
        console.error("JWT Verify Error:", err);
        return res.status(401).json({ message: "Token verification failed" });
    }
    
};

module.exports ={verifyAccessToken};