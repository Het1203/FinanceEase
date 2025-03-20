import { PieChart } from "lucide-react"

function Budget() {
    // Sample data for pie charts
    const categories = ["Groceries", "Utilities", "Housing", "Others"]
    const colors = ["#FF6B6B", "#4A90E2", "#FFD166", "#06D6A0"]

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-[#4A4A4A]">Budget Your Month, Own Your Future!</h1>
            <p className="text-gray-600">Create your monthly budgets here.</p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Current Month Budget */}
                <div className="bg-white p-6 rounded-md shadow-sm">
                    <h2 className="text-center font-bold text-[#4A4A4A] mb-4">Budget Report For Current Month</h2>
                    <div className="flex justify-center mb-4">
                        <div className="w-48 h-48 relative">
                            <PieChart className="w-full h-full text-gray-300" />
                            {/* This is a placeholder. In a real app, you'd use a proper chart library */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-32 h-32 rounded-full bg-white"></div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-wrap justify-center gap-4">
                        {categories.map((category, index) => (
                            <div key={index} className="flex items-center">
                                <div className="w-3 h-3 rounded-full mr-1" style={{ backgroundColor: colors[index] }}></div>
                                <span className="text-xs">{category}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Previous Months */}
                <div className="bg-gray-100 p-6 rounded-md shadow-sm">
                    <h2 className="text-center font-bold text-[#4A4A4A] mb-4">Budget Reports for Previous Months</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {["January, 2024", "February, 2024"].map((month, monthIndex) => (
                            <div key={monthIndex} className="bg-white p-4 rounded-md">
                                <h3 className="text-center text-[#4A4A4A] font-medium mb-2">{month}</h3>
                                <div className="flex justify-center mb-2">
                                    <div className="w-24 h-24 relative">
                                        <PieChart className="w-full h-full text-gray-300" />
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="w-16 h-16 rounded-full bg-white"></div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-wrap justify-center gap-2">
                                    {categories.map((category, index) => (
                                        <div key={index} className="flex items-center">
                                            <div className="w-2 h-2 rounded-full mr-1" style={{ backgroundColor: colors[index] }}></div>
                                            <span className="text-xs">{category}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="flex justify-center">
                <button className="bg-gray-200 text-[#4A4A4A] px-6 py-2 rounded-md hover:bg-gray-300 transition-colors">
                    Create Budget
                </button>
            </div>
        </div>
    )
}

export default Budget

