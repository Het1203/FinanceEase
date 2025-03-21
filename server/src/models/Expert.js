import mongoose from 'mongoose';

const ExpertSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    occupation: {
        type: String,
        required: true,
    },
    expertise: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
});

const Expert = mongoose.model('Expert', ExpertSchema);

export default Expert;