import Expense from '../models/Expense.js';

export const getCurrentMonthExpenses = async (req, res) => {
    const userId = req.user._id;
    const currentDate = new Date();
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const currentMonth = monthNames[currentDate.getMonth()];
    const currentYear = currentDate.getFullYear();

    try {
        const currentExpenses = await Expense.findOne({ user: userId, month: currentMonth, year: currentYear });
        res.status(200).json(currentExpenses || { month: currentMonth, year: currentYear, expenses: [] });
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch expenses', error: error.message });
    }
};

export const createExpenses = async (req, res) => {
    const userId = req.user._id;
    const { expenses } = req.body;
    const currentDate = new Date();
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const currentMonth = monthNames[currentDate.getMonth()];
    const currentYear = currentDate.getFullYear();

    try {
        let existingExpenses = await Expense.findOne({ user: userId, month: currentMonth, year: currentYear });

        if (existingExpenses) {
            // Update the existing expenses
            expenses.forEach(newExpense => {
                const existingExpense = existingExpenses.expenses.find(expense => expense.category === newExpense.category);
                if (existingExpense) {
                    existingExpense.amount += Number(newExpense.amount); // Add the new amount to the existing amount
                } else {
                    existingExpenses.expenses.push(newExpense);
                }
            });
            await existingExpenses.save();
            res.status(200).json(existingExpenses);
        } else {
            // Create a new expense document
            const newExpenses = new Expense({ user: userId, month: currentMonth, year: currentYear, expenses });
            await newExpenses.save();
            res.status(201).json(newExpenses);
        }
    } catch (error) {
        res.status(500).json({ message: 'Failed to create expenses', error: error.message });
    }
};