import { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import Modal from '../layouts/Modal';

function YourBlogs() {
    const [blogs, setBlogs] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newBlog, setNewBlog] = useState({ title: '', content: '' });
    const [selectedBlog, setSelectedBlog] = useState(null);
    const [expertName, setExpertName] = useState('');

    useEffect(() => {
        const fetchExpertName = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/expert/me', {
                    method: 'GET',
                    credentials: 'include', // Include cookies in the request
                });
                if (response.ok) {
                    const data = await response.json();
                    setExpertName(data.name); // Ensure the correct property is used
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
                    credentials: 'include', // Include cookies in the request
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
        setIsModalOpen(true);
    };

    const handleSaveBlog = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/blogs/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include', // Include cookies in the request
                body: JSON.stringify(newBlog),
            });

            if (response.ok) {
                const savedBlog = await response.json();
                // Fetch the newly created blog with the populated author field
                const populatedBlogResponse = await fetch(`http://localhost:5000/api/blogs/get/${savedBlog._id}`, {
                    method: 'GET',
                    credentials: 'include', // Include cookies in the request
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
        event.stopPropagation(); // Stop event propagation
        const blogToDelete = blogs[index];
        try {
            const response = await fetch(`http://localhost:5000/api/blogs/delete/${blogToDelete._id}`, {
                method: 'DELETE',
                credentials: 'include', // Include cookies in the request
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
                        className="text-white p-4 rounded-md mb-4 border-b border-[#D8CFD0] last:border-0 last:mb-0 cursor-pointer flex justify-between items-center"
                        onClick={() => handleBlogClick(blog)}
                    >
                        <div>
                            <h3 className="text-[#D8CFD0] text-2xl font-bold">{blog.title}</h3>
                            <p className="text-xl font-medium text-[#D8CFD0]">
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
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <h2 className="text-3xl flex justify-center text-[#D8CFD0] font-bold mb-4">Post New Blog</h2>
                <div className="space-y-4">
                    <div>
                        <label className="block text-xl font-bold text-[#D8CFD0]">Blog Title</label>
                        <input
                            type="text"
                            value={newBlog.title}
                            onChange={(e) => setNewBlog({ ...newBlog, title: e.target.value })}
                            className="mt-1 block w-full bg-[#D8CFD0] rounded-md shadow-sm p-2 focus:outline-none focus:border-none"
                        />
                    </div>
                    <div>
                        <label className="block text-xl font-bold text-[#D8CFD0]">Content</label>
                        <textarea
                            value={newBlog.content}
                            onChange={(e) => setNewBlog({ ...newBlog, content: e.target.value })}
                            className="mt-1 block w-full bg-[#D8CFD0] rounded-md shadow-sm p-2 focus:outline-none focus:border-none"
                        />
                    </div>
                    <div className="flex justify-center space-x-2">
                        <button
                            className="bg-gray-300 text-gray-700 text-xl font-bold px-4 py-2 rounded-md"
                            onClick={() => setIsModalOpen(false)}
                        >
                            Cancel
                        </button>
                        <button
                            className="bg-[#D8CFD0] text-[#817B7B] text-xl font-bold px-4 py-2 rounded-md"
                            onClick={handleSaveBlog}
                        >
                            Save
                        </button>
                    </div>
                </div>
            </Modal>

            {/* Blog Details Modal */}
            {selectedBlog && (
                <Modal isOpen={!!selectedBlog} onClose={() => setSelectedBlog(null)}>
                    <h2 className="text-3xl flex justify-center text-[#D8CFD0] font-bold mb-4">{selectedBlog.title}</h2>
                    <div className="space-y-4">
                        <p className="text-xl text-blue-100 font-bold mb-10">
                            {selectedBlog.author.name} • {selectedBlog.date}
                        </p>
                        <p className="text-xl text-[#D8CFD0]">{selectedBlog.content}</p>
                        <div className="flex justify-center space-x-2 mt-20">
                            <button
                                className="bg-gray-300 text-gray-700 text-xl font-bold px-4 py-2 rounded-md"
                                onClick={() => setSelectedBlog(null)}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </Modal>
            )}
        </div>
    );
}

export default YourBlogs;