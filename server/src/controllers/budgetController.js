import Budget from '../models/Budget.js';

const createBudget = async (req, res) => {
    const { category, amount, month, year } = req.body;

    try {
        const budget = await Budget.create({
            user: req.user._id,
            category,
            amount,
            month,
            year,
        });

        res.status(201).json(budget);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getCurrentBudget = async (req, res) => {
    try {
        const budget = await Budget.findOne({
            user: req.user._id,
            month: new Date().getMonth() + 1,
            year: new Date().getFullYear(),
        });

        res.json(budget);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getPreviousBudgets = async (req, res) => {
    try {
        const budgets = await Budget.find({
            user: req.user._id,
            month: { $lte: new Date().getMonth() },
            year: new Date().getFullYear(),
        }).sort({ month: -1 }).limit(2);

        res.json(budgets);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateBudget = async (req, res) => {
    const { category, amount } = req.body;

    try {
        const budget = await Budget.findOneAndUpdate(
            { user: req.user._id, month: new Date().getMonth() + 1, year: new Date().getFullYear() },
            { category, amount },
            { new: true }
        );

        res.json(budget);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export { createBudget, getCurrentBudget, getPreviousBudgets, updateBudget };