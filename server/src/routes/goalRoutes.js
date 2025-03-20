import express from 'express';
import { createGoal, getGoals, updateGoal, deleteGoal } from '../controllers/goalController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/create', protect, createGoal);
router.get('/', protect, getGoals);
router.patch('/update/:id', protect, updateGoal);
router.delete('/delete/:id', protect, deleteGoal);

export default router;