import UserProfile from '../models/UserProfile.js';

const createUserProfile = async (req, res) => {
    const { name, email, phone, age, occupation, maritalStatus } = req.body;

    try {
        const userProfile = await UserProfile.create({
            user: req.user._id,
            name,
            email,
            phone,
            age,
            occupation,
            maritalStatus,
        });

        res.status(201).json(userProfile);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getUserProfile = async (req, res) => {
    try {
        const userProfile = await UserProfile.findOne({ user: req.user._id });

        res.json(userProfile);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateUserProfile = async (req, res) => {
    const { name, email, phone, age, occupation, maritalStatus } = req.body;

    try {
        const userProfile = await UserProfile.findOneAndUpdate(
            { user: req.user._id },
            { name, email, phone, age, occupation, maritalStatus },
            { new: true }
        );

        res.json(userProfile);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export { createUserProfile, getUserProfile, updateUserProfile };