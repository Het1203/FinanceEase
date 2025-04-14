import { Link } from "react-router-dom";

function About() {
    return (
        <div className="flex flex-col min-h-screen">
            {/* Header */}
            <header className="bg-white md:mx-25 p-4 flex justify-between items-center">
                <Link to="/">
                    <h1 className="text-4xl font-bold text-[#4A4A4A]">FinanceEase</h1>
                </Link>
                <div className="flex gap-7 px-10">
                    <Link to="/signup" className="bg-[#B3A9A2] text-white text-lg px-4 py-1 rounded hover:bg-[#a39890] transition-colors">
                        Sign up
                    </Link>
                    <Link to="/login" className="bg-[#B3A9A2] text-white text-lg px-4 py-1 rounded hover:bg-[#a39890] transition-colors">
                        Login
                    </Link>
                </div>
            </header>

            {/* About Section */}
            <section className="bg-[#F5F5F5] py-16 px-6 md:px-16 flex flex-col items-center text-center">
                <h1 className="text-5xl font-bold text-[#4A4A4A] mb-6">About Us</h1>
                <p className="text-lg text-gray-700 max-w-3xl mb-8">
                    Welcome to FinanceEase! We are dedicated to helping you manage your finances effectively.
                    Our platform provides tools for budgeting, investments, goal tracking, and more. Join us on a journey to financial freedom!
                </p>
            </section>

            {/* Mission Section */}
            <section className="bg-white py-16 px-6 md:px-16 flex flex-col items-center text-center">
                <h2 className="text-4xl font-bold text-[#4A4A4A] mb-6">Our Mission</h2>
                <p className="text-lg text-gray-700 max-w-3xl">
                    At FinanceEase, our mission is to empower individuals to take control of their financial future.
                    We aim to simplify financial management and provide the tools you need to make informed decisions.
                </p>
            </section>

            {/* Features Section */}
            <section className="bg-[#B3A9A2] py-16 px-6 md:px-16 text-white">
                <h2 className="text-4xl font-bold text-center mb-6">What We Offer</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="flex flex-col items-center text-center">
                        <div className="w-24 h-24 mb-4">
                            <img src="/wallet.png" alt="Wallet icon" className="w-full h-full" />
                        </div>
                        <h3 className="text-2xl font-bold mb-4">Budgeting Tools</h3>
                        <p className="text-lg">
                            Track your expenses, set budgets, and <br />
                            achieve your financial goals with ease.
                        </p>
                    </div>
                    <div className="flex flex-col items-center text-center">
                        <div className="w-24 h-24 mb-4">
                            <img src="/investment.svg" alt="Investment icon" className="w-full h-full" />
                        </div>
                        <h3 className="text-2xl font-bold mb-4">Track Investments</h3>
                        <p className="text-lg">
                            Monitor your returns, and track <br /> your portfolio performance.
                        </p>
                    </div>
                    <div className="flex flex-col items-center text-center">
                        <div className="w-24 h-24 mb-4">
                            <img src="/goal.png" alt="Target icon" className="w-full h-full" />
                        </div>
                        <h3 className="text-2xl font-bold mb-4">Goal Tracking</h3>
                        <p className="text-lg">
                            Set financial goals and monitor <br />
                            your progress to stay on track.
                        </p>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-[#4A4A4A] text-white py-4 text-center">
                <p className="text-lg">
                    {new Date().getFullYear()} FinanceEase.
                </p>
            </footer>
        </div>
    );
}

export default About;