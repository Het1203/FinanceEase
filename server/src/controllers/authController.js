import User from '../models/User.js';
import Expert from '../models/Expert.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const generateToken = (id, type) => {
    return jwt.sign({ id, type }, process.env.JWT_SECRET, {
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
            });
        } else {
            res.status(400).json({ message: 'Invalid user data' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if the user exists in the User collection
        let user = await User.findOne({ email });
        if (user && (await bcrypt.compare(password, user.password))) {
            const token = generateToken(user._id, 'user');
            res.cookie('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
                sameSite: 'strict',
                maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
            });
            return res.json({
                message: 'User logged in successfully',
                token,
            });
        }

        // Check if the user exists in the Expert collection
        let expert = await Expert.findOne({ email });
        if (expert && (await bcrypt.compare(password, expert.password))) {
            const token = generateToken(expert._id, 'expert');
            res.cookie('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
                sameSite: 'strict',
                maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
            });
            return res.json({
                message: 'Expert logged in successfully',
                token,
            });
        }

        return res.status(401).json({ message: 'Invalid email or password' });
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
            phone: user.phone,
            age: user.age,
            maritalStatus: user.maritalStatus,
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
    res.cookie('token', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        expires: new Date(0), // Expire the cookie immediately
    });
    res.status(200).json({ message: 'User logged out successfully' });
};

export { register, login, getMe, forgotPassword, resetPassword, logout };