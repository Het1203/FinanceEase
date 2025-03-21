import mongoose from 'mongoose';

const IncomeSourceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
}, { timestamps: true });

const IncomeSource = mongoose.model('IncomeSource', IncomeSourceSchema);

export default IncomeSource;