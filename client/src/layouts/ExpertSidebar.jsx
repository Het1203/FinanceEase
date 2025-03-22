import { Link, useLocation, useNavigate } from "react-router-dom"

function ExpertSidebar() {
    const location = useLocation()
    const navigate = useNavigate();
    const currentPath = location.pathname

    // Navigation items for expert
    const navItems = [
        { name: "Profile", path: "/expert/profile" },
        { name: "Your Blogs", path: "/expert/your-blogs" },
        { name: "All Blogs", path: "/expert/all-blogs" },
        { name: "Connect", path: "/expert/connect" },
    ]

    const handleLogout = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/auth/logout', {
                method: 'POST',
                credentials: 'include', // Include cookies in the request
            });

            if (response.ok) {
                navigate('/'); // Redirect to landing page
            } else {
                console.error('Failed to logout');
            }
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };

    return (
        <div className="w-64 bg-gray-100 border-r border-[#B1A6A4] flex flex-col h-full">
            {/* Logo */}
            <div className="p-4 border-b border-[#B1A6A4]">
                <Link to="/expert/profile">
                    <h1 className="text-3xl font-bold text-[#4A4A4A]">FinanceEase</h1>
                </Link>
            </div>

            {/* Navigation */}
            <nav className="flex-1 mt-7 p-4 space-y-2">
                {navItems.map((item) => (
                    <Link
                        key={item.path}
                        to={item.path}
                        className={`block p-2 mt-2 mb-5 rounded-md transition-colors ${currentPath === item.path ? "bg-[#4A4A4A] text-white" : "bg-[#D9D9D9] text-[#4A4A4A] hover:bg-[#c0c0c0]"
                            }`}
                    >
                        {item.name}
                    </Link>
                ))}
            </nav>

            {/* Logout */}
            <div className="p-4 border-t border-[#B1A6A4] mt-auto">
                <Link to="/" onClick={handleLogout} className="block p-2 text-2xl font-bold text-center text-[#4A4A4A] hover:underline">
                    Logout
                </Link>
            </div>
        </div>
    )
}

export default ExpertSidebar

