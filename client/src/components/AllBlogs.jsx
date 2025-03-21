function AllBlogs() {
    // Sample blog data
    const blogs = [
        { title: "Secure Investments", author: "John Rick", date: "April 2023" },
        { title: "Secure Investments", author: "Jane Doe", date: "April 2023" },
        { title: "Secure Investments", author: "John Rick", date: "April 2023" },
        { title: "Secure Investments", author: "Jane Doe", date: "April 2023" },
    ]

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-[#4A4A4A]">Blogs</h1>

            <div className="bg-[#4A6FA5] p-6 rounded-md shadow-sm">
                {blogs.map((blog, index) => (
                    <div key={index} className="flex items-center space-x-4 p-4 border-b border-blue-400 last:border-0">
                        <div className="w-10 h-10 rounded-full bg-white overflow-hidden flex-shrink-0">
                            <img src="/user-avatar.jpg" alt={blog.author} className="w-full h-full object-cover" />
                        </div>
                        <div>
                            <h3 className="text-lg font-medium text-white">{blog.title}</h3>
                            <p className="text-sm text-blue-200">
                                {blog.author} • {blog.date}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default AllBlogs

