import { Search, ChevronDown } from "lucide-react"

function Investments() {
    // Sample investment data
    const investments = [
        {
            type: "Large-Cap Stocks",
            amount: "Rs. 2,50,000",
            holdingTime: "2-3 years",
            expectedReturn: "8.5%",
            timeOfReturn: "5 years",
            status: "Active",
        },
        {
            type: "Small-Cap Stocks",
            amount: "Rs. 2,00,000",
            holdingTime: "3-7 years",
            expectedReturn: "12.5%",
            timeOfReturn: "7 years",
            status: "Active",
        },
        {
            type: "Corporate Bonds",
            amount: "Rs. 5,00,000",
            holdingTime: "5-10 years",
            expectedReturn: "6.7%",
            timeOfReturn: "10 years",
            status: "Active",
        },
        {
            type: "Real Estate Investment Trust (REIT)",
            amount: "Rs. 4,00,000",
            holdingTime: "3 years",
            expectedReturn: "6.8%",
            timeOfReturn: "3 years",
            status: "Active",
        },
        {
            type: "Gold",
            amount: "Rs. 3,50,000",
            holdingTime: "1-5 years",
            expectedReturn: "5.2%",
            timeOfReturn: "5 years",
            status: "Active",
        },
        {
            type: "Peer-to-Peer Lending",
            amount: "Rs. 50,000",
            holdingTime: "6 months",
            expectedReturn: "8.5%",
            timeOfReturn: "6 months",
            status: "Danger",
        },
        {
            type: "ETFs",
            amount: "Rs. 75,000",
            holdingTime: "2-3 years",
            expectedReturn: "7.2%",
            timeOfReturn: "3 years",
            status: "Active",
        },
    ]

    return (
        <div className="ml-9 mt-4 space-y-6 mr-15">
            <div className="flex justify-between items-center">
                <h1 className="text-4xl font-bold text-[#4A4A4A]">Invest, Track, Triumph!</h1>
                <button className="bg-white text-[#4A4A4A] px-4 py-2 rounded-md hover:bg-gray-100 transition-colors">
                    Add Investment
                </button>
            </div>

            <div className="bg-[#697184] p-6 rounded-md shadow-sm">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-medium text-white">Track Investments</h2>
                    {/* Search and filter */}
                    <div className="flex items-center space-x-4">
                        <div className="relative w-64">
                            <input
                                type="text"
                                placeholder="Search investments..."
                                className="w-full pl-10 pr-4 py-1 rounded-md bg-gray-100 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#B3A9A2]"
                            />
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        </div>

                        <div className="flex items-center space-x-2">
                            <span className="text-md ml-10 text-white">Sort by :</span>
                            <button className="flex items-center space-x-1 bg-gray-100 px-3 py-1 rounded-md text-sm">
                                <span>Recent</span>
                                <ChevronDown className="h-4 w-4" />
                            </button>
                        </div>
                    </div>
                </div>

                <div className="bg-gray-200 rounded-md overflow-hidden mb-8 shadow-sm">

                    {/* Table */}
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-200">
                                <tr>
                                    <th className="px-4 py-2 text-left text-gray-500 uppercase tracking-wider">
                                        Type of Investment
                                    </th>
                                    <th className="px-4 py-2 text-left text-gray-500 uppercase tracking-wider">
                                        Amount Invested
                                    </th>
                                    <th className="px-4 py-2 text-left text-gray-500 uppercase tracking-wider">
                                        Holding Time
                                    </th>
                                    <th className="px-4 py-2 text-left text-gray-500 uppercase tracking-wider">
                                        Expected Return
                                    </th>
                                    <th className="px-4 py-2 text-left text-gray-500 uppercase tracking-wider">
                                        Time of Return
                                    </th>
                                    <th className="px-4 py-2 text-left text-gray-500 uppercase tracking-wider">
                                        Status
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {investments.map((investment, index) => (
                                    <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-200"}>
                                        <td className="px-4 py-3 text-sm text-gray-900">{investment.type}</td>
                                        <td className="px-4 py-3 text-sm text-gray-900">{investment.amount}</td>
                                        <td className="px-4 py-3 text-sm text-gray-900">{investment.holdingTime}</td>
                                        <td className="px-4 py-3 text-sm text-gray-900">{investment.expectedReturn}</td>
                                        <td className="px-4 py-3 text-sm text-gray-900">{investment.timeOfReturn}</td>
                                        <td className="px-4 py-3 text-sm">
                                            <span
                                                className={`px-2 py-1 rounded-full text-xs ${investment.status === "Active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                                                    }`}
                                            >
                                                {investment.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div className="p-3 border-t flex justify-between items-center">
                        <div className="text-sm text-gray-500">Showing rows 1 to 7 of 42 entries</div>
                        <div className="flex space-x-1">
                            {[1, 2, 3, 4, 5].map((page) => (
                                <button
                                    key={page}
                                    className={`w-8 h-8 flex items-center justify-center rounded-md ${page === 1 ? "bg-[#4A6FA5] text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                        }`}
                                >
                                    {page}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Investments

