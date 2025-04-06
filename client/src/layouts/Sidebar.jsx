import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

function Sidebar() {
    const location = useLocation();
    const navigate = useNavigate();
    const currentPath = location.pathname;

    const [isModalOpen, setIsModalOpen] = useState(false);

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
                credentials: 'include',
            });

            if (response.ok) {
                navigate('/');
            } else {
                console.error('Failed to logout');
            }
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };

    return (
        <div className="w-64 bg-[#F2F1EF] border-r border-[#B1A6A4] flex flex-col h-full relative">
            {/* Logo */}
            <div className="p-4 border-b border-[#B1A6A4]">
                <Link to="/dashboard/home">
                    <h1 className="text-3xl font-bold text-[#4A4A4A]">FinanceEase</h1>
                </Link>
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
                    <p className="text-md text-[#4A4A4A] mb-2">Receive advice via <br /> one-on-one conversation with experts</p>
                    <button
                        className="bg-[#B3A9A2] text-white px-4 py-1 rounded-md text-sm hover:bg-[#a39890] transition-colors"
                        onClick={() => setIsModalOpen(true)}
                    >
                        Upgrade
                    </button>
                </div>
            </div>

            {/* Logout */}
            <div className="p-4 border-t border-[#B1A6A4]">
                <button onClick={handleLogout} className="block w-full text-2xl font-bold p-2 text-center text-[#4A4A4A] hover:underline">
                    Logout
                </button>
            </div>

            {/* Coming Soon Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-[#697184] p-6 rounded-md shadow-lg text-center">
                        <h2 className="text-3xl font-bold text-white mb-4">Coming Soon!</h2>
                        <p className="text-white text-xl mb-6">This feature is under development and will be available soon.</p>

                        <button
                            className="bg-[#D8CFD0] text-[#9E9797] text-xl font-bold px-6 py-2 rounded-md hover:bg-gray-100 transition-colors"
                            onClick={() => setIsModalOpen(false)}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Sidebar;