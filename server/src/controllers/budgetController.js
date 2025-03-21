import Budget from '../models/Budget.js';

export const createBudget = async (req, res) => {
    const userId = req.user._id;
    const { budget } = req.body;
    const currentDate = new Date();
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const currentMonth = monthNames[currentDate.getMonth()];
    const currentYear = currentDate.getFullYear();

    try {
        let existingBudget = await Budget.findOne({ user: userId, month: currentMonth, year: currentYear });

        if (existingBudget) {
            // Update the existing budget
            budget.forEach(newItem => {
                const existingItem = existingBudget.budget.find(item => item.category === newItem.category);
                if (existingItem) {
                    existingItem.amount += Number(newItem.amount); // Add the new amount to the existing amount
                } else {
                    existingBudget.budget.push(newItem);
                }
            });
            await existingBudget.save();
            res.status(200).json(existingBudget);
        } else {
            // Create a new budget
            const newBudget = new Budget({ user: userId, month: currentMonth, year: currentYear, budget });
            await newBudget.save();
            res.status(201).json(newBudget);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getCurrentBudget = async (req, res) => {
    const userId = req.user._id;
    const currentDate = new Date();
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const currentMonth = monthNames[currentDate.getMonth()];
    const currentYear = currentDate.getFullYear();

    try {
        const currentBudget = await Budget.findOne({ user: userId, month: currentMonth, year: currentYear });
        res.status(200).json(currentBudget || { month: currentMonth, year: currentYear, budget: [] });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getPreviousBudgets = async (req, res) => {
    const userId = req.user._id;
    const currentDate = new Date();
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const currentMonthIndex = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    try {
        const previousBudgets = [];
        for (let i = 1; i <= 2; i++) {
            let monthIndex = currentMonthIndex - i;
            let year = currentYear;
            if (monthIndex < 0) {
                monthIndex += 12;
                year -= 1;
            }
            const month = monthNames[monthIndex];
            const budget = await Budget.findOne({ user: userId, month, year });
            previousBudgets.push(budget || { month, year, budget: [] });
        }
        res.status(200).json(previousBudgets);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};