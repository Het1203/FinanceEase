import { Plus } from "lucide-react"

function YourBlogs() {
    // Sample blog data
    const blogs = [
        { title: "Secure Investments", author: "John Rick", date: "April 2023" },
        { title: "Secure Investments", author: "John Rick", date: "April 2023" },
    ]

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-[#4A4A4A]">Your Blogs</h1>
                <button className="bg-white text-[#4A4A4A] px-4 py-2 rounded-md hover:bg-gray-100 transition-colors flex items-center gap-2">
                    <Plus className="h-4 w-4" />
                    Post new blog
                </button>
            </div>

            <div className="bg-[#4A6FA5] p-6 rounded-md shadow-sm">
                {blogs.map((blog, index) => (
                    <div
                        key={index}
                        className="bg-[#4A6FA5] text-white p-4 rounded-md mb-4 border-b border-blue-400 last:border-0 last:mb-0"
                    >
                        <h3 className="text-xl font-medium mb-1">{blog.title}</h3>
                        <p className="text-sm text-blue-200">
                            {blog.author} • {blog.date}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default YourBlogs

