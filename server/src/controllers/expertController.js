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