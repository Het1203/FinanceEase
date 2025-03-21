import mongoose from 'mongoose';

const budgetSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    month: { type: String, required: true },
    year: { type: Number, required: true },
    budget: [
        {
            category: { type: String, required: true },
            amount: { type: Number, required: true },
        },
    ],
}, { timestamps: true });

const Budget = mongoose.model('Budget', budgetSchema);

export default Budget;