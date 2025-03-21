import { Outlet } from "react-router-dom"
import Sidebar from "../layouts/Sidebar"
import SearchBar from "../layouts/SearchBar"
import { UserCircle } from "lucide-react"

function Dashboard() {
    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <Sidebar />

            {/* Main content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Top header with search and profile */}
                <header className="bg-[#F2F1EF] shadow-sm p-3 flex items-center justify-between">
                    <SearchBar />
                    {/* <div className="flex items-center">
                        <UserCircle className="h-8 w-8 text-gray-500" />
                    </div> */}
                </header>

                {/* Main content area */}
                <main className="flex-1 overflow-y-auto p-4 bg-[#B3A9A2]">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}

export default Dashboard

