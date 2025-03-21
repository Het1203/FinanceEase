import express from 'express';
import { addIncomeSource, getIncomeSources, deleteIncomeSource } from '../controllers/incomeController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/create', protect, addIncomeSource);
router.get('/getincome', protect, getIncomeSources);
router.delete('/deleteincome/:id', protect, deleteIncomeSource);


export default router;