import { Link, useLocation, useNavigate } from "react-router-dom";

function Sidebar() {
    const location = useLocation();
    const navigate = useNavigate();
    const currentPath = location.pathname;

    // Navigation items
    const navItems = [
        { name: "Overview", path: "/dashboard/home" },
        { name: "Budget", path: "/dashboard/budget" },
        { name: "Investments", path: "/dashboard/investments" },
        { name: "Goals", path: "/dashboard/goals" },
        { name: "Profile", path: "/dashboard/profile" },
        { name: "Blogs", path: "/dashboard/blogs" },
    ];

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
                <h1 className="text-xl font-bold text-[#4A4A4A]">FinanceEase</h1>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 space-y-2">
                {navItems.map((item) => (
                    <Link
                        key={item.path}
                        to={item.path}
                        className={`block p-2 rounded-md transition-colors ${currentPath === item.path ? "bg-[#4A4A4A] text-white" : "bg-[#D9D9D9] text-[#4A4A4A] hover:bg-[#c0c0c0]"
                            }`}
                    >
                        {item.name}
                    </Link>
                ))}
            </nav>

            {/* Expert advice section */}
            <div className="p-4">
                <div className="bg-[#D9D9D9] p-4 rounded-md flex flex-col items-center text-center">
                    <div className="w-16 h-16 rounded-full bg-gray-300 mb-2 overflow-hidden">
                        <img src="/person.png" alt="User" className="w-full h-full object-cover" />
                    </div>
                    <p className="text-xs text-[#4A4A4A] mb-2">Receive advice via one-on-one conversation with experts</p>
                    <button className="bg-[#B3A9A2] text-white px-4 py-1 rounded-md text-sm hover:bg-[#a39890] transition-colors">
                        Upgrade
                    </button>
                </div>
            </div>

            {/* Logout */}
            <div className="p-4 border-t border-[#B1A6A4]">
                <button onClick={handleLogout} className="block w-full p-2 text-center text-[#4A4A4A] hover:underline">
                    Logout
                </button>
            </div>
        </div>
    );
}

export default Sidebar;