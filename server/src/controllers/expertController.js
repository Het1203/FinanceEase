import bcrypt from 'bcryptjs';
import { validationResult } from 'express-validator';
import Expert from '../models/Expert.js';

export const registerExpert = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, phoneNumber, age, occupation, expertise, password } = req.body;

    try {
        let expert = await Expert.findOne({ email });
        if (expert) {
            return res.status(400).json({ errors: [{ msg: 'Expert already exists' }] });
        }

        expert = new Expert({
            name,
            email,
            phoneNumber,
            age,
            occupation,
            expertise,
            password,
        });

        const salt = await bcrypt.genSalt(10);
        expert.password = await bcrypt.hash(password, salt);

        await expert.save();

        res.status(201).json({ msg: 'Expert registered successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

export const getExpertProfile = async (req, res) => {
    try {
        const expert = await Expert.findById(req.user.id);
        if (!expert) {
            return res.status(404).json({ message: 'Expert not found' });
        }
        res.json(expert);
    } catch (error) {
        console.error(error.message); // Log the error message
        res.status(500).json({ message: error.message });
    }
};

export const updateExpertProfile = async (req, res) => {
    const { name, email, phoneNumber, age, occupation, expertise } = req.body;

    try {
        const expert = await Expert.findById(req.user.id);
        if (!expert) {
            return res.status(404).json({ message: 'Expert not found' });
        }

        expert.name = name || expert.name;
        expert.email = email || expert.email;
        expert.phoneNumber = phoneNumber || expert.phoneNumber;
        expert.age = age || expert.age;
        expert.occupation = occupation || expert.occupation;
        expert.expertise = expertise || expert.expertise;

        const updatedExpert = await expert.save();
        res.json(updatedExpert);
    } catch (error) {
        console.error(error.message); // Log the error message
        res.status(500).json({ message: error.message });
    }
};