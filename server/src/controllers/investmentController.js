import Investment from '../models/Investment.js';

const addInvestment = async (req, res) => {
    const { typeOfInvestment, amountInvested, holdingTime, expectedReturn, timeOfReturn, status = 'active' } = req.body;

    try {
        const investment = await Investment.create({
            user: req.user._id,
            typeOfInvestment,
            amountInvested,
            holdingTime,
            expectedReturn,
            timeOfReturn,
            status,
        });

        res.status(201).json(investment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getInvestments = async (req, res) => {
    try {
        const investments = await Investment.find({ user: req.user._id });

        res.json(investments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getInvestmentsByType = async (req, res) => {
    try {
        const typeOfInvestment = req.query.type;
        const investments = await Investment.find({ user: req.user._id, typeOfInvestment });

        res.json(investments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export { addInvestment, getInvestments, getInvestmentsByType };