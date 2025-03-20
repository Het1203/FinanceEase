import Blog from '../models/Blog.js';

const createBlog = async (req, res) => {
    const { title, content } = req.body;

    try {
        const blog = await Blog.create({
            author: req.user._id,
            title,
            content,
        });

        res.status(201).json(blog);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find().populate('author', 'username');

        res.json(blogs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export { createBlog, getBlogs };