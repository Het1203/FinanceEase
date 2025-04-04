import { useState, useEffect } from "react";
import { Edit, Trash2, Plus } from "lucide-react";
import AddGoalModal from "../layouts/AddGoalModal";
import EditGoalModal from "../layouts/EditGoalModal";

function Goals() {
    const [goals, setGoals] = useState([]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [editingGoal, setEditingGoal] = useState(null);

    // Fetch goals from the backend
    useEffect(() => {
        const fetchGoals = async () => {
            try {
                const response = await fetch("http://localhost:5000/api/goals", {
                    method: "GET",
                    credentials: "include",
                });
                if (response.ok) {
                    const data = await response.json();
                    setGoals(data);
                } else {
                    console.error("Failed to fetch goals");
                }
            } catch (error) {
                console.error("Error fetching goals:", error);
            }
        };

        fetchGoals();
    }, []);

    // Add a new goal
    const addGoal = async (goal) => {
        try {
            const response = await fetch("http://localhost:5000/api/goals/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify(goal),
            });

            if (response.ok) {
                const newGoal = await response.json();
                setGoals([...goals, newGoal]);
                setShowAddModal(false);
            } else {
                console.error("Failed to add goal");
            }
        } catch (error) {
            console.error("Error adding goal:", error);
        }
    };

    // Update saved amount
    const updateSavedAmount = async (id, amount) => {
        try {
            const response = await fetch(`http://localhost:5000/api/goals/update/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({ savedAmount: amount }),
            });

            if (response.ok) {
                const updatedGoal = await response.json();
                setGoals(goals.map((goal) => (goal._id === id ? updatedGoal : goal)));
            } else {
                console.error("Failed to update saved amount");
            }
        } catch (error) {
            console.error("Error updating saved amount:", error);
        }
    };

    // Edit a goal
    const editGoal = async (updatedGoal) => {
        try {
            const response = await fetch(`http://localhost:5000/api/goals/update/${updatedGoal._id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify(updatedGoal),
            });

            if (response.ok) {
                const goal = await response.json();
                setGoals(goals.map((g) => (g._id === goal._id ? goal : g)));
                setEditingGoal(null);
            } else {
                console.error("Failed to edit goal");
            }
        } catch (error) {
            console.error("Error editing goal:", error);
        }
    };

    // Delete a goal
    const deleteGoal = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/api/goals/delete/${id}`, {
                method: "DELETE",
                credentials: "include",
            });

            if (response.ok) {
                setGoals(goals.filter((goal) => goal._id !== id));
            } else {
                console.error("Failed to delete goal");
            }
        } catch (error) {
            console.error("Error deleting goal:", error);
        }
    };

    return (
        <div className="ml-9 mt-3 space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-[#4A4A4A]">Ownership Awaits, Start Calculating!</h1>
                    <p className="text-xl mt-2 text-gray-600">Track your progress towards your financial goals.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Goals List */}
                <div className="md:col-span-2 bg-[#697184] p-6 rounded-md shadow-sm">
                    <h2 className="text-3xl font-medium text-[#D8CFD0] mb-6">Your Goals</h2>

                    {goals.length === 0 ? (
                        <div className="p-6 rounded-md text-center text-xl text-white">
                            <p>You haven't set any goals yet. Create your first goal!</p>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {goals.map((goal) => (
                                <div key={goal._id} className="bg-[#D8CFD0] p-4 rounded-md">
                                    <div className="flex justify-between items-start mb-2">
                                        <div>
                                            <h3 className="text-2xl font-medium text-[#1D3557]">{goal.goalName}</h3>
                                            <p className="text-lg text-dark">
                                                Target Amount: Rs. {goal.targetAmount.toLocaleString()} <br /> Priority: {goal.priority}
                                            </p>
                                        </div>
                                        <div className="flex space-x-2">
                                            <button
                                                onClick={() => setEditingGoal(goal)}
                                                className="p-1 rounded-md bg-[#BABABA] transition-colors"
                                            >
                                                <Edit className="h-4 w-4 text-white" />
                                            </button>
                                            <button
                                                onClick={() => deleteGoal(goal._id)}
                                                className="p-1 rounded-md bg-[#D25D5D] transition-colors"
                                            >
                                                <Trash2 className="h-4 w-4 text-white" />
                                            </button>
                                        </div>
                                    </div>

                                    <div className="mt-4">
                                        <div className="flex justify-between text-lg text-dark mb-1">
                                            <span>Amount saved: Rs. {goal.savedAmount.toLocaleString()}</span>
                                            <span>{Math.round((goal.savedAmount / goal.targetAmount) * 100)}%</span>
                                        </div>
                                        <div className="relative pt-1">
                                            <input
                                                type="range"
                                                min="0"
                                                max={goal.targetAmount}
                                                value={goal.savedAmount}
                                                onChange={(e) => updateSavedAmount(goal._id, Number.parseInt(e.target.value))}
                                                className="w-full h-2 bg-white/30 rounded-lg appearance-none cursor-pointer"
                                                style={{
                                                    background: `linear-gradient(to right, #697184 0%, #697184 ${(goal.savedAmount / goal.targetAmount) * 100}%, rgba(255,255,255,0.3) ${(goal.savedAmount / goal.targetAmount) * 100}%, rgba(255,255,255,0.3) 100%)`,
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Help Section */}
                <div className="w-110 h-125 bg-[#697184] p-6 rounded-md shadow-sm flex flex-col items-center justify-center">
                    <h2 className="text-3xl font-medium text-[#D8CFD0] text-center mb-6">Know how we help you achieve your goals</h2>
                    <p className="text-xl text-[#D8CFD0] mb-2">
                        A goal without a plan is just a wish. Our goal tracking system helps you break down your financial goals
                        into manageable steps.
                    </p>
                    <p className="text-xl text-[#D8CFD0] mb-2">
                        Set your target amount, track your progress, and adjust your savings as needed. We'll help you stay on track
                        and celebrate your milestones along the way.
                    </p>
                    <p className="text-xl text-[#D8CFD0] mb-6">
                        Remember, every small step counts towards your big financial goals!
                    </p>
                    <button
                        onClick={() => setShowAddModal(true)}
                        className="flex items-center justify-center bg-[#D8CFD0] text-[#9E9797] font-bold text-lg px-4 py-2 rounded-md hover:bg-gray-100 transition-colors flex items-center gap-2"
                    >
                        <Plus className="h-4 w-4" />
                        Create a Goal
                    </button>
                </div>
            </div>

            {/* Add Goal Modal */}
            {showAddModal && <AddGoalModal onAdd={addGoal} onClose={() => setShowAddModal(false)} />}

            {/* Edit Goal Modal */}
            {editingGoal && <EditGoalModal goal={editingGoal} onSave={editGoal} onClose={() => setEditingGoal(null)} />}
        </div>
    );
}

export default Goals;