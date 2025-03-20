import User from '../models/User.js';

const updateUserProfile = async (req, res) => {
    const { name, email, phone, age, occupation, maritalStatus } = req.body;

    try {
        const user = await User.findByIdAndUpdate(
            req.user._id,
            { name, email, phone, age, occupation, maritalStatus },
            { new: true }
        );

        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export { updateUserProfile };