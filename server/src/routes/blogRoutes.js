import express from 'express';
import { createBlog, getBlogs, getBlogById, deleteBlog } from '../controllers/blogController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/create', protect, createBlog);
router.get('/', protect, getBlogs);
router.get('/get/:id', getBlogById);
router.delete('/delete/:id', protect, deleteBlog);

export default router;