import IncomeSource from '../models/IncomeSource.js';

const addIncomeSource = async (req, res) => {
    const { name, amount } = req.body;

    if (!name || !amount) {
        return res.status(400).json({ message: 'Please provide all required fields' });
    }

    try {
        const incomeSource = new IncomeSource({
            name,
            amount,
            userId: req.user._id,
        });

        const savedIncomeSource = await incomeSource.save();
        res.status(201).json(savedIncomeSource);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

const getIncomeSources = async (req, res) => {
    try {
        const incomeSources = await IncomeSource.find({ userId: req.user._id });
        res.status(200).json(incomeSources);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

const deleteIncomeSource = async (req, res) => {

    try {
        await IncomeSource.findByIdAndDelete(req.params.id);

        res.json({ message: 'Income deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export { addIncomeSource, getIncomeSources, deleteIncomeSource };