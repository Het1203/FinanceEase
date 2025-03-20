import Goal from '../models/Goal.js';

const createGoal = async (req, res) => {
    const { goalName, targetAmount, deadline, savedAmount } = req.body;

    try {
        const goal = await Goal.create({
            user: req.user._id,
            goalName,
            targetAmount,
            deadline,
            savedAmount
        });

        res.status(201).json(goal);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getGoals = async (req, res) => {
    try {
        const goals = await Goal.find({ user: req.user._id });

        res.json(goals);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateGoal = async (req, res) => {
    const { goalName, targetAmount, deadline, savedAmount } = req.body;

    try {
        const goal = await Goal.findOneAndUpdate(
            { _id: req.params.id, user: req.user._id },
            { goalName, targetAmount, deadline, savedAmount },
            { new: true }
        );

        if (!goal) {
            return res.status(404).json({ message: 'Goal not found' });
        }

        res.json(goal);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteGoal = async (req, res) => {
    try {
        const goal = await Goal.findOneAndDelete({ _id: req.params.id, user: req.user._id });

        if (!goal) {
            return res.status(404).json({ message: 'Goal not found' });
        }

        res.json({ message: 'Goal deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export { createGoal, getGoals, updateGoal, deleteGoal };