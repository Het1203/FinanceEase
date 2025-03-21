import express from 'express';
import { check } from 'express-validator';
import { register, login, getMe, forgotPassword, resetPassword, logout } from '../controllers/authController.js';
import { updateUserProfile } from '../controllers/userProfileController.js';
import { protect } from '../middlewares/authMiddleware.js';
import { validate } from '../middlewares/validationMiddleware.js';

const router = express.Router();

router.post('/register', [
    check('username', 'Username is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').not().isEmpty(),
], validate, register);

router.post('/login', [
    check('email', 'email is required').not().isEmpty(),
    check('password', 'Password is required').not().isEmpty(),
], validate, login);

router.get('/me', protect, getMe);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);
router.post('/logout', protect, logout);
router.put('/profile/update', protect, updateUserProfile);

export default router;