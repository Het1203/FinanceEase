import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import Expert from '../models/Expert.js';

export const protect = async (req, res, next) => {
    let token;

    if (req.cookies.token) {
        try {
            token = req.cookies.token;
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Check if the user is an expert or a regular user
            if (decoded.type === 'expert') {
                req.user = await Expert.findById(decoded.id).select('-password');
            } else {
                req.user = await User.findById(decoded.id).select('-password');
            }

            next();
        } catch (error) {
            console.error(error);
            res.status(401).json({ message: 'Not authorized, token failed' });
        }
    }

    if (!token) {
        res.status(401).json({ message: 'Not authorized, no token' });
    }
};