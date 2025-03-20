import express from 'express';
import { createLiability, getLiabilities, deleteLiability } from '../controllers/liabilityController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/create', protect, createLiability);
router.get('/', protect, getLiabilities);
router.delete('/delete/:id', protect, deleteLiability);

export default router;