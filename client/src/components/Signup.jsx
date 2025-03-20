import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

function Signup() {
    const [showPassword, setShowPassword] = useState(false);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [profession, setProfession] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch("http://localhost:5000/api/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username,
                email,
                profession,
                password,
            }),
        });

        if (response.ok) {
            // Handle successful signup (e.g., navigate to login page)
            navigate("/login");
        } else {
            // Handle error (e.g., display error message)
            console.error("Signup failed");
        }
    };

    return (
        <div className="flex min-h-screen">
            {/* Left side - Logo */}
            <div className="w-3/5 bg-white flex flex-col items-center justify-center p-8">
                <h1 className="text-4xl font-bold text-[#4A4A4A] mb-6">FinanceEase</h1>
                <div className="md:w-1/2 flex mx-28 justify-center">
                    <img src="/logo2.png" alt="Financial illustration" className="max-w-full h-auto" />
                </div>
                <p className="text-2xl text-[#4A4A4A] mt-6">Unlock Your Financial Potential!</p>
            </div>

            {/* Right side - Signup form */}
            <div className="w-2/5 bg-[#B3A9A2] flex flex-col items-center justify-center p-8">
                <h2 className="text-6xl font-bold text-white mb-10">Signup</h2>

                <form className="w-full max-w-sm space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full px-3 py-2 rounded bg-[#D9D9D9] placeholder-gray-500 focus:outline-none"
                        />
                    </div>

                    <div className="relative">
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-3 py-2 rounded bg-[#D9D9D9] placeholder-gray-500 focus:outline-none"
                        />
                    </div>

                    <div>
                        <input
                            type="text"
                            placeholder="Profession"
                            value={profession}
                            onChange={(e) => setProfession(e.target.value)}
                            className="w-full px-3 py-2 rounded bg-[#D9D9D9] placeholder-gray-500 focus:outline-none"
                        />
                    </div>

                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
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

                    <div className="w-1/2 ml-23 flex items-center justify-center bg-[#D9D9D9] p-2">
                        <div className="flex items-center gap-2">
                            <input type="checkbox" id="recaptcha" className="h-4 w-4" />
                            <label htmlFor="recaptcha" className="text-xs text-gray-600">
                                I'm not a robot
                            </label>
                        </div>
                        <div className="ml-4">
                            <img src="/reCaptcha.png" alt="reCAPTCHA" className="h-10 w-10" />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-[#D9D9D9] font-medium py-2 rounded hover:bg-[#c0c0c0] transition-colors"
                    >
                        Signup
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Signup;