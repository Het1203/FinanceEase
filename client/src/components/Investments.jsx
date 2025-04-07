import { useState, useEffect } from "react";
import { Search, ChevronDown, Plus } from "lucide-react";

function Investments() {
    const [investments, setInvestments] = useState([]);
    const [isInvestmentModalOpen, setIsInvestmentModalOpen] = useState(false);
    const [newInvestment, setNewInvestment] = useState({
        name: "",
        amount: "",
        date: "",
        expectedReturn: "",
        timeOfReturn: "",
        status: "Active",
    });
    const [investmentErrors, setInvestmentErrors] = useState({});
    const [searchQuery, setSearchQuery] = useState("");
    const [sortOrder, setSortOrder] = useState("newest");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const ITEMS_PER_PAGE = 10;

    // Fetch investments from the backend
    const fetchAllInvestments = async () => {
        try {
            const url = `http://localhost:5000/api/investments?sort=${sortOrder}&page=${currentPage}&limit=${ITEMS_PER_PAGE}`;

            const response = await fetch(url, {
                method: "GET",
                credentials: "include",
            });

            if (response.ok) {
                const data = await response.json();
                const mappedInvestments = data.investments.map((investment) => ({
                    id: investment._id,
                    name: investment.name,
                    amount: investment.amountInvested,
                    date: investment.date,
                    expectedReturn: investment.expectedReturn,
                    timeOfReturn: investment.holdingTime,
                    status: investment.status ? "Active" : "Inactive",
                }));
                setInvestments(mappedInvestments);
                setTotalPages(data.totalPages);
            } else {
                console.error("Failed to fetch investments");
            }
        } catch (error) {
            console.error("Error fetching investments:", error);
        }
    };

    const fetchInvestmentsByType = async () => {
        try {
            const url = `http://localhost:5000/api/investments/typeofinvestment?type=${searchQuery}`;

            const response = await fetch(url, {
                method: "GET",
                credentials: "include",
            });

            if (response.ok) {
                const data = await response.json();
                const mappedInvestments = data.map((investment) => ({
                    id: investment._id,
                    name: investment.name,
                    amount: investment.amountInvested,
                    date: investment.date,
                    expectedReturn: investment.expectedReturn,
                    timeOfReturn: investment.holdingTime,
                    status: investment.status ? "Active" : "Inactive",
                }));
                setInvestments(mappedInvestments);
                setTotalPages(1);
            } else {
                console.error("Failed to fetch investments by type");
            }
        } catch (error) {
            console.error("Error fetching investments by type:", error);
        }
    };

    const updateInvestmentStatus = async (id, newStatus) => {
        try {
            const response = await fetch(`http://localhost:5000/api/investments/${id}/status`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({ status: newStatus }),
            });

            if (response.ok) {
                const updatedInvestment = await response.json();
                setInvestments((prevInvestments) =>
                    prevInvestments.map((investment) =>
                        investment.id === updatedInvestment._id
                            ? { ...investment, status: updatedInvestment.status ? "Active" : "Inactive" }
                            : investment
                    )
                );
            } else {
                console.error("Failed to update investment status");
            }
        } catch (error) {
            console.error("Error updating investment status:", error);
        }
    };

    useEffect(() => {
        if (searchQuery.trim()) {
            fetchInvestmentsByType();
        } else {
            fetchAllInvestments();
        }
    }, [searchQuery, sortOrder, currentPage]);

    const handleInputChange = (field, value) => {
        setNewInvestment((prev) => ({ ...prev, [field]: value }));
    };

    const validateInvestmentFields = () => {
        const errors = {};
        if (!newInvestment.name.trim()) errors.name = "Name of Investment is required.";
        if (!newInvestment.amount || isNaN(newInvestment.amount) || Number(newInvestment.amount) <= 0)
            errors.amount = "Amount must be a positive number.";
        if (!newInvestment.date.trim()) errors.date = "Date of Investment is required.";
        if (!newInvestment.expectedReturn.trim())
            errors.expectedReturn = "Expected Return is required.";
        if (!newInvestment.timeOfReturn.trim())
            errors.timeOfReturn = "Holding Time is required.";
        setInvestmentErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSaveInvestment = async () => {
        if (!validateInvestmentFields()) return;

        try {
            const response = await fetch("http://localhost:5000/api/investments/add", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({
                    name: newInvestment.name,
                    amountInvested: newInvestment.amount,
                    date: newInvestment.date,
                    expectedReturn: newInvestment.expectedReturn,
                    holdingTime: newInvestment.timeOfReturn,
                    status: newInvestment.status === "Active",
                }),
            });

            if (response.ok) {
                fetchAllInvestments();
                setIsInvestmentModalOpen(false);
                setNewInvestment({
                    name: "",
                    amount: "",
                    date: "",
                    expectedReturn: "",
                    timeOfReturn: "",
                    status: "Active",
                });
            } else {
                console.error("Failed to add investment");
            }
        } catch (error) {
            console.error("Error adding investment:", error);
        }
    };

    return (
        <div className="ml-9 mt-4 space-y-6 mr-15">
            <div className="flex justify-between items-center" style={{ marginBottom: '6px' }}>
                <h1 className="text-4xl font-bold text-[#4A4A4A]">Invest, Track, Triumph!</h1>
                <button
                    className="flex items-center justify-center bg-white text-[#8A8383] font-bold text-lg px-4 py-2 rounded-md hover:bg-gray-100 transition-colors flex items-center gap-2"
                    onClick={() => setIsInvestmentModalOpen(true)}
                >
                    <Plus className="h-4 w-4" />
                    Add Investment
                </button>
            </div>
            <p className="text-xl text-gray-700">Manage your investments with ease.</p>

            {/* Existing Investments Table */}
            <div className="bg-[#697184] p-6 rounded-md shadow-sm mt-7.5">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-medium text-white">Track Investments</h2>
                    <div className="flex items-center space-x-4">
                        <div className="relative w-64">
                            <input
                                type="text"
                                placeholder="Type of investment"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-1 rounded-md bg-gray-100 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#B3A9A2]"
                            />
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        </div>
                        <div className="flex items-center space-x-2">
                            <span className="text-md ml-10 text-white">Sort by :</span>
                            <button
                                className="flex items-center space-x-1 bg-gray-100 px-3 py-1 rounded-md text-sm"
                                onClick={() =>
                                    setSortOrder((prev) => (prev === "newest" ? "oldest" : "newest"))
                                }
                            >
                                <span>{sortOrder === "newest" ? "Newest" : "Oldest"}</span>
                                <ChevronDown className="h-4 w-4" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Table */}
                <div className="bg-gray-200 rounded-md overflow-hidden mb-8 shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-200">
                                <tr>
                                    <th className="px-4 py-2 text-left text-gray-500 uppercase tracking-wider">
                                        Name of Investment
                                    </th>
                                    <th className="px-4 py-2 text-left text-gray-500 uppercase tracking-wider">
                                        Amount Invested
                                    </th>
                                    <th className="px-4 py-2 text-left text-gray-500 uppercase tracking-wider">
                                        Date of Investment
                                    </th>
                                    <th className="px-4 py-2 text-left text-gray-500 uppercase tracking-wider">
                                        Expected Return
                                    </th>
                                    <th className="px-4 py-2 text-left text-gray-500 uppercase tracking-wider">
                                        Holding Time
                                    </th>
                                    <th className="px-4 py-2 text-left text-gray-500 uppercase tracking-wider">
                                        Status
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {investments.map((investment, index) => (
                                    <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-200"}>
                                        <td className="px-4 py-3 text-md text-gray-900">{investment.name}</td>
                                        <td className="px-4 py-3 text-md text-gray-900">Rs. {investment.amount}</td>
                                        <td className="px-4 py-3 text-md text-gray-900">{new Date(investment.date).toISOString().split('T')[0]}</td>
                                        <td className="px-4 py-3 text-md text-gray-900">{investment.expectedReturn}%</td>
                                        <td className="px-4 py-3 text-md text-gray-900">{investment.timeOfReturn} years</td>
                                        <td className="px-4 py-3 text-md">
                                            <span
                                                onClick={() =>
                                                    updateInvestmentStatus(investment.id, investment.status === "Active" ? false : true)
                                                }
                                                className={`cursor-pointer px-2 py-1 rounded-full text-xs ${investment.status === "Active"
                                                    ? "bg-green-100 text-green-800"
                                                    : "bg-red-100 text-red-800"
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
                </div>
                <div className="flex justify-between items-center mt-4">
                    <button
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                        className={`px-4 py-2 rounded-md ${currentPage === 1 ? "bg-gray-100 text-gray-700" : "bg-[#4A4A4A] text-white hover:bg-[#3A3A3A]"}`}
                    >
                        Previous
                    </button>
                    <span className="text-white text-lg font-medium">
                        Page {currentPage} of {totalPages}
                    </span>
                    <button
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                        className={`px-4 py-2 rounded-md ${currentPage === totalPages ? "bg-gray-300 text-gray-500" : "bg-[#4A4A4A] text-white hover:bg-[#3A3A3A]"}`}
                    >
                        Next
                    </button>
                </div>
            </div>

            {/* Add Investment Modal */}
            {isInvestmentModalOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-[#697184] p-6 rounded-md shadow-lg text-center w-full max-w-4xl h-[62vh] overflow-y-auto">
                        <h2 className="text-2xl flex justify-center text-[#4A4A4A] font-bold mb-4">
                            Add Investment
                        </h2>
                        <div className="space-y-4">
                            <div>
                                <input
                                    type="text"
                                    placeholder="Name of Investment (eg. Stocks, Bonds)"
                                    value={newInvestment.name}
                                    onChange={(e) => handleInputChange("name", e.target.value)}
                                    className="w-full bg-gray-200 rounded-md p-2 focus:outline-none"
                                />
                                {investmentErrors.name && (
                                    <p className="text-red-500 text-sm">{investmentErrors.name}</p>
                                )}
                            </div>
                            <div>
                                <input
                                    type="number"
                                    placeholder="Amount Invested (eg. 1000)"
                                    value={newInvestment.amount}
                                    onChange={(e) => handleInputChange("amount", e.target.value)}
                                    className="w-full bg-gray-200 rounded-md p-2 focus:outline-none"
                                />
                                {investmentErrors.amount && (
                                    <p className="text-red-500 text-sm">{investmentErrors.amount}</p>
                                )}
                            </div>
                            <div>
                                <input
                                    type="date"
                                    placeholder="Date of Investment"
                                    value={newInvestment.date}
                                    onChange={(e) => handleInputChange("date", e.target.value)}
                                    className="w-full bg-gray-200 rounded-md p-2 focus:outline-none"
                                />
                                {investmentErrors.date && (
                                    <p className="text-red-500 text-sm">{investmentErrors.date}</p>
                                )}
                            </div>
                            <div>
                                <input
                                    type="text"
                                    placeholder="Expected Return (eg. 10%)"
                                    value={newInvestment.expectedReturn}
                                    onChange={(e) => handleInputChange("expectedReturn", e.target.value)}
                                    className="w-full bg-gray-200 rounded-md p-2 focus:outline-none"
                                />
                                {investmentErrors.expectedReturn && (
                                    <p className="text-red-500 text-sm">{investmentErrors.expectedReturn}</p>
                                )}
                            </div>
                            <div>
                                <input
                                    type="text"
                                    placeholder="Holding Time (eg. 5 years)"
                                    value={newInvestment.timeOfReturn}
                                    onChange={(e) => handleInputChange("timeOfReturn", e.target.value)}
                                    className="w-full bg-gray-200 rounded-md p-2 focus:outline-none"
                                />
                                {investmentErrors.timeOfReturn && (
                                    <p className="text-red-500 text-sm">{investmentErrors.timeOfReturn}</p>
                                )}
                            </div>
                            <div>
                                <select
                                    value={newInvestment.status}
                                    onChange={(e) => handleInputChange("status", e.target.value)}
                                    className="w-full bg-gray-200 rounded-md p-2 focus:outline-none"
                                >
                                    <option value="Active">Active</option>
                                    <option value="Inactive">Inactive</option>
                                </select>
                            </div>
                            <div className="flex justify-center space-x-4">
                                <button
                                    onClick={() => setIsInvestmentModalOpen(false)}
                                    className="bg-gray-300 text-gray-700 font-bold px-4 py-2 rounded-md"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleSaveInvestment}
                                    className="bg-[#4A4A4A] text-white font-bold px-4 py-2 rounded-md"
                                >
                                    Save
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Investments;