import { useState } from "react";
import { X } from "lucide-react";

function EditGoalModal({ goal, onSave, onClose }) {
    const [goalName, setGoalName] = useState(goal?.goalName || "");
    const [targetAmount, setTargetAmount] = useState(goal?.targetAmount?.toString() || "");
    const [savedAmount, setSavedAmount] = useState(goal?.savedAmount?.toString() || "");
    const [priority, setPriority] = useState(goal?.priority?.toString() || "");
    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const newErrors = {};

        if (!goalName.trim()) {
            newErrors.goalName = "Goal name is required";
        }

        if (!targetAmount) {
            newErrors.targetAmount = "Target amount is required";
        } else if (isNaN(Number(targetAmount)) || Number(targetAmount) <= 0) {
            newErrors.targetAmount = "Target amount must be a positive number";
        }

        if (!savedAmount) {
            newErrors.savedAmount = "Saved amount is required";
        } else if (isNaN(Number(savedAmount)) || Number(savedAmount) < 0) {
            newErrors.savedAmount = "Saved amount must be a non-negative number";
        } else if (Number(savedAmount) > Number(targetAmount)) {
            newErrors.savedAmount = "Saved amount cannot exceed target amount";
        }

        if (!priority) {
            newErrors.priority = "Priority is required";
        } else if (isNaN(Number(priority)) || Number(priority) < 1 || Number(priority) > 5) {
            newErrors.priority = "Priority must be a number between 1 and 5";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validateForm()) {
            onSave({
                _id: goal._id,
                goalName,
                targetAmount: Number(targetAmount),
                savedAmount: Number(savedAmount),
                priority: Number(priority),
            });
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-[#697184] p-6 rounded-lg shadow-lg w-full max-w-md relative">
                <button onClick={onClose} className="absolute top-4 right-4 text-white hover:text-gray-200">
                    <X className="h-5 w-5" />
                </button>

                <h2 className="text-xl font-bold text-white mb-6 text-center">Edit your financial goal</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <input
                            type="text"
                            placeholder="Goal Name"
                            value={goalName}
                            onChange={(e) => setGoalName(e.target.value)}
                            className={`w-full px-3 py-2 rounded bg-[#D8CFD0] text-dark placeholder-[#697184] focus:outline-none focus:ring-2 focus:ring-white/50 ${errors.goalName ? "border border-red-400" : ""
                                }`}
                        />
                        {errors.goalName && <p className="text-red-300 text-xs mt-1">{errors.goalName}</p>}
                    </div>

                    <div>
                        <input
                            type="text"
                            placeholder="Target Amount"
                            value={targetAmount}
                            onChange={(e) => setTargetAmount(e.target.value)}
                            className={`w-full px-3 py-2 rounded bg-[#D8CFD0] text-dark placeholder-[#697184] focus:outline-none focus:ring-2 focus:ring-white/50 ${errors.targetAmount ? "border border-red-400" : ""
                                }`}
                        />
                        {errors.targetAmount && <p className="text-red-300 text-xs mt-1">{errors.targetAmount}</p>}
                    </div>

                    <div>
                        <input
                            type="text"
                            placeholder="Saved Amount"
                            value={savedAmount}
                            onChange={(e) => setSavedAmount(e.target.value)}
                            className={`w-full px-3 py-2 rounded bg-[#D8CFD0] text-dark placeholder-[#697184] focus:outline-none focus:ring-2 focus:ring-white/50 ${errors.savedAmount ? "border border-red-400" : ""
                                }`}
                        />
                        {errors.savedAmount && <p className="text-red-300 text-xs mt-1">{errors.savedAmount}</p>}
                    </div>

                    <div>
                        <input
                            type="text"
                            placeholder="Priority value"
                            value={priority}
                            onChange={(e) => setPriority(e.target.value)}
                            className={`w-full px-3 py-2 rounded bg-[#D8CFD0] text-dark placeholder-[#697184] focus:outline-none focus:ring-2 focus:ring-white/50 ${errors.priority ? "border border-red-400" : ""
                                }`}
                        />
                        {errors.priority && <p className="text-red-300 text-xs mt-1">{errors.priority}</p>}
                    </div>

                    <div className="flex justify-center pt-2">
                        <button
                            type="submit"
                            className="bg-[#D8CFD0] text-[#697184] font-bold px-6 py-2 rounded-md hover:bg-gray-100 transition-colors"
                        >
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EditGoalModal;