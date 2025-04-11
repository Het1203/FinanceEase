import { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import Modal from '../layouts/Modal';

function YourBlogs() {
    const [blogs, setBlogs] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newBlog, setNewBlog] = useState({ title: '', content: '' });
    const [selectedBlog, setSelectedBlog] = useState(null);
    const [errors, setErrors] = useState({});
    const [expertName, setExpertName] = useState('');

    useEffect(() => {
        const fetchExpertName = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/expert/me', {
                    method: 'GET',
                    credentials: 'include',
                });
                if (response.ok) {
                    const data = await response.json();
                    setExpertName(data.name);
                } else {
                    console.error('Failed to fetch expert name');
                }
            } catch (error) {
                console.error('Error fetching expert name:', error);
            }
        };

        fetchExpertName();
    }, []);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/blogs/myblogs', {
                    method: 'GET',
                    credentials: 'include',
                });
                if (response.ok) {
                    const data = await response.json();
                    setBlogs(data);
                } else {
                    console.error('Failed to fetch blogs');
                }
            } catch (error) {
                console.error('Error fetching blogs:', error);
            }
        };

        fetchBlogs();
    }, []);

    const handlePostNewBlogClick = () => {
        setNewBlog({ title: '', content: '' });
        setErrors({});
        setIsModalOpen(true);
    };

    const validateBlogFields = () => {
        const newErrors = {};
        if (!newBlog.title.trim()) {
            newErrors.title = 'Blog title is required.';
        }
        if (!newBlog.content.trim()) {
            newErrors.content = 'Blog content is required.';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSaveBlog = async () => {
        if (!validateBlogFields()) return;

        try {
            const response = await fetch('http://localhost:5000/api/blogs/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(newBlog),
            });

            if (response.ok) {
                const savedBlog = await response.json();
                const populatedBlogResponse = await fetch(`http://localhost:5000/api/blogs/get/${savedBlog._id}`, {
                    method: 'GET',
                    credentials: 'include',
                });
                if (populatedBlogResponse.ok) {
                    const populatedBlog = await populatedBlogResponse.json();
                    setBlogs([...blogs, populatedBlog]);
                }
                setIsModalOpen(false);
            } else {
                console.error('Failed to save blog');
            }
        } catch (error) {
            console.error('Error saving blog:', error);
        }
    };

    const handleBlogClick = (blog) => {
        setSelectedBlog(blog);
    };

    const handleDeleteBlog = async (event, index) => {
        event.stopPropagation();
        const blogToDelete = blogs[index];
        try {
            const response = await fetch(`http://localhost:5000/api/blogs/delete/${blogToDelete._id}`, {
                method: 'DELETE',
                credentials: 'include',
            });

            if (response.ok) {
                setBlogs(blogs.filter((_, i) => i !== index));
            } else {
                console.error('Failed to delete blog');
            }
        } catch (error) {
            console.error('Error deleting blog:', error);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-[#4A4A4A] ml-5 mt-10 mb-2">Your Blogs</h1>
                <button
                    className="bg-white text-[#4A4A4A] px-4 py-2 mt-10 mr-10 rounded-md hover:bg-gray-100 transition-colors flex items-center gap-2"
                    onClick={handlePostNewBlogClick}
                >
                    <Plus className="h-4 w-4" />
                    Post new blog
                </button>
            </div>

            <div className="bg-[#697184] p-6 rounded-md ml-5 mr-10 shadow-sm">
                {blogs.map((blog, index) => (
                    <div
                        key={index}
                        className="p-4 rounded-md mb-4 border-b last:border-0 last:mb-0 cursor-pointer flex justify-between items-center"
                        onClick={() => handleBlogClick(blog)}
                    >
                        <div>
                            <h3 className="text-[#102647] text-2xl font-bold">{blog.title}</h3>
                            <p className="text-lg text-dark mt-1">
                                {blog.author.name} • {blog.date}
                            </p>
                        </div>
                        <button onClick={(event) => handleDeleteBlog(event, index)} className="text-red-700">
                            <img src="/Trash.svg" alt="Delete" className="w-10 h-12" />
                        </button>
                    </div>
                ))}
            </div>

            {/* Post New Blog Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-[#697184] p-6 rounded-md shadow-lg max-w-3xl w-full">
                        <h2 className="text-2xl flex justify-center text-[#D8CFD0] font-bold mb-4">Post New Blog</h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-lg font-medium text-gray-800">Blog Title</label>
                                <input
                                    type="text"
                                    placeholder="Enter blog title"
                                    value={newBlog.title}
                                    onChange={(e) => setNewBlog({ ...newBlog, title: e.target.value })}
                                    className="mt-1 block w-full bg-[#D8CFD0] rounded-md shadow-sm p-2 focus:outline-none focus:border-none"
                                />
                                {errors.title && <p className="text-red-600 text-md mt-1">{errors.title}</p>}
                            </div>
                            <div>
                                <label className="block text-lg font-medium text-gray-800">Content</label>
                                <textarea
                                    value={newBlog.content}
                                    placeholder="Enter blog content"
                                    rows="15"
                                    onChange={(e) => setNewBlog({ ...newBlog, content: e.target.value })}
                                    className="mt-1 block w-full bg-[#D8CFD0] rounded-md shadow-sm p-2 focus:outline-none focus:border-none"
                                />
                                {errors.content && <p className="text-red-600 text-md mt-1">{errors.content}</p>}
                            </div>
                            <div className="flex justify-center space-x-2">
                                <button
                                    className="bg-gray-300 text-gray-700 font-bold px-4 py-2 rounded-md hover:bg-gray-400 transition-colors"
                                    onClick={() => setIsModalOpen(false)}
                                >
                                    Cancel
                                </button>
                                <button
                                    className="bg-[#4A4A4A] text-white font-bold px-4 py-2 rounded-md hover:bg-[#4A4A4A]/70 transition-colors"
                                    onClick={handleSaveBlog}
                                >
                                    Save
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Blog Details Modal */}
            {
                selectedBlog && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                        <div className="bg-[#697184] p-6 rounded-md shadow-lg text-center w-full max-w-6xl h-[80vh] overflow-y-auto">
                            <h2 className="text-3xl flex justify-center text-[#102647] font-bold mt-3 mb-4">{selectedBlog.title}</h2>
                            <div className="space-y-4">
                                <p className="text-xl text-dark font-medium mb-10">
                                    {selectedBlog.author.name} • {selectedBlog.date}
                                </p>
                                <p className="text-xl text-[#D8CFD0]">{selectedBlog.content}</p>
                                <div className="flex justify-center space-x-2 mt-10">
                                    <button
                                        className="bg-gray-300 text-gray-700 text-xl font-bold px-4 py-2 rounded-md hover:bg-gray-100"
                                        onClick={() => setSelectedBlog(null)}
                                    >
                                        Close
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    );
}

export default YourBlogs;