import User from '../models/User.js';

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

export { updateUserProfile };