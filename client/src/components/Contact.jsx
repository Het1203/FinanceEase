import { Link } from "react-router-dom";

function Contact() {
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

            {/* Contact Section */}
            <section className="bg-[#F5F5F5] py-16 px-6 md:px-16 flex-grow flex flex-col items-center text-center">
                <h1 className="text-5xl font-bold text-[#4A4A4A] mb-6">Contact Us</h1>
                <p className="text-lg text-gray-700 mb-8 max-w-2xl">
                    Have questions or need assistance? Feel free to reach out to us! We’re here to help you with all your financial needs.
                </p>
                <ul className="space-y-4 text-lg text-gray-700">
                    <li>
                        <strong>Email:</strong>{" "}
                        <a
                            href="mailto:financeease@gmail.com"
                            className="text-blue-500 hover:underline"
                        >
                            financeease@gmail.com
                        </a>
                    </li>
                </ul>
            </section>

            {/* FAQs Section */}
            <section className="flex-grow flex flex-col items-center md:ml-40 bg-white py-16 px-6 md:px-16">
                <div className="space-y-6">
                    <h2 className="text-4xl font-bold text-[#4A4A4A] mb-6">Frequently Asked Questions</h2>
                    <div>
                        <h3 className="text-lg font-bold text-[#4A4A4A]">How can I contact customer support?</h3>
                        <p className="text-gray-700">
                            You can reach us via email at <a href="mailto:financeease@gmail.com" className="text-blue-500 hover:underline">financeease@gmail.com</a>.
                        </p>
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-[#4A4A4A]">What services does FinanceEase provide?</h3>
                        <p className="text-gray-700">
                            We offer tools for budgeting, investments, goal tracking, and financial planning to help you manage your finances effectively.
                        </p>
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-[#4A4A4A]">Is FinanceEase free to use?</h3>
                        <p className="text-gray-700">
                            Yes, FinanceEase offers a free plan with essential features.
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

export default Contact;