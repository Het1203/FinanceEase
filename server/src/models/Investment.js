import mongoose from 'mongoose';

const investmentSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        amountInvested: {
            type: Number,
            required: true,
        },
        date: {
            type: Date,
            required: true,
        },
        holdingTime: {
            type: String,
            required: true,
        },
        expectedReturn: {
            type: String,
            required: true,
        },
        status: {
            type: Boolean,
            default: true,
        },
    },
    { timestamps: true }
);

const Investment = mongoose.model('Investment', investmentSchema);

export default Investment;