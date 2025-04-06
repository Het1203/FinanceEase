import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Home() {
    const [isIncomeModalOpen, setIsIncomeModalOpen] = useState(false);
    const [newIncomeSource, setNewIncomeSource] = useState({
        name: '',
        amount: ''
    });
    const [incomeSources, setIncomeSources] = useState([]);
    const [liabilities, setLiabilities] = useState([]);
    const [assets, setAssets] = useState([]);
    const [blogs, setBlogs] = useState([]);
    const [selectedBlog, setSelectedBlog] = useState(null);
    const [user, setUser] = useState({
        name: '',
        email: '',
        occupation: '',
        image: '/person.png'
    });

    useEffect(() => {
        const fetchIncomeSources = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/income/getincome', {
                    method: 'GET',
                    credentials: 'include',
                });
                if (response.ok) {
                    const data = await response.json();
                    data.sort((a, b) => b.amount - a.amount);
                    setIncomeSources(data);
                } else {
                    console.error('Failed to fetch income sources');
                }
            } catch (error) {
                console.error('Error fetching income sources:', error);
            }
        };

        const fetchLiabilities = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/liabilities', {
                    method: 'GET',
                    credentials: 'include',
                });
                if (response.ok) {
                    const data = await response.json();
                    setLiabilities(data);
                } else {
                    console.error('Failed to fetch liabilities');
                }
            } catch (error) {
                console.error('Error fetching liabilities:', error);
            }
        };

        const fetchAssets = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/assets', {
                    method: 'GET',
                    credentials: 'include',
                });
                if (response.ok) {
                    const data = await response.json();
                    setAssets(data);
                } else {
                    console.error('Failed to fetch assets');
                }
            } catch (error) {
                console.error('Error fetching assets:', error);
            }
        };

        const fetchUserProfile = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/auth/me', {
                    method: 'GET',
                    credentials: 'include',
                });
                if (response.ok) {
                    const data = await response.json();
                    setUser({
                        name: data.username,
                        email: data.email,
                        occupation: data.profession,
                        image: data.image || '/user-avatar.jpg'
                    });
                } else {
                    console.error('Failed to fetch user profile');
                }
            } catch (error) {
                console.error('Error fetching user profile:', error);
            }
        };

        const fetchBlogs = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/blogs/allblogs', {
                    method: 'GET',
                    credentials: 'include',
                });
                if (response.ok) {
                    const data = await response.json();
                    setBlogs(data.slice(0, 5));
                } else {
                    console.error('Failed to fetch blogs');
                }
            } catch (error) {
                console.error('Error fetching blogs:', error);
            }
        };

        fetchIncomeSources();
        fetchLiabilities();
        fetchAssets();
        fetchUserProfile();
        fetchBlogs();
    }, []);

    const handleAddIncomeSourceClick = () => {
        setIsIncomeModalOpen(true);
    };

    const [nameError, setNameError] = useState('');
    const [amountError, setAmountError] = useState('');

    const validateIncomeSource = () => {
        let isValid = true;

        if (!newIncomeSource.name.trim()) {
            setNameError('Income source name is required');
            isValid = false;
        } else {
            setNameError('');
        }

        if (!newIncomeSource.amount) {
            setAmountError('Income source amount is required');
            isValid = false;
        } else if (isNaN(Number(newIncomeSource.amount)) || Number(newIncomeSource.amount) <= 0) {
            setAmountError('Income source amount must be a positive number');
            isValid = false;
        } else {
            setAmountError('');
        }

        return isValid;
    };

    const handleIncomeSaveClick = async () => {
        if (!validateIncomeSource()) {
            return;
        }
        const incomeSourceExists = incomeSources.some(source => source.name.toLowerCase() === newIncomeSource.name.toLowerCase());
        if (incomeSourceExists) {
            setNameError('Income source already exists');
            return;
        }
        setNameError('');
        try {
            const response = await fetch('http://localhost:5000/api/income/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(newIncomeSource),
            });

            if (response.ok) {
                const addedIncomeSource = await response.json();
                setIncomeSources([...incomeSources, addedIncomeSource].sort((a, b) => b.amount - a.amount));
                setNewIncomeSource({ name: '', amount: '' });
                setIsIncomeModalOpen(false);
            } else {
                const errorData = await response.json();
                console.error('Failed to add income source:', errorData);
            }
        } catch (error) {
            console.error('Error adding income source:', error);
        }
    };

    const handleDeleteIncomeSource = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/api/income/deleteincome/${id}`, {
                method: 'DELETE',
                credentials: 'include',
            });

            if (response.ok) {
                setIncomeSources(incomeSources.filter(source => source._id !== id));
            } else {
                console.error('Failed to delete income source');
            }
        } catch (error) {
            console.error('Error deleting income source:', error);
        }
    };

    const handleBlogClick = (blog) => {
        setSelectedBlog(blog);
    };

    return (
        <div className="space-y-6 ml-8 mt-4">
            <h1 className="text-4xl font-bold text-[#4A4A4A]">Overview</h1>
            <p className="text-xl text-gray-700 mb-5">Hello {user.name}, welcome back!</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Income Sources */}
                <div className="bg-[#697184] p-6 rounded-md shadow-sm">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-2xl font-bold text-[#102647]">Heads of Income</h2>
                        <button className="bg-[#D8CFD0] text-[#1D3557] px-4 py-1 rounded-full" onClick={handleAddIncomeSourceClick}>
                            Add More
                        </button>
                    </div>
                    <div className="space-y-2">
                        {incomeSources.map((source) => (
                            <div key={source._id} className="flex justify-between items-center p-2 bg-[#D8CFD0] rounded-md">
                                <span className="text-[#4A4A4A] text-xl font-bold flex-grow">{source.name}</span>
                                <span className="text-[#4A4A4A] text-xl font-bold w-32 text-right">Rs. {source.amount}</span>
                                <button onClick={() => handleDeleteIncomeSource(source._id)} className="ml-5 text-red-500">
                                    <img src="/Trash.svg" alt="Delete" className="w-7 h-10" />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Profile Card */}
                <Link to="/dashboard/profile">
                    <div className="bg-[#D8CFD0] p-6 rounded-md shadow-sm flex flex-col items-center">
                        <div className="w-20 h-20 rounded-full bg-white mb-4 overflow-hidden">
                            <img src={user.image} alt={user.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="space-y-1 text-center">
                            <p className="text-xl text-[#4A4A4A]">
                                <span className="font-bold">Name:</span> {user.name}
                            </p>
                            <p className="text-xl text-[#4A4A4A]">
                                <span className="font-bold">Email:</span> {user.email}
                            </p>
                            <p className="text-xl text-[#4A4A4A]">
                                <span className="font-bold">Occupation:</span> {user.occupation}
                            </p>
                        </div>
                    </div>
                </Link>
            </div>

            <Link to="/dashboard/profile">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    {/* Liabilities */}
                    <div className="bg-[#D8CFD0] p-6 rounded-md shadow-sm">
                        <h2 className="text-2xl font-bold text-[#102647] mb-4">Your Liabilities</h2>
                        <div className="space-y-4">
                            {liabilities.map((liability, index) => (
                                <div key={index} className="border-b pb-2">
                                    <div className="flex justify-between">
                                        <span className="text-[#4A4A4A] text-xl font-bold">{liability.name}</span>
                                        <span className="text-[#4A4A4A] text-xl font-bold">Due Date</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-[#4A4A4A] text-xl font-bold">worth Rs. {liability.amount}</span>
                                        <span className="text-[#4A4A4A] text-xl font-bold">{new Date(liability.dueDate).toISOString().split('T')[0]}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Assets */}
                    <div className="bg-[#697184] p-6 rounded-md shadow-sm">
                        <h2 className="text-2xl font-bold text-[#102647] mb-4">Your Assets</h2>
                        <div className="space-y-3">
                            {assets.map((asset, index) => (
                                <div key={index} className="flex justify-between items-center bg-[#D8CFD0] p-3 rounded-md">
                                    <span className="text-[#4A4A4A] text-xl font-bold">{asset.name}</span>
                                    <span className="text-[#4A4A4A] text-xl font-bold">worth Rs. {asset.amount}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </Link>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>

                </div>

                {/* Blogs */}
                <div className="bg-[#D8CFD0] p-6 rounded-md shadow-sm">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-2xl font-bold text-[#102647]">Blogs</h2>
                        <Link to="/dashboard/blogs" className="bg-[#697184] text-[#D8CFD0] px-4 py-1 rounded-full">
                            View all
                        </Link>
                    </div>
                    <div className="space-y-4">
                        {blogs.map((blog, index) => (
                            <div key={index} className="flex items-center space-x-3 cursor-pointer border-b border-[#697184] pb-2 last:border-0" onClick={() => handleBlogClick(blog)}>
                                <div className="w-8 h-8 rounded-full bg-gray-300 overflow-hidden">
                                    <img src="/person.png" alt="Author" className="w-full h-full object-cover" />
                                </div>
                                <div>
                                    <h3 className="text-[#102647] text-xl font-bold">{blog.title}</h3>
                                    <p className="text-xl font-bold text-[#4A4A4A]">{blog.author.name} • {blog.date}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Blog Details Modal */}
            {selectedBlog && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-[#697184] p-6 rounded-md shadow-lg text-center w-full max-w-6xl h-[80vh] overflow-y-auto">
                        <h2 className="text-3xl flex justify-center text-[#D8CFD0] font-bold mb-4">{selectedBlog.title}</h2>
                        <div className="space-y-4">
                            <p className="text-xl text-dark font-medium mb-10">
                                {selectedBlog.author.name} • {selectedBlog.date}
                            </p>
                            <p className="text-xl text-[#D8CFD0]">{selectedBlog.content}</p>
                            <div className="flex justify-center space-x-2 mt-20">
                                <button
                                    className="bg-gray-300 text-gray-700 text-xl font-bold px-4 py-2 rounded-md"
                                    onClick={() => setSelectedBlog(null)}
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Add Income Source Modal */}
            {isIncomeModalOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-[#697184] p-6 rounded-md shadow-lg text-center max-w-3xl w-full">
                        <h2 className="text-xl flex justify-center text-[#D8CFD0] font-bold mb-4">Add Income Source</h2>
                        <div className="space-y-4">
                            <div>
                                <input
                                    type="text"
                                    placeholder="Name of Income Source"
                                    value={newIncomeSource.name}
                                    onChange={(e) => setNewIncomeSource({ ...newIncomeSource, name: e.target.value })}
                                    className="mt-1 block w-full bg-[#D8CFD0] rounded-md shadow-sm p-2 focus:outline-none focus:border-none"
                                />
                                {nameError && <p className="text-red-500 text-sm mt-1">{nameError}</p>}
                            </div>
                            <div>
                                <input
                                    type="number"
                                    placeholder="Amount (Yearly)"
                                    value={newIncomeSource.amount}
                                    onChange={(e) => setNewIncomeSource({ ...newIncomeSource, amount: e.target.value })}
                                    className="mt-1 block w-full bg-[#D8CFD0] rounded-md shadow-sm p-2 focus:outline-none focus:border-none"
                                />
                                {amountError && <p className="text-red-500 text-sm mt-1">{amountError}</p>}
                            </div>
                            <div className="flex justify-center space-x-2">
                                <button
                                    className="bg-gray-300 text-gray-700 font-bold px-4 py-2 rounded-md"
                                    onClick={() => setIsIncomeModalOpen(false)}
                                >
                                    Cancel
                                </button>
                                <button
                                    className="bg-[#D8CFD0] text-[#817B7B] font-bold px-4 py-2 rounded-md"
                                    onClick={handleIncomeSaveClick}
                                >
                                    Save
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Home;