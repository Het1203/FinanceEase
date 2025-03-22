import express from 'express';
import { createBlog, getBlogs, getBlogById, deleteBlog, getBlogsByExpert, getAllBlogs } from '../controllers/blogController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/create', protect, createBlog);
router.get('/', protect, getBlogs);
router.get('/get/:id', getBlogById);
router.delete('/delete/:id', protect, deleteBlog);
router.get('/myblogs', protect, getBlogsByExpert);
router.get('/allblogs', getAllBlogs);

export default router;