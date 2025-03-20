import express from 'express';
import { addInvestment, getInvestments, getInvestmentsByType } from '../controllers/investmentController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/add', protect, addInvestment);
router.get('/', protect, getInvestments);
router.get('/typeofinvestment', protect, getInvestmentsByType);

export default router;