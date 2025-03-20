import { ArrowRight } from "lucide-react"
import { Link } from "react-router-dom"

const Landing = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <header className="bg-white md:mx-25 p-4 flex justify-between items-center">
                <h1 className="text-4xl font-bold text-[#4A4A4A]">FinanceEase</h1>
                {/* <div className="flex gap-7 px-10">
                    <button className="bg-[#B3A9A2] text-white text-1xl px-6 py-1 rounded">Sign-up</button>
                    <button className="bg-[#B3A9A2] text-white text-1xl px-6 py-1 rounded">Log in</button>
                </div> */}
                <div className="flex gap-7 px-10">
                    <Link to="/signup" className="bg-[#B3A9A2] text-white px-4 py-1 rounded hover:bg-[#a39890] transition-colors">
                        Sign up
                    </Link>
                    <Link to="/login" className="bg-[#B3A9A2] text-white px-4 py-1 rounded hover:bg-[#a39890] transition-colors">
                        Login
                    </Link>
                </div>
            </header>

            <section className="bg-[#B3A9A2] py-12 px-4 md:px-8 lg:px-16 flex flex-col md:flex-row items-center justify-between">
                <div className="md:w-1/2 mb-8 mx-28 md:mb-0">
                    <p className="text-2xl md:text-4xl font-bold text-white mb-4">
                        Unlock Your Financial <br />
                        Potential! <br />
                        Personalized Guidance, <br />
                        Smart Budgeting, <br />
                        and Expert Insights Await!</p>
                </div>
                <div className="md:w-1/2 flex mx-28 justify-center">
                    <img src="/fin.svg" alt="Financial illustration" className="max-w-full h-auto" />
                </div>
            </section>

            <section className="bg-[#F5F5F5] py-12 px-4 flex-grow">
                <h3 className="text-2xl font-semibold text-center text-[#4A4A4A] mb-12">Today's metrics</h3>

                <div className="grid grid-cols-1 text-2xl md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    <div className="flex flex-col items-center text-center">
                        <div className="w-24 h-24 mb-4">
                            <img src="/wallet.png" alt="Wallet icon" className="w-full h-full" />
                        </div>
                        <p className="text-[#4A4A4A]">Save and analyse <br />
                            your savings and <br />
                            spendings</p>
                    </div>

                    <div className="flex flex-col items-center text-center">
                        <div className="w-24 h-24 mb-4">
                            <img src="/goal.png" alt="Target icon" className="w-full h-full" />
                        </div>
                        <p className="text-[#4A4A4A]">Get your dream <br />
                            target</p>
                    </div>

                    <div className="flex flex-col items-center text-center">
                        <div className="w-24 h-24 mb-4">
                            <img src="/idea.png" alt="Advice icon" className="w-full h-full" />
                        </div>
                        <p className="text-[#4A4A4A]">Get financial advice <br />
                            from experts</p>
                    </div>
                </div>

                <div className="flex justify-center mt-12">
                    <Link
                        to="/signup"
                        className="bg-[#B3A9A2] text-white px-6 py-2 rounded flex items-center gap-2 hover:bg-[#a39890] transition-colors"
                    >
                        Explore
                        <ArrowRight size={16} />
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default Landing;