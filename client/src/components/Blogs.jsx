import { useState, useEffect } from 'react';

function Blogs() {
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
        <div className="ml-9 mt-4 mr-10">
            <h1 className="text-4xl font-bold text-[#4A4A4A] mb-2">Blogs</h1>
            <p className="text-xl text-gray-700 mb-8">Explore our latest blogs and articles published by experts to enhance your financial knowledge.</p>
            <div className="space-y-4 bg-[#697184] p-6 rounded-md shadow-sm">
                {blogs.map((blog, index) => (
                    <div
                        key={index}
                        className="flex items-center space-x-3 cursor-pointer border-b rounded-md border-[#102647] pb-2 last:border-0"
                        onClick={() => handleBlogClick(blog)}
                    >
                        {/* <div className="w-8 h-8 rounded-full bg-gray-300 overflow-hidden">
                            <img src="/person.png" alt="Author" className="w-full h-full object-cover" />
                        </div> */}
                        <div>
                            <h3 className="text-[#102647] text-2xl font-bold">{blog.title}</h3>
                            <p className="text-lg text-dark">{blog.author.name} • {blog.date}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Blog Details Modal */}
            {selectedBlog && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-[#697184] p-6 rounded-md shadow-lg w-full max-w-6xl h-[80vh] overflow-y-auto">
                        <h2 className="text-3xl flex justify-center text-[#102647] font-bold mt-3 mb-4">{selectedBlog.title}</h2>
                        <div className="space-y-4">
                            <p className="text-xl text-dark font-medium text-center mb-10">
                                {selectedBlog.author.name} • {selectedBlog.date}
                            </p>
                            <p className="text-xl text-[#D8CFD0]">
                                {selectedBlog.content.split('\n').map((paragraph, index) => (
                                    <span key={index} className="block mb-4">
                                        {paragraph}
                                    </span>
                                ))}
                            </p>
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

export default Blogs;