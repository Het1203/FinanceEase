import Liability from '../models/Liability.js';

const createLiability = async (req, res) => {
    const { name, amount, description, dueDate } = req.body;

    try {
        const liability = await Liability.create({
            user: req.user._id,
            name,
            amount,
            description,
            dueDate,
        });

        res.status(201).json(liability);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getLiabilities = async (req, res) => {
    try {
        const liabilities = await Liability.find({ user: req.user._id });

        res.json(liabilities);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteLiability = async (req, res) => {
    try {
        await Liability.findByIdAndDelete(req.params.id);

        res.json({ message: 'Liability deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export { createLiability, getLiabilities, deleteLiability };