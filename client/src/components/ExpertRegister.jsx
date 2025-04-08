import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";

function ExpertRegister() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [age, setAge] = useState("");
    const [occupation, setOccupation] = useState("");
    const [expertise, setExpertise] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const validateFields = () => {
        const newErrors = {};

        if (!name.trim()) newErrors.name = "Full Name is required.";
        if (!email.trim()) {
            newErrors.email = "Email is required.";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            newErrors.email = "Invalid email format.";
        }
        if (!phoneNumber.trim()) {
            newErrors.phoneNumber = "Phone Number is required.";
        } else if (!/^\d{10}$/.test(phoneNumber)) {
            newErrors.phoneNumber = "Phone Number must be 10 digits.";
        }
        if (!age.trim()) {
            newErrors.age = "Age is required.";
        } else if (isNaN(age) || age <= 0) {
            newErrors.age = "Age must be a positive number.";
        }
        if (!occupation.trim()) newErrors.occupation = "Occupation is required.";
        if (!expertise.trim()) newErrors.expertise = "Area of Expertise is required.";
        if (!password.trim()) {
            newErrors.password = "Password is required.";
        } else if (password.length < 8) {
            newErrors.password = "Password must be at least 8 characters.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateFields()) return;

        const response = await fetch("http://localhost:5000/api/expert/expert-register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name,
                email,
                phoneNumber,
                age,
                occupation,
                expertise,
                password,
            }),
        });

        if (response.ok) {
            navigate("/login");
        } else {
            const data = await response.json();
            setErrors({ form: data.errors });
        }
    };

    return (
        <div className="flex min-h-screen">
            <div className="w-3/5 bg-white flex flex-col items-center justify-center p-8">
                <h1 className="text-5xl font-bold text-[#4A4A4A] mb-10">FinanceEase</h1>
                <div className="md:w-1/2 flex mx-28 justify-center">
                    <img src="/logo2.png" alt="Financial illustration" className="max-w-full h-auto" />
                </div>
                <p className="text-2xl font-bold text-[#4A4A4A] mt-6">Join as an Expert!</p>
            </div>

            <div className="w-2/5 bg-[#B3A9A2] flex flex-col items-center justify-center p-4">
                <h2 className="text-4xl font-bold text-white mb-6">Expert Register</h2>

                <form className="w-full max-w-sm space-y-4" onSubmit={handleSubmit}>
                    {errors.form && (
                        <div className="bg-red-100 text-red-700 p-4 rounded">
                            <ul>
                                {errors.form.map((error, index) => (
                                    <li key={index}>{error.msg}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                    <div>
                        <label className="block text-lg font-medium text-gray-800">Full Name</label>
                        <input
                            type="text"
                            placeholder="John Doe"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-3 py-2 rounded bg-[#D9D9D9] placeholder-gray-500 focus:outline-none"
                        />
                        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                    </div>

                    <div className="relative">
                        <label className="block text-lg font-medium text-gray-800">Email</label>
                        <input
                            type="email"
                            placeholder="johndoe@gmail.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-3 py-2 rounded bg-[#D9D9D9] placeholder-gray-500 focus:outline-none"
                        />
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                    </div>

                    <div>
                        <label className="block text-lg font-medium text-gray-800">Phone Number</label>
                        <input
                            type="text"
                            placeholder="7845122356"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            className="w-full px-3 py-2 rounded bg-[#D9D9D9] placeholder-gray-500 focus:outline-none"
                        />
                        {errors.phoneNumber && <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>}
                    </div>

                    <div>
                        <label className="block text-lg font-medium text-gray-800">Age</label>
                        <input
                            type="number"
                            placeholder="25"
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                            className="w-full px-3 py-2 rounded bg-[#D9D9D9] placeholder-gray-500 focus:outline-none"
                        />
                        {errors.age && <p className="text-red-500 text-sm mt-1">{errors.age}</p>}
                    </div>

                    <div>
                        <label className="block text-lg font-medium text-gray-800">Occupation</label>
                        <input
                            type="text"
                            placeholder="Engineer, Doctor, etc."
                            value={occupation}
                            onChange={(e) => setOccupation(e.target.value)}
                            className="w-full px-3 py-2 rounded bg-[#D9D9D9] placeholder-gray-500 focus:outline-none"
                        />
                        {errors.occupation && <p className="text-red-500 text-sm mt-1">{errors.occupation}</p>}
                    </div>

                    <div>
                        <label className="block text-lg font-medium text-gray-800">Area of Expertise</label>
                        <input
                            type="text"
                            placeholder="Finance, Investment, etc."
                            value={expertise}
                            onChange={(e) => setExpertise(e.target.value)}
                            className="w-full px-3 py-2 rounded bg-[#D9D9D9] placeholder-gray-500 focus:outline-none"
                        />
                        {errors.expertise && <p className="text-red-500 text-sm mt-1">{errors.expertise}</p>}
                    </div>

                    <label className="block text-lg font-medium text-gray-800" style={{ marginBottom: '2px' }}>Password</label>
                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="********"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-3 py-2 rounded bg-[#D9D9D9] placeholder-gray-500 focus:outline-none"
                        />
                        <button
                            type="button"
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>
                    {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}

                    <button
                        type="submit"
                        className="w-full bg-white text-[#4A4A4A] mt-4 text-xl font-bold py-2 rounded-md hover:bg-[#c0c0c0] transition-colors"
                    >
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
}

export default ExpertRegister;