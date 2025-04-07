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

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
        return res.status(400).json({
            message: 'Password must be at least 8 characters long, include uppercase, lowercase, a number, and a special character.',
        });
    }

    try {
        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            username,
            email,
            profession,
            password: hashedPassword,
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
        console.error(error.message);
        res.status(500).json({ message: error.message });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if (user) {
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (isPasswordValid) {
                const token = generateToken(user._id, 'user');
                res.cookie('token', token, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    sameSite: 'strict',
                    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
                });
                return res.json({
                    message: 'User logged in successfully',
                    token,
                });
            } else {
                return res.status(401).json({ message: 'Invalid email or password' });
            }
        }

        let expert = await Expert.findOne({ email });
        if (expert) {
            const isPasswordValid = await bcrypt.compare(password, expert.password);
            if (isPasswordValid) {
                const token = generateToken(expert._id, 'expert');
                res.cookie('token', token, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    sameSite: 'strict',
                    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
                });
                return res.json({
                    message: 'Expert logged in successfully',
                    token,
                });
            } else {
                return res.status(401).json({ message: 'Invalid email or password' });
            }
        }
        console.error('No user or expert found with email:', email);
        return res.status(401).json({ message: 'Invalid email or password' });
    } catch (error) {
        console.error('Error during login:', error.message);
        res.status(500).json({ message: 'Server error' });
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

const updateUserProfile = async (req, res) => {
    const { username, email, phone, age, profession, maritalStatus } = req.body;

    try {
        const user = await User.findByIdAndUpdate(
            req.user._id,
            { username, email, phone, age, profession, maritalStatus },
            { new: true }
        );

        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
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
        expires: new Date(0),
    });
    res.status(200).json({ message: 'User logged out successfully' });
};

export { register, login, getMe, updateUserProfile, forgotPassword, resetPassword, logout };