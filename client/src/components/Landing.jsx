import { ArrowRight } from "lucide-react"
import { Link } from "react-router-dom"

const Landing = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <header className="bg-white md:mx-25 p-4 flex justify-between items-center">
                <h1 className="text-4xl font-bold text-[#4A4A4A]">FinanceEase</h1>
                <div className="flex gap-7 px-10">
                    <Link to="/signup" className="bg-[#B3A9A2] text-white text-lg px-4 py-1 rounded hover:bg-[#a39890] transition-colors">
                        Sign up
                    </Link>
                    <Link to="/login" className="bg-[#B3A9A2] text-white text-lg px-4 py-1 rounded hover:bg-[#a39890] transition-colors">
                        Login
                    </Link>
                </div>
            </header>

            <section className="bg-[#B3A9A2] py-12 px-4 md:px-8 lg:px-16 flex flex-col md:flex-row items-center justify-between">
                <div className="md:w-1/2 mb-8 mx-28 md:mb-0">
                    <p className="text-2xl md:text-4xl font-bold text-white mb-8">
                        Unlock Your Financial <br />
                        Potential! <br />
                        Personalized Guidance, <br />
                        Smart Budgeting, <br />
                        and Expert Insights Await!
                    </p>
                    <Link
                        to="/signup"
                        className="bg-white text-[#B3A9A2] px-6 py-2 w-45 text-xl rounded flex items-center gap-2 font-bold hover:bg-gray-200 transition-colors"
                    >
                        Get Started
                        <ArrowRight size={16} />
                    </Link>
                </div>
                <div className="md:w-1/2 flex mx-28 justify-center">
                    <img src="/fin.svg" alt="Financial illustration" className="max-w-full h-auto" />
                </div>
            </section>

            <section className="bg-[#F5F5F5] py-12 px-4 flex-grow">
                <h3 className="text-2xl font-semibold text-center text-[#4A4A4A] mb-12">Why Choose FinanceEase?</h3>

                <div className="grid grid-cols-1 text-2xl md:grid-cols-4 gap-8 max-w-6xl mx-auto">

                    <div className="flex flex-col items-center text-center">
                        <div className="w-24 h-24 mb-4">
                            <img src="/goal.png" alt="Target icon" className="w-full h-full" />
                        </div>
                        <h4 className="text-lg font-bold text-[#4A4A4A] mb-2">Set Your Goals</h4>
                        <p className="text-[#4A4A4A]">Set your financial goals <br /> and track your progress.</p>
                    </div>

                    <div className="flex flex-col items-center text-center">
                        <div className="w-24 h-24 mb-4">
                            <img src="/wallet.png" alt="Wallet icon" className="w-full h-full" />
                        </div>
                        <h4 className="text-lg font-bold text-[#4A4A4A] mb-2">Track Your Finances</h4>
                        <p className="text-[#4A4A4A]">Save and analyze your <br /> savings and spendings.</p>
                    </div>


                    <div className="flex flex-col items-center text-center">
                        <div className="w-24 h-24 mb-4">
                            <img src="/investment.svg" alt="Investment icon" className="w-full h-full" />
                        </div>
                        <h4 className="text-lg font-bold text-[#4A4A4A] mb-2">Track Investments</h4>
                        <p className="text-[#4A4A4A]">Monitor your returns, <br /> and investments</p>
                    </div>

                    <div className="flex flex-col items-center text-center">
                        <div className="w-24 h-24 mb-4">
                            <img src="/idea.png" alt="Advice icon" className="w-full h-full" />
                        </div>
                        <h4 className="text-lg font-bold text-[#4A4A4A] mb-2">Get Expert Advice</h4>
                        <p className="text-[#4A4A4A]">Get financial advice <br /> from experts via Blogs.</p>
                    </div>

                </div>

                <div className="flex justify-center mt-12">
                    <Link
                        to="/signup"
                        className="bg-[#B3A9A2] text-white px-6 py-2 text-xl rounded flex items-center gap-2 hover:bg-[#a39890] transition-colors"
                    >
                        Explore
                        <ArrowRight size={16} />
                    </Link>
                </div>
            </section>

            <section className="bg-white py-12 px-4">
                <h3 className="text-2xl font-semibold text-center text-[#4A4A4A] mb-12">Frequently Asked Questions</h3>
                <div className="max-w-4xl mx-auto">
                    <div className="mb-6">
                        <h4 className="text-xl font-bold text-[#4A4A4A]">What is FinanceEase?</h4>
                        <p className="text-[#4A4A4A] text-lg">FinanceEase is a platform designed to help you manage your finances effectively.</p>
                    </div>
                    <div className="mb-6">
                        <h4 className="text-xl font-bold text-[#4A4A4A]">How do I get started?</h4>
                        <p className="text-[#4A4A4A] text-lg">Simply sign up for an account and start exploring our features.</p>
                    </div>
                    <div className="mb-6">
                        <h4 className="text-xl font-bold text-[#4A4A4A]">Is FinanceEase free to use?</h4>
                        <p className="text-[#4A4A4A] text-lg">Yes, FinanceEase offers a free plan with essential features.</p>
                    </div>
                </div>
            </section>

            <footer className="bg-[#4A4A4A] text-white py-6">
                <div className="max-w-6xl mx-auto flex justify-between">
                    <p>&copy; 2025 FinanceEase. All rights reserved.</p>
                    <div className="flex gap-4">
                        <Link to="/about" className="hover:underline">About Us</Link>
                        <Link to="/contact" className="hover:underline">Contact</Link>
                        {/* <Link to="/privacy" className="hover:underline">Privacy Policy</Link> */}
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Landing;