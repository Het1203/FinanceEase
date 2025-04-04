import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

function Signup() {
    const [showPassword, setShowPassword] = useState(false);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [profession, setProfession] = useState("");
    const [password, setPassword] = useState("");

    const [usernameError, setUsernameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [professionError, setProfessionError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const navigate = useNavigate();

    const validatePassword = (password) => {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!passwordRegex.test(password)) {
            setPasswordError(
                "Password must be at least 8 characters long, include uppercase, lowercase, a number, and a special character."
            );
        } else {
            setPasswordError("");
        }
    };

    const validateFields = () => {
        let isValid = true;

        if (!username.trim()) {
            setUsernameError("Username is required.");
            isValid = false;
        } else {
            setUsernameError("");
        }

        if (!email.trim()) {
            setEmailError("Email is required.");
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            setEmailError("Invalid email format.");
            isValid = false;
        } else {
            setEmailError("");
        }

        if (!profession.trim()) {
            setProfessionError("Profession is required.");
            isValid = false;
        } else {
            setProfessionError("");
        }

        if (passwordError) {
            isValid = false;
        }

        return isValid;
    };

    const handlePasswordChange = (e) => {
        const newPassword = e.target.value;
        setPassword(newPassword);
        validatePassword(newPassword);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateFields()) {
            return;
        }

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
            navigate("/login");
        } else {
            console.error("Signup failed");
        }
    };

    return (
        <div className="flex min-h-screen">
            {/* Left side - Logo */}
            <div className="w-3/5 bg-white flex flex-col items-center justify-center p-8">
                <h1 className="text-5xl font-bold text-[#4A4A4A] mb-10">FinanceEase</h1>
                <div className="md:w-1/2 flex mx-28 justify-center">
                    <img src="/logo2.png" alt="Financial illustration" className="max-w-full h-auto" />
                </div>
                <p className="text-2xl font-bold text-[#4A4A4A] mt-6">Unlock Your Financial Potential!</p>
            </div>

            {/* Right side - Signup form */}
            <div className="w-2/5 bg-[#B3A9A2] flex flex-col items-center justify-center p-8">
                <h2 className="text-6xl font-bold text-white mb-10">Signup</h2>

                <form className="w-full max-w-sm space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <input
                            type="text"
                            placeholder="Full Name"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full px-3 py-2 rounded bg-[#D9D9D9] placeholder-gray-500 focus:outline-none"
                        />
                        {usernameError && <p className="text-red-500 text-sm mt-1">{usernameError}</p>}
                    </div>

                    <div className="relative">
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-3 py-2 rounded bg-[#D9D9D9] placeholder-gray-500 focus:outline-none"
                        />
                        {emailError && <p className="text-red-500 text-sm mt-1">{emailError}</p>}
                    </div>

                    <div>
                        <input
                            type="text"
                            placeholder="Profession"
                            value={profession}
                            onChange={(e) => setProfession(e.target.value)}
                            className="w-full px-3 py-2 rounded bg-[#D9D9D9] placeholder-gray-500 focus:outline-none"
                        />
                        {professionError && <p className="text-red-500 text-sm mt-1">{professionError}</p>}
                    </div>

                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            value={password}
                            onChange={handlePasswordChange}
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
                        className="w-full bg-[#D9D9D9] text-[#4A4A4A] text-xl font-bold py-2 rounded hover:bg-[#c0c0c0] transition-colors"
                    >
                        Signup
                    </button>
                </form>
                <div className="text-center mt-4">
                    <p className="text-[#4A4A4A]">
                        Already have an account?{" "}
                        <Link to="/login" className="text-blue-900 font-bold hover:underline">
                            Login
                        </Link>
                    </p>
                    <p className="text-[#4A4A4A] text-xl mt-10">
                        Want to join as an expert?{" "}
                        <Link to="/expert-register" className="text-blue-900 font-bold hover:underline">
                            Register as Expert
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Signup;