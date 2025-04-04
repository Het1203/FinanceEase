import express from 'express';
import {
    getCurrentMonthExpenses,
    createExpenses,
} from '../controllers/expenseController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/current', protect, getCurrentMonthExpenses);
router.post('/create', protect, createExpenses);

export default router;