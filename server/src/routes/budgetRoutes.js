import express from 'express';
import { createBudget, getCurrentBudget, getPreviousBudgets } from '../controllers/budgetController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/create', protect, createBudget);
router.get('/current', protect, getCurrentBudget);
router.get('/previous', protect, getPreviousBudgets);

export default router;