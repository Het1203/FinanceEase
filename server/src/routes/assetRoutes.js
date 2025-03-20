import express from 'express';
import { createAsset, getAssets, deleteAsset } from '../controllers/assetController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/create', protect, createAsset);
router.get('/', protect, getAssets);
router.delete('/delete/:id', protect, deleteAsset);

export default router;