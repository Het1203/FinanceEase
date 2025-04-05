import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const navigate = useNavigate();

    const validateFields = () => {
        let isValid = true;

        if (!email.trim()) {
            setEmailError("Email is required.");
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            setEmailError("Invalid email format.");
            isValid = false;
        } else {
            setEmailError("");
        }

        if (!password.trim()) {
            setPasswordError("Password is required.");
            isValid = false;
        } else {
            setPasswordError("");
        }

        return isValid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateFields()) {
            return;
        }

        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
            credentials: 'include',
        });

        const data = await response.json();
        if (response.ok) {
            const token = data.token;
            if (token) {
                const tokenPayload = JSON.parse(atob(token.split('.')[1]));
                const userType = tokenPayload.type;

                if (userType === 'user') {
                    navigate('/dashboard/profile');
                } else if (userType === 'expert') {
                    navigate('/expert/profile');
                }
            } else {
                console.error('Token is missing in the response');
            }
        } else {
            setEmailError(data.message || "Invalid email or password.");
        }
    };

    return (
        <div className="flex min-h-screen">
            {/* Left side - Logo */}
            <div className="w-2/3 bg-white flex flex-col items-center justify-center p-8">
                <h1 className="text-5xl font-bold text-[#4A4A4A] mb-10">FinanceEase</h1>
                <div className="md:w-1/2 flex mx-28 justify-center">
                    <img src="/logo2.png" alt="Financial illustration" className="max-w-full h-auto" />
                </div>
                <p className="text-2xl font-bold text-[#4A4A4A] mt-6">Unlock Your Financial Potential!</p>
            </div>

            {/* Right side - Login form */}
            <div className="w-1/3 bg-[#B3A9A2] flex flex-col items-center justify-center p-8">
                <h2 className="text-3xl font-bold text-white mb-8">Login</h2>

                <form className="w-full max-w-sm space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-3 py-2 rounded bg-[#D9D9D9] placeholder-gray-500 focus:outline-none"
                        />
                        {emailError && <p className="text-red-500 text-sm mt-1">{emailError}</p>}
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
                        {passwordError && <p className="text-red-500 text-sm mt-1">{passwordError}</p>}
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-[#D9D9D9] mt-5 text-[#4A4A4A] text-xl font-bold py-2 rounded hover:bg-[#c0c0c0] transition-colors"
                    >
                        Login
                    </button>

                    <div className="text-center">
                        <Link to="/forgot-password" className="text-sm text-[#1A3A5A] hover:underline">
                            Forgot Password
                        </Link>
                    </div>
                </form>
                <div className="text-center mt-4">
                    <p className="text-[#4A4A4A]">
                        Don't have an account?{" "}
                        <Link to="/signup" className="text-blue-900 font-bold hover:underline">
                            Signup
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Login;