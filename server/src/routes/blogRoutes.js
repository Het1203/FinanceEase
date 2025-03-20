import express from 'express';
import { createBlog, getBlogs } from '../controllers/blogController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/create', protect, createBlog);
router.get('/', protect, getBlogs);

export default router;