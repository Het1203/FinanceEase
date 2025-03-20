import mongoose from 'mongoose';

const investmentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    typeOfInvestment: {
        type: String,
        required: true,
    },
    amountInvested: {
        type: Number,
        required: true,
    },
    holdingTime: {
        type: Number,
        required: true,
    },
    expectedReturn: {
        type: Number,
        required: true,
    },
    timeOfReturn: {
        type: Date,
        required: true,
    },
    status: {
        type: Boolean,
        default: true,
    },
}, { timestamps: true });

const Investment = mongoose.model('Investment', investmentSchema);

export default Investment;