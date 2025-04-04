import { useState, useEffect } from 'react';
import Modal from '../layouts/Modal'; // Assuming you have a Modal component
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

function Budget() {
    const [isBudgetModalOpen, setIsBudgetModalOpen] = useState(false);
    const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false); // For Expense Modal
    const [budgetItems, setBudgetItems] = useState([{ category: '', amount: '' }]);
    const [expenseItems, setExpenseItems] = useState([{ category: '', amount: '' }]); // For Expenses
    const [currentMonthBudget, setCurrentMonthBudget] = useState([]);
    const [currentMonthExpenses, setCurrentMonthExpenses] = useState([]); // For Current Month Expenses
    const [previousMonthBudgets, setPreviousMonthBudgets] = useState([]);

    const colors = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40', '#FF6633', '#FF33FF', '#33FF33', '#33CCFF'];

    useEffect(() => {
        const fetchCurrentBudget = async () => {
            const response = await fetch('http://localhost:5000/api/budget/current', {
                credentials: 'include'
            });
            const data = await response.json();
            setCurrentMonthBudget(data.budget);
        };

        const fetchCurrentExpenses = async () => {
            const response = await fetch('http://localhost:5000/api/expenses/current', {
                credentials: 'include'
            });
            const data = await response.json();
            setCurrentMonthExpenses(data.expenses);
        };

        const fetchPreviousBudgets = async () => {
            const response = await fetch('http://localhost:5000/api/budget/previous', {
                credentials: 'include'
            });
            const data = await response.json();
            setPreviousMonthBudgets(data);
        };

        fetchCurrentBudget();
        fetchCurrentExpenses(); // Fetch current month expenses
        fetchPreviousBudgets();
    }, []);

    const handleAddBudgetItem = () => {
        setBudgetItems([...budgetItems, { category: '', amount: '' }]);
    };

    const handleDeleteBudgetItem = (index) => {
        const newBudgetItems = budgetItems.filter((_, i) => i !== index);
        setBudgetItems(newBudgetItems);
    };

    const handleBudgetItemChange = (index, field, value) => {
        const newBudgetItems = budgetItems.map((item, i) =>
            i === index ? { ...item, [field]: value } : item
        );
        setBudgetItems(newBudgetItems);
    };

    const handleSaveBudget = async () => {
        const response = await fetch('http://localhost:5000/api/budget/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({ budget: budgetItems.map(item => ({ ...item, amount: Number(item.amount) })) }) // Ensure amount is a number
        });

        const newBudget = await response.json();
        setCurrentMonthBudget(newBudget.budget);
        setBudgetItems([{ category: '', amount: '' }]); // Clear the budget items after saving
        setIsBudgetModalOpen(false);
    };

    const handleAddExpenseItem = () => {
        setExpenseItems([...expenseItems, { category: '', amount: '' }]);
    };

    const handleDeleteExpenseItem = (index) => {
        const newExpenseItems = expenseItems.filter((_, i) => i !== index);
        setExpenseItems(newExpenseItems);
    };

    const handleExpenseItemChange = (index, field, value) => {
        const newExpenseItems = expenseItems.map((item, i) =>
            i === index ? { ...item, [field]: value } : item
        );
        setExpenseItems(newExpenseItems);
    };

    const handleSaveExpenses = async () => {
        const response = await fetch('http://localhost:5000/api/expenses/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({ expenses: expenseItems.map(item => ({ ...item, amount: Number(item.amount) })) }) // Ensure amount is a number
        });

        const newExpenses = await response.json();
        setCurrentMonthExpenses(newExpenses.expenses);
        setExpenseItems([{ category: '', amount: '' }]); // Clear the expense items after saving
        setIsExpenseModalOpen(false);
    };

    const data = {
        labels: currentMonthBudget.map(item => item.category),
        datasets: [
            {
                data: currentMonthBudget.map(item => item.amount),
                backgroundColor: colors,
                hoverBackgroundColor: colors,
            },
        ],
    };

    const expenseData = {
        labels: currentMonthExpenses.map(item => item.category),
        datasets: [
            {
                data: currentMonthExpenses.map(item => item.amount),
                backgroundColor: colors,
                hoverBackgroundColor: colors,
            },
        ],
    };

    const options = {
        plugins: {
            legend: {
                display: false,
            },
        },
    };

    // Get current month and year
    const currentDate = new Date();
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const currentMonth = monthNames[currentDate.getMonth()];
    const currentYear = currentDate.getFullYear();

    // Calculate total budget and total expenses
    const totalBudget = currentMonthBudget.reduce((sum, item) => sum + item.amount, 0);
    const totalExpenses = currentMonthExpenses.reduce((sum, item) => sum + item.amount, 0);

    // Calculate category-wise comparison
    const comparison = currentMonthBudget.map(budgetItem => {
        const expenseItem = currentMonthExpenses.find(expense => expense.category === budgetItem.category);
        const spent = expenseItem ? expenseItem.amount : 0;
        const remaining = budgetItem.amount - spent;
        return {
            category: budgetItem.category,
            budgeted: budgetItem.amount,
            spent,
            remaining,
        };
    });

    return (
        <div className="space-y-6 ml-9 mt-4">
            <div className="flex justify-between items-center mb-10">
                <div className='w-250'>
                    <h1 className="text-4xl font-bold text-[#4A4A4A]">Budget Your Month, Own Your Future!</h1>
                    <p className="text-gray-700 mt-2 text-xl">Create your monthly budgets here.</p>
                </div>
            </div>

            <div className="flex flex-wrap gap-6">
                {/* Left Column */}
                <div className="flex flex-col gap-6 flex-1">
                    {/* Current Month Budget */}
                    <div className="bg-[#D8CFD0] p-6 rounded-md w-full h-90 shadow-sm">
                        <h2 className="text-center font-bold text-[#143159] text-xl mb-4">Budget Report For {currentMonth} {currentYear}</h2>
                        <div className="flex justify-center mb-4">
                            <div className="flex">
                                <div className="w-48 h-48 relative">
                                    <Pie data={data} options={options} />
                                </div>
                                <div className="flex flex-col justify-center ml-20">
                                    {currentMonthBudget.map((item, index) => (
                                        <div key={index} className="flex items-center mb-2">
                                            <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: colors[index % colors.length] }}></div>
                                            <span className="text-md">{item.category} - Rs. {item.amount}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-center mt-6">
                            <button className="bg-[#9E9797] text-[#4A4A4A] font-bold px-6 py-2 rounded-md transition-colors hover:bg-[#FFFCFC]" onClick={() => setIsBudgetModalOpen(true)}>
                                Create Budget
                            </button>
                        </div>
                    </div>

                    {/* Expense Report */}
                    <div className="bg-[#D8CFD0] p-6 rounded-md w-full h-90 shadow-sm">
                        <h2 className="text-center font-bold text-[#143159] text-xl mb-4">Expense Report For {currentMonth} {currentYear}</h2>
                        <div className="flex justify-center mb-4">
                            <div className="flex">
                                <div className="w-48 h-48 relative">
                                    <Pie data={expenseData} options={options} />
                                </div>
                                <div className="flex flex-col justify-center ml-20">
                                    {currentMonthExpenses.map((item, index) => (
                                        <div key={index} className="flex items-center mb-2">
                                            <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: colors[index % colors.length] }}></div>
                                            <span className="text-md">{item.category} - Rs. {item.amount}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-center mt-6">
                            <button className="bg-[#9E9797] text-[#4A4A4A] font-bold px-6 py-2 rounded-md transition-colors hover:bg-[#FFFCFC]" onClick={() => setIsExpenseModalOpen(true)}>
                                Manage Expenses
                            </button>
                        </div>
                    </div>
                </div>

                {/* Previous Months */}
                <div className="bg-[#697184] p-6 rounded-md shadow-sm flex-1">
                    <h2 className="text-center font-bold text-[#143159] text-xl mb-4">Budget Reports for Previous Months</h2>
                    <div className="flex flex-col gap-6">
                        {previousMonthBudgets.map((budget, index) => (
                            <div key={index} className="flex justify-center mb-4">
                                <div className="flex bg-[#D8CFD0] p-6 rounded-md shadow-sm">
                                    <div className="flex flex-col items-center">
                                        <h3 className="text-center font-bold text-[#4A4A4A] mb-2">{budget.month} {budget.year}</h3>
                                        <div className="w-48 h-48 relative">
                                            <Pie data={{
                                                labels: budget.budget.map(item => item.category),
                                                datasets: [
                                                    {
                                                        data: budget.budget.map(item => item.amount),
                                                        backgroundColor: colors,
                                                        hoverBackgroundColor: colors,
                                                    },
                                                ],
                                            }} options={options} />
                                        </div>
                                    </div>
                                    <div className="flex flex-col justify-center ml-20">
                                        {budget.budget.map((item, idx) => (
                                            <div key={idx} className="flex items-center mb-2">
                                                <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: colors[idx % colors.length] }}></div>
                                                <span className="text-md">{item.category} - Rs. {item.amount}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="bg-[#697184] p-6 rounded-md shadow-sm">
                <h2 className="text-center font-bold text-[#143159] text-xl mb-4">
                    Comparison of {currentMonth} {currentYear} Budget and Expense
                </h2>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-200">
                            <tr>
                                <th className="px-4 py-2 text-left text-gray-500 uppercase tracking-wider">
                                    Category
                                </th>
                                <th className="px-4 py-2 text-left text-gray-500 uppercase tracking-wider">
                                    Budgeted Amount
                                </th>
                                <th className="px-4 py-2 text-left text-gray-500 uppercase tracking-wider">
                                    Spent Amount
                                </th>
                                <th className="px-4 py-2 text-left text-gray-500 uppercase tracking-wider">
                                    Remaining/Overspent
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {comparison.map((item, index) => (
                                <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-100"}>
                                    <td className="px-4 py-3 text-gray-900">{item.category}</td>
                                    <td className="px-4 py-3 text-gray-900">Rs. {item.budgeted}</td>
                                    <td className="px-4 py-3 text-gray-900">Rs. {item.spent}</td>
                                    <td className={`px-4 py-3 font-bold ${item.remaining < 0 ? "text-red-600" : "text-green-600"}`}>
                                        {item.remaining < 0
                                            ? `Overspent: Rs. ${Math.abs(item.remaining)}`
                                            : `Remaining: Rs. ${item.remaining}`}
                                    </td>
                                </tr>
                            ))}
                            {/* Total Row */}
                            <tr className="bg-gray-300">
                                <td className="px-4 py-3 font-bold text-gray-900">Total</td>
                                <td className="px-4 py-3 font-bold text-gray-900">Rs. {totalBudget}</td>
                                <td className="px-4 py-3 font-bold text-gray-900">Rs. {totalExpenses}</td>
                                <td className={`px-4 py-3 font-bold ${totalBudget - totalExpenses < 0 ? "text-red-600" : "text-green-600"}`}>
                                    {totalBudget - totalExpenses < 0
                                        ? `Overspent: Rs. ${Math.abs(totalBudget - totalExpenses)}`
                                        : `Remaining: Rs. ${totalBudget - totalExpenses}`}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Budget Modal */}
            <Modal isOpen={isBudgetModalOpen} onClose={() => setIsBudgetModalOpen(false)}>
                <h2 className="text-xl flex justify-center text-[#4A4A4A] font-bold mb-4">Create Budget</h2>
                <div className="space-y-4">
                    {budgetItems.map((item, index) => (
                        <div key={index} className="flex space-x-4">
                            <input
                                type="text"
                                placeholder='Add Category'
                                value={item.category}
                                onChange={(e) => handleBudgetItemChange(index, 'category', e.target.value)}
                                className="w-1/2 bg-gray-200 rounded-md p-2 focus:outline-none"
                            />
                            <input
                                type="number"
                                placeholder='Amount'
                                value={item.amount}
                                onChange={(e) => handleBudgetItemChange(index, 'amount', e.target.value)}
                                className="w-1/2 bg-gray-200 rounded-md p-2 focus:outline-none"
                            />
                            {index > 0 && (
                                <button onClick={() => handleDeleteBudgetItem(index)} className="text-red-500">
                                    <img src="/Trash.svg" alt="Delete" className="w-6 h-8" />
                                </button>
                            )}
                        </div>
                    ))}
                    <div className="flex justify-center">
                        <button onClick={handleAddBudgetItem} className="bg-gray-200 text-[#4A4A4A] px-4 py-2 rounded-md hover:bg-gray-300 transition-colors">
                            Add More
                        </button>
                    </div>
                    <div className="flex justify-center space-x-4">
                        <button onClick={() => setIsBudgetModalOpen(false)} className="bg-gray-300 text-gray-700 font-bold px-4 py-2 rounded-md">
                            Cancel
                        </button>
                        <button onClick={handleSaveBudget} className="bg-[#4A4A4A] text-white font-bold px-4 py-2 rounded-md">
                            Save
                        </button>
                    </div>
                </div>
            </Modal>

            {/* Expense Modal */}
            <Modal isOpen={isExpenseModalOpen} onClose={() => setIsExpenseModalOpen(false)}>
                <h2 className="text-xl flex justify-center text-[#4A4A4A] font-bold mb-4">Manage Expenses</h2>
                <div className="space-y-4">
                    {expenseItems.map((item, index) => (
                        <div key={index} className="flex space-x-4">
                            <input
                                type="text"
                                placeholder='Add Category'
                                value={item.category}
                                onChange={(e) => handleExpenseItemChange(index, 'category', e.target.value)}
                                className="w-1/2 bg-gray-200 rounded-md p-2 focus:outline-none"
                            />
                            <input
                                type="number"
                                placeholder='Amount'
                                value={item.amount}
                                onChange={(e) => handleExpenseItemChange(index, 'amount', e.target.value)}
                                className="w-1/2 bg-gray-200 rounded-md p-2 focus:outline-none"
                            />
                            {index > 0 && (
                                <button onClick={() => handleDeleteExpenseItem(index)} className="text-red-500">
                                    <img src="/Trash.svg" alt="Delete" className="w-6 h-8" />
                                </button>
                            )}
                        </div>
                    ))}
                    <div className="flex justify-center">
                        <button onClick={handleAddExpenseItem} className="bg-gray-200 text-[#4A4A4A] px-4 py-2 rounded-md hover:bg-gray-300 transition-colors">
                            Add More
                        </button>
                    </div>
                    <div className="flex justify-center space-x-4">
                        <button onClick={() => setIsExpenseModalOpen(false)} className="bg-gray-300 text-gray-700 font-bold px-4 py-2 rounded-md">
                            Cancel
                        </button>
                        <button onClick={handleSaveExpenses} className="bg-[#4A4A4A] text-white font-bold px-4 py-2 rounded-md">
                            Save
                        </button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}

export default Budget;