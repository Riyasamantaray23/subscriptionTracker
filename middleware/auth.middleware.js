import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

const verifyAccessToken = async (req, res, next) => {
    //?. is optional chaining — it avoids throwing an error if req.cookies is undefined
    const token = req.cookies?.accessToken || req.headers['authorization']?.replace("Bearer ", "");

    if (!token) {
        return res
            .status(401)
            .json({ message: "Access Token missing, Please login again." });
    }

    try {
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const user = await User.findById(decodedToken?._id).select("-password -refreshToken");

        if (!user) {
            return res.status(401).json({ message: "Invalid Access Token" });
        }

        req.user = user;
        next();
    } catch (err) {
        console.error("JWT Verify Error:", err);
        return res.status(401).json({ message: "Token verification failed" });
    }

};

export { verifyAccessToken };
