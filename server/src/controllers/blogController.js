import Blog from '../models/Blog.js';

const createBlog = async (req, res) => {
    const { title, content } = req.body;

    try {
        const date = new Date();
        const month = date.toLocaleString('default', { month: 'long' });
        const year = date.getFullYear();
        const formattedDate = `${month} ${year}`;

        const blog = await Blog.create({
            author: req.user._id,
            title,
            content,
            date: formattedDate,
        });

        res.status(201).json(blog);
    } catch (error) {
        console.error('Error creating blog:', error.message);
        res.status(500).json({ message: error.message });
    }
};

const getBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find().populate('author', 'name');

        res.json(blogs);
    } catch (error) {
        console.error('Error fetching blogs:', error.message);
        res.status(500).json({ message: error.message });
    }
};

const getBlogById = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id).populate('author', 'name');
        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }
        res.json(blog);
    } catch (error) {
        console.error('Error fetching blog:', error.message);
        res.status(500).json({ message: error.message });
    }
};

const deleteBlog = async (req, res) => {
    try {
        await Blog.findByIdAndDelete(req.params.id);
        res.json({ message: 'Blog removed' });
    } catch (error) {
        console.error('Error deleting blog:', error.message);
        res.status(500).json({ message: error.message });
    }
};

export { createBlog, getBlogs, getBlogById, deleteBlog };