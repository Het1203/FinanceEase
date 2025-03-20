import express from 'express';
import { createUserProfile, getUserProfile, updateUserProfile } from '../controllers/UserProfileController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/create', protect, createUserProfile);
router.get('/', protect, getUserProfile);
router.patch('/update', protect, updateUserProfile);

export default router;