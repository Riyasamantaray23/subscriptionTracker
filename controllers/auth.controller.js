const jwt = require('jsonwebtoken');
const bcrypt =require('bcrypt');
const User =require('../models/user.model.js')


//POST/ signin
const signUp = async(req, res, next)=>{
    //Implement signUp logic here 
    try{
        const{username, email, password} = req.body; //destructuring data

        //Validating inputs
        //if any of the field are missing
        if(!username || !email|| !password){
            return res.status(400).json({success: false, message: 'Field is Empty'})
        }
        //if user already exists
        const existingUser =await User.findOne({email});
        if (existingUser){
            return res.status(400).json({success: false, message:'User already exists'})
        }

        //Creating a new user
        const user = await User.create({username, email, password});

        //Instances of the mehtods defined in user.model.js
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();
        user.refreshToken = refreshToken;
        await user.save();
        /*
        res.cookie(name, value, options) 
        cookie() is a method to set cookies in the response.
        name: the key/name of the cookie.
        value: the data you want to store in the cookie (usually a string or token).
        options: an object with settings that control how the cookie behaves (like expiration, security, visibility, etc).
        */

        //sending json response , adding access token for immediate login after signup
        res
        .cookie("accessToken", accessToken, {
            httpOnly: true,
            maxAge: 15 * 60 * 1000 // 15 minutes
        })
        .cookie("refreshToken", refreshToken, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        })
        .status(201)
        .json({
            success: true,
            message: "User created successfully",
            user:{
                _id: user._id,
                username: user.username,
                email:user.email,
            }
        });

    }catch(err){
         return next(err);
    } //Even though you don’t explicitly import errorMiddleware inside auth.controller.js, Express knows where to send the error because it flows through the middleware chain defined in your main index.js file.
};

//Access Token → short-lived, sent via headers (Authorization)
//Refresh Token → long-lived, stored securely in a cookie
//SIGN IN 

const signIn = async(req, res, next)=>{
    try{
        const{email, password} = req.body;


        if(!email|| !password){
            return res.status(400).json({success: false, message: 'Field is Empty'})
        }

        const user =await User.findOne({email});
        if (!user){
            return res.status(401).json({success: false, message:'Invalid email'})
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(401).json({message: "Invalid Password"});
        }

        const accessToken =user.generateAccessToken();
        const refreshToken =user.generateRefreshToken();
        user.refreshToken = refreshToken;
        await user.save();

        res
        .cookie("accessToken", accessToken, {
            httpOnly: true,
            maxAge: 15 * 60 * 1000 // 15 minutes
        })
        .cookie("refreshToken", refreshToken, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        })
        .status(200)
        .json({
            success: true,
            message: "Login successful",
            user: {
            _id: user._id,
            username: user.username,
            email: user.email
            }
        });

    } catch(err){
        console.error("Signin Error", err);
        res.status(500).json({message: "Internal Server Error"});
    }
};

const signOut = async(req, res, next)=>{
    //Implement signOut logic here 
     

    try{
        const user= await User.findById(req.user._id);
        if(user){
            user.refreshToken =null;
            await user.save();
        }
        res
        .clearCookie('refreshToken')
        .clearCookie('accessToken')
        .status(200)
        .json({message: "Logged out successfully"})
    }catch(err){
        console.error("Signout Error:", err);
        res.status(500).json({message:"Internal Server Error"});
    }

}

const refreshAccessToken =async(req, res, next)=>{
    const incomingRefreshToken= req.cookies.refreshToken || req.body.refreshToken

    if(!incomingRefreshToken){
        return res.status(401).json({ success: false, message: 'Unauthorized Access' });
    }
    try{
        const decodedRefreshToken =jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET);
        const user = await User.findById(decodedRefreshToken?._id);
        if(!user){
            return res.status(401).json({ success: false, message: 'Invalid Refresh Token' });
        }

        if(incomingRefreshToken !== user?.refreshToken){
            return res.status(401).json({ success: false, message: 'Refresh Token is expired' });
        }
        const accessToken = user.generateAccessToken();
        res
        .cookie("accessToken", accessToken, {
            httpOnly: true,
            maxAge: 15 * 60 * 1000 // 15 minutes
        })
        .cookie("refreshToken", incomingRefreshToken, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        })
        .status(200)
        .json({
            success: true,
            message: "Access Token refreshed successfully",
            user:{
                _id: user._id,
                username: user.username,
                email:user.email,
            }
        });
    }catch(err){
        console.error("Refresh token error:", err);
        return res.status(403).json({ success: false, message: "Token invalid or expired" });   next(err);
    }

    
}
module.exports ={signUp, signIn, signOut, refreshAccessToken};