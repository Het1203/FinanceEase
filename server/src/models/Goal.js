import mongoose from 'mongoose';

const goalSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    goalName: {
        type: String,
        required: true,
    },
    targetAmount: {
        type: Number,
        required: true,
    },
    savedAmount: {
        type: Number,
        default: 0,
    },
    deadline: {
        type: Date,
        required: true,
    },
}, { timestamps: true });

const Goal = mongoose.model('Goal', goalSchema);

export default Goal;