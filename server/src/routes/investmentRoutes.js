import express from 'express';
import { addInvestment, getInvestments, getInvestmentsByName, updateInvestmentStatus } from '../controllers/investmentController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/add', protect, addInvestment);
router.get('/', protect, getInvestments);
router.get('/typeofinvestment', protect, getInvestmentsByName);
router.put('/:id/status', protect, updateInvestmentStatus);

export default router;