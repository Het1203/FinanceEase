import { useState, useEffect } from 'react';
import Modal from '../layouts/Modal';

function AllBlogs() {
    const [blogs, setBlogs] = useState([]);
    const [selectedBlog, setSelectedBlog] = useState(null);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/blogs/allblogs', {
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

    const handleBlogClick = (blog) => {
        setSelectedBlog(blog);
    };

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-[#4A4A4A] ml-5 mt-10 mb-2">Blogs</h1>
            <p className="text-xl text-gray-700 ml-5 mb-8">Explore our latest blogs and articles published by experts.</p>

            <div className="bg-[#697184] p-6 rounded-md ml-5 mr-10 shadow-sm">
                {blogs.map((blog, index) => (
                    <div
                        key={index}
                        className="text-white p-4 rounded-md mb-4 border-b border-[#D8CFD0] last:border-0 last:mb-0 cursor-pointer flex justify-between items-center"
                        onClick={() => handleBlogClick(blog)}
                    >
                        <div>
                            <h3 className="text-[#102647] text-2xl font-bold">{blog.title}</h3>
                            <p className="text-lg text-dark">
                                {blog.author.name} • {blog.date}
                            </p>
                        </div>
                    </div>
                ))}
            </div>



            {/* Blog Details Modal */}
            {selectedBlog && (
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
            )}
        </div>
    );
}

export default AllBlogs;