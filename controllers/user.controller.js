import User from '../models/user.model.js';

export const getUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        res.status(200).json({ success: true, data: users });
    } catch (err) {
        next(err); // fixed from 'next(error)' → 'next(err)'
    }
};

export const getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id).select('-password -refreshToken');
        if (!user) {
            const error = new Error('User not found');
            error.statusCode = 404;
            throw error; // it will be caught by catch block 
        }

        res.status(200).json({ success: true, data: user });
    } catch (err) {
        next(err);
    }
};

// const createUser = async (req, res, next) => {
// };

// const updateUser = async (req, res, next) => {
// };

export const deleteUser = async (req, res, next) => {
    try {
        const deleteuser = await User.findByIdAndDelete(req.params.id);
        if (!deleteuser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted' });
    } catch (err) {
        console.error('Delete User error', err);
        res.status(500).json({ message: "Failed to delete user" });
    }
};
