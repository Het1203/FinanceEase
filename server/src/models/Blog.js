import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Expert',
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
}, { timestamps: true });

const Blog = mongoose.model('Blog', blogSchema);

export default Blog;