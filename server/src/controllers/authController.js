import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};

const register = async (req, res) => {
    const { username, email, profession, password } = req.body;

    try {
        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const user = await User.create({
            username,
            email,
            profession,
            password,
        });

        if (user) {
            res.status(201).json({
                _id: user._id,
                username: user.username,
                email: user.email,
                profession: user.profession,
                token: generateToken(user._id),
            });
        } else {
            res.status(400).json({ message: 'Invalid user data' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });

        if (user && (await bcrypt.compare(password, user.password))) {
            const token = generateToken(user._id);
            res.cookie('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
                sameSite: 'strict',
                maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
            });
            res.json({
                _id: user._id,
                username: user.username,
                email: user.email,
                profession: user.profession,
            });
        } else {
            res.status(401).json({ message: 'Invalid username or password' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getMe = async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        res.json({
            _id: user._id,
            username: user.username,
            email: user.email,
            profession: user.profession,
        });
    } else {
        res.status(404).json({ message: 'User not found' });
    }
};

const forgotPassword = async (req, res) => {
    // Implement forgot password functionality
    res.status(200).json({ message: 'Forgot password endpoint' });
};

const resetPassword = async (req, res) => {
    // Implement reset password functionality
    res.status(200).json({ message: 'Reset password endpoint' });
};
const logout = async (req, res) => {
    // Invalidate the token (this can be done in various ways, such as blacklisting the token)
    res.status(200).json({ message: 'User logged out successfully' });
};

export { register, login, getMe, forgotPassword, resetPassword, logout };