import { useState, useEffect } from 'react';
import Modal from '../layouts/Modal'; // Assuming you have a Modal component

function Blogs() {
    const [blogs, setBlogs] = useState([]);
    const [selectedBlog, setSelectedBlog] = useState(null);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/blogs/allblogs', {
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

    const handleBlogClick = (blog) => {
        setSelectedBlog(blog);
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold text-[#4A4A4A] mb-4">Blogs</h1>
            <div className="space-y-4 bg-[#697184] p-6 rounded-md shadow-sm">
                {blogs.map((blog, index) => (
                    <div
                        key={index}
                        className="flex items-center space-x-3 cursor-pointer border-b border-[#D8CFD0] pb-2 last:border-0"
                        onClick={() => handleBlogClick(blog)}
                    >
                        <div className="w-8 h-8 rounded-full bg-gray-300 overflow-hidden">
                            <img src="/person.png" alt="Author" className="w-full h-full object-cover" />
                        </div>
                        <div>
                            <h3 className="text-[#D8CFD0] text-2xl font-bold">{blog.title}</h3>
                            <p className="text-xl font-medium text-[#D8CFD0]">{blog.author.name} • {blog.date}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Blog Details Modal */}
            {selectedBlog && (
                <Modal isOpen={!!selectedBlog} onClose={() => setSelectedBlog(null)}>
                    <h2 className="text-3xl flex justify-center text-[#D8CFD0] font-bold mb-4">{selectedBlog.title}</h2>
                    <div className="space-y-4">
                        <p className="text-xl text-blue-300 font-bold mb-10">
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

export default Blogs;