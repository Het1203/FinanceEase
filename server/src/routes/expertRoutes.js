import express from 'express';
import { body } from 'express-validator';
import { registerExpert } from '../controllers/expertController.js';

const router = express.Router();

router.post(
    '/expert-register',
    [
        body('name').notEmpty().withMessage('Name is required'),
        body('email').isEmail().withMessage('Valid email is required'),
        body('phoneNumber').notEmpty().withMessage('Phone number is required'),
        body('age').isInt({ min: 18 }).withMessage('Age must be at least 18'),
        body('occupation').notEmpty().withMessage('Occupation is required'),
        body('expertise').notEmpty().withMessage('Area of expertise is required'),
        body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    ],
    registerExpert
);

export default router;