import Investment from '../models/Investment.js';

const addInvestment = async (req, res) => {
    const { name, amountInvested, date, holdingTime, expectedReturn, status } = req.body;

    try {
        const investment = await Investment.create({
            user: req.user._id,
            name,
            amountInvested,
            date,
            holdingTime,
            expectedReturn,
            status,
        });

        res.status(201).json(investment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getInvestments = async (req, res) => {
    const { search = '', sort = 'newest', page = 1, limit = 10 } = req.query;

    try {
        const query = {
            user: req.user._id,
            name: { $regex: search, $options: 'i' },
        };

        const sortOption = sort === 'newest' ? { date: -1 } : { date: 1 };

        const investments = await Investment.find(query)
            .select('_id name amountInvested date holdingTime expectedReturn status')
            .sort(sortOption)
            .skip((page - 1) * limit)
            .limit(Number(limit));

        const totalInvestments = await Investment.countDocuments(query);

        res.json({
            investments,
            totalPages: Math.ceil(totalInvestments / limit),
            currentPage: Number(page),
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getInvestmentsByName = async (req, res) => {
    try {
        const type = req.query.type;
        if (!type) {
            return res.status(400).json({ message: "Type is required" });
        }

        const investments = await Investment.find({
            user: req.user._id,
            name: { $regex: type, $options: 'i' },
        });

        res.json(investments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateInvestmentStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    try {
        const investment = await Investment.findByIdAndUpdate(
            id,
            { status },
            { new: true }
        );

        if (!investment) {
            return res.status(404).json({ message: "Investment not found" });
        }

        res.json(investment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export { addInvestment, getInvestments, getInvestmentsByName, updateInvestmentStatus };