import mongoose from 'mongoose';

const goalSchema = new mongoose.Schema(
    {
        goalName: {
            type: String,
            required: true,
            trim: true,
        },
        targetAmount: {
            type: Number,
            required: true,
            min: 0,
        },
        savedAmount: {
            type: Number,
            default: 0,
            min: 0,
        },
        priority: {
            type: Number,
            required: true,
            min: 1,
            max: 5,
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
    },
    { timestamps: true }
);

const Goal = mongoose.model('Goal', goalSchema);

export default Goal;