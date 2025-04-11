import { useState, useEffect } from 'react';

function Profile() {
    const [user, setUser] = useState({
        username: '',
        email: '',
        profession: '',
        phone: '',
        age: '',
        maritalStatus: ''
    });

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editUser, setEditUser] = useState(null);

    const [isLiabilitiesModalOpen, setIsLiabilitiesModalOpen] = useState(false);
    const [newLiability, setNewLiability] = useState({
        name: '',
        amount: '',
        description: '',
        dueDate: ''
    });
    const [liabilities, setLiabilities] = useState([]);

    const [isAssetsModalOpen, setIsAssetsModalOpen] = useState(false);
    const [newAsset, setNewAsset] = useState({
        name: '',
        amount: '',
        description: ''
    });
    const [assets, setAssets] = useState([]);

    const fetchUserProfile = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/auth/me', {
                method: 'GET',
                credentials: 'include',
            });
            if (response.ok) {
                const data = await response.json();
                setUser({
                    username: data.username,
                    email: data.email,
                    profession: data.profession,
                    phone: data.phone || '',
                    age: data.age || '',
                    maritalStatus: data.maritalStatus || ''
                });
            } else {
                console.error('Failed to fetch user profile');
            }
        } catch (error) {
            console.error('Error fetching user profile:', error);
        }
    };

    useEffect(() => {
        fetchUserProfile();

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

        fetchLiabilities();
        fetchAssets();
    }, []);

    const handleEditClick = () => {
        setEditUser({ ...user });
        setIsModalOpen(true);
    };

    const [editUserErrors, setEditUserErrors] = useState({
        username: "",
        email: "",
        profession: "",
        phone: "",
        age: "",
        maritalStatus: ""
    });

    const validateEditUserFields = () => {
        let isValid = true;
        const errors = {};

        if (!String(editUser.username).trim()) {
            errors.username = "Name is required.";
            isValid = false;
        }

        if (!String(editUser.email).trim()) {
            errors.email = "Email is required.";
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(editUser.email)) {
            errors.email = "Invalid email format.";
            isValid = false;
        }

        if (!String(editUser.profession).trim()) {
            errors.profession = "Profession is required.";
            isValid = false;
        }

        if (!String(editUser.phone).trim()) {
            errors.phone = "Phone number is required.";
            isValid = false;
        } else if (!/^\d{10}$/.test(editUser.phone)) {
            errors.phone = "Phone number must be 10 digits.";
            isValid = false;
        }

        if (!String(editUser.age).trim()) {
            errors.age = "Age is required.";
            isValid = false;
        } else if (isNaN(editUser.age) || Number(editUser.age) <= 0) {
            errors.age = "Age must be a positive number.";
            isValid = false;
        }

        if (!String(editUser.maritalStatus).trim()) {
            errors.maritalStatus = "Marital status is required.";
            isValid = false;
        } else if (!["Single", "Married", "Divorced"].includes(editUser.maritalStatus)) {
            errors.maritalStatus = "Marital status must be 'Single', 'Married', or 'Divorced'.";
            isValid = false;
        }

        setEditUserErrors(errors);
        return isValid;
    };

    const handleSaveClick = async () => {
        if (!validateEditUserFields()) {
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/api/auth/profile/update', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(editUser),
            });

            if (response.ok) {
                const updatedUser = await response.json();
                setUser(updatedUser);
                setIsModalOpen(false);
                setEditUser(null);
            } else {
                console.error('Failed to update user profile');
            }
        } catch (error) {
            console.error('Error updating user profile:', error);
        }
    };

    const handleAddLiabilityClick = () => {
        setIsLiabilitiesModalOpen(true);
    };

    const [newLiabilityErrors, setNewLiabilityErrors] = useState({});

    const validateLiabilityFields = () => {
        const errors = {};
        let isValid = true;

        if (!newLiability.name.trim()) {
            errors.name = "Liability name is required.";
            isValid = false;
        }

        if (!newLiability.amount || isNaN(newLiability.amount) || Number(newLiability.amount) <= 0) {
            errors.amount = "Amount must be a positive number.";
            isValid = false;
        }

        if (!newLiability.description.trim()) {
            errors.description = "Description is required.";
            isValid = false;
        }

        if (!newLiability.dueDate) {
            errors.dueDate = "Due date is required.";
            isValid = false;
        }

        setNewLiabilityErrors(errors);
        return isValid;
    };

    const handleLiabilitySaveClick = async () => {
        if (!validateLiabilityFields()) {
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/api/liabilities/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(newLiability),
            });

            if (response.ok) {
                const addedLiability = await response.json();
                setLiabilities([...liabilities, addedLiability]);
                setNewLiability({ name: '', amount: '', description: '', dueDate: '' });
                setIsLiabilitiesModalOpen(false);
            } else {
                const errorData = await response.json();
                console.error('Failed to add liability:', errorData);
            }
        } catch (error) {
            console.error('Error adding liability:', error);
        }
    };

    const handleAddAssetClick = () => {
        setIsAssetsModalOpen(true);
    };

    const [newAssetErrors, setNewAssetErrors] = useState({});

    const validateAssetFields = () => {
        const errors = {};
        let isValid = true;

        if (!newAsset.name.trim()) {
            errors.name = "Asset name is required.";
            isValid = false;
        }

        if (!newAsset.amount || isNaN(newAsset.amount) || Number(newAsset.amount) <= 0) {
            errors.amount = "Amount must be a positive number.";
            isValid = false;
        }

        if (!newAsset.description.trim()) {
            errors.description = "Description is required.";
            isValid = false;
        }

        setNewAssetErrors(errors);
        return isValid;
    };

    const handleAssetSaveClick = async () => {
        if (!validateAssetFields()) {
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/api/assets/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(newAsset),
            });

            if (response.ok) {
                const addedAsset = await response.json();
                setAssets([...assets, addedAsset]);
                setNewAsset({ name: '', amount: '', description: '' });
                setIsAssetsModalOpen(false);
            } else {
                console.error('Failed to add asset');
            }
        } catch (error) {
            console.error('Error adding asset:', error);
        }
    };

    const handleDeleteLiability = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/api/liabilities/delete/${id}`, {
                method: 'DELETE',
                credentials: 'include',
            });

            if (response.ok) {
                setLiabilities(liabilities.filter((liability) => liability._id !== id));
            } else {
                console.error('Failed to delete liability');
            }
        } catch (error) {
            console.error('Error deleting liability:', error);
        }
    };

    const handleDeleteAsset = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/api/assets/delete/${id}`, {
                method: 'DELETE',
                credentials: 'include',
            });

            if (response.ok) {
                // Remove the deleted asset from the state
                setAssets(assets.filter((asset) => asset._id !== id));
            } else {
                console.error('Failed to delete asset');
            }
        } catch (error) {
            console.error('Error deleting asset:', error);
        }
    };

    return (
        <div className="p-4">
            <h1 className="text-4xl font-bold text-[#4A4A4A] ml-5 mb-2">Profile</h1>
            <p className="text-xl text-gray-700 ml-5 mb-3">Manage your profile and financial information.</p>
            <div className="flex">
                {/* Left half */}
                <div className="w-3/5 p-5">
                    <div className="flex flex-col h-full space-y-2">
                        <div className="flex-1 p-4 rounded bg-[#697184]">
                            <div className="flex">
                                <div className="w-1/4 ml-15 mt-10">
                                    <img src="/person.png" alt="User" className="w-24 h-24 rounded-full object-cover" />
                                </div>
                                <div className="w-3/4 flex flex-col ml-15">
                                    <div className="flex justify-between items-center">
                                        <h2 className="text-2xl font-bold text-[#1D3557]">Profile Information</h2>
                                        <button className="bg-[#BABABA] text-[#1D3557] px-4 py-1 rounded-full hover:bg-gray-200" onClick={handleEditClick}>
                                            Edit
                                        </button>
                                    </div>
                                    <p className="text-dark">Name: {user.username}</p>
                                    <p className="text-dark">Email: {user.email}</p>
                                    <p className="text-dark">Occupation: {user.profession}</p>
                                    <p className="text-dark">Phone: {user.phone}</p>
                                    <p className="text-dark">Age: {user.age}</p>
                                    <p className="text-dark">Marital Status: {user.maritalStatus}</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex-1 bg-[#D8CFD0] p-4 rounded mt-3">
                            <div className="flex justify-between items-center">
                                <h2 className='text-2xl font-bold text-[#102647] ml-2'>Liabilities</h2>
                                <button className="bg-[#BABABA] text-[#1D3557] px-4 py-1 rounded-full hover:bg-gray-200" onClick={handleAddLiabilityClick}>
                                    Add More
                                </button>
                            </div>
                            <div className="mt-2 space-y-2">
                                {liabilities.map((liability) => (
                                    <div key={liability._id} className="p-2">
                                        <div className="flex justify-between items-center">
                                            <div>
                                                <p className="font-bold text-xl text-[#1D3557]">{liability.name}</p>
                                                <p>worth Rs. {liability.amount}</p>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <p>Due Date<br />{new Date(liability.dueDate).toISOString().split('T')[0]}</p>
                                                <button
                                                    onClick={() => handleDeleteLiability(liability._id)}
                                                    className="ml-2 text-red-500"
                                                >
                                                    <img src="/Trash.svg" alt="Delete" className="w-6 h-8" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="flex-1 bg-[#697184] p-4 rounded mt-3">
                            <div className="flex justify-between items-center">
                                <h2 className='text-2xl font-bold text-[#102647] ml-2'>Assets</h2>
                                <button className="bg-[#BABABA] text-[#1D3557] px-4 py-1 rounded-full hover:bg-gray-200" onClick={handleAddAssetClick}>
                                    Add More
                                </button>
                            </div>
                            <div className="mt-2 space-y-2">
                                {assets.map((asset) => (
                                    <div key={asset._id} className="p-2">
                                        <div className="flex justify-between items-center">
                                            <div>
                                                <p className="font-bold text-xl text-[#102647]">{asset.name}</p>
                                                <p className="text-dark">worth Rs. {asset.amount}</p>
                                            </div>
                                            <button
                                                onClick={() => handleDeleteAsset(asset._id)}
                                                className="text-red-800"
                                            >
                                                <img src="/Trash.svg" alt="Delete" className="w-6 h-8" />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                {/* Right half */}
                <div className="ml-20 w-2/5 p-5 rounded">
                    <div className="items-center mb-4">
                        <p className='text-2xl font-medium ml-1 text-gray-700 mt-4 mr-20'>
                            “Do not save what is left after spending, but spend what is left after saving.” - Warren Buffett
                        </p>
                    </div>
                    <div className="items-center mt-26 w-90 h-45 rounded-md bg-[#D8CFD0] mb-4 overflow-hidden">
                        <h2 className="text-2xl font-bold text-[#1D3557] ml-10 mt-5">
                            Finding difficulties?
                        </h2>
                        <p className="text-xl text-dark ml-10 mt-4">
                            For any queries email on:
                            <br />
                            financeease@gmail.com
                        </p>
                    </div>
                </div>
            </div>

            {/* Edit Profile Modal */}
            {editUser && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-[#697184] p-6 rounded-md shadow-lg max-w-3xl w-full">
                        <h2 className="text-2xl flex justify-center text-[#D8CFD0] font-bold mb-4">Edit Profile</h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-lg font-medium text-gray-800">Name</label>
                                <input
                                    placeholder="John Doe"
                                    type="text"
                                    value={editUser.username}
                                    onChange={(e) => setEditUser({ ...editUser, username: e.target.value })}
                                    className="mt-1 block w-full bg-[#D8CFD0] rounded-md shadow-sm p-2 focus:outline-none focus:border-none"
                                />
                                {editUserErrors.username && <p className="text-red-500 text-sm mt-1">{editUserErrors.username}</p>}
                            </div>
                            <div>
                                <label className="block text-lg font-medium text-gray-800">Email</label>
                                <input
                                    type="email"
                                    placeholder="johndoe@gmail.com"
                                    value={editUser.email}
                                    onChange={(e) => setEditUser({ ...editUser, email: e.target.value })}
                                    className="mt-1 block w-full bg-[#D8CFD0] rounded-md shadow-sm p-2 focus:outline-none focus:border-none"
                                />
                                {editUserErrors.email && <p className="text-red-500 text-sm mt-1">{editUserErrors.email}</p>}
                            </div>
                            <div>
                                <label className="block text-lg font-medium text-gray-800">Occupation</label>
                                <input
                                    type="text"
                                    placeholder="Doctor/Engineer"
                                    value={editUser.profession}
                                    onChange={(e) => setEditUser({ ...editUser, profession: e.target.value })}
                                    className="mt-1 block w-full bg-[#D8CFD0] rounded-md shadow-sm p-2 focus:outline-none focus:border-none"
                                />
                                {editUserErrors.profession && <p className="text-red-500 text-sm mt-1">{editUserErrors.profession}</p>}
                            </div>
                            <div>
                                <label className="block text-lg font-medium text-gray-800">Phone</label>
                                <input
                                    type="text"
                                    placeholder="1234567890"
                                    value={editUser.phone}
                                    onChange={(e) => setEditUser({ ...editUser, phone: e.target.value })}
                                    className="mt-1 block w-full bg-[#D8CFD0] rounded-md shadow-sm p-2 focus:outline-none focus:border-none"
                                />
                                {editUserErrors.phone && <p className="text-red-500 text-sm mt-1">{editUserErrors.phone}</p>}
                            </div>
                            <div>
                                <label className="block text-lg font-medium text-gray-800">Age</label>
                                <input
                                    type="text"
                                    placeholder="25"
                                    value={editUser.age}
                                    onChange={(e) => setEditUser({ ...editUser, age: e.target.value })}
                                    className="mt-1 block w-full bg-[#D8CFD0] rounded-md shadow-sm p-2 focus:outline-none focus:border-none"
                                />
                                {editUserErrors.age && <p className="text-red-500 text-sm mt-1">{editUserErrors.age}</p>}
                            </div>
                            <div>
                                <label className="block text-lg font-medium text-gray-800">Marital Status</label>
                                <input
                                    type="text"
                                    placeholder="Single/Married/Divorced"
                                    value={editUser.maritalStatus}
                                    onChange={(e) => setEditUser({ ...editUser, maritalStatus: e.target.value })}
                                    className="mt-1 block w-full bg-[#D8CFD0] rounded-md shadow-sm p-2 focus:outline-none focus:border-none"
                                />
                                {editUserErrors.maritalStatus && <p className="text-red-500 text-md mt-1">{editUserErrors.maritalStatus}</p>}
                            </div>
                            <div className="flex justify-center space-x-2">
                                <button
                                    className="bg-gray-300 text-gray-700 font-bold px-4 py-2 rounded-md hover:bg-gray-400 transition-colors"
                                    onClick={() => {
                                        setIsModalOpen(false);
                                        setEditUser(null);
                                    }}
                                >
                                    Cancel
                                </button>
                                <button
                                    className="bg-[#4A4A4A] text-white font-bold px-4 py-2 rounded-md hover:bg-[#4A4A4A]/70 transition-colors"
                                    onClick={handleSaveClick}
                                >
                                    Save
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Add Liability Modal */}
            {isLiabilitiesModalOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-[#697184] p-6 rounded-md shadow-lg max-w-3xl w-full">
                        <h2 className="text-2xl flex justify-centre text-[#D8CFD0] font-bold ml-75 mb-4">Add Liability</h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-lg font-medium text-gray-800">Name of Liability</label>
                                <input
                                    type="text"
                                    placeholder='Loan, EMI etc.'
                                    value={newLiability.name}
                                    onChange={(e) => setNewLiability({ ...newLiability, name: e.target.value })}
                                    className="mt-1 block w-full bg-[#D8CFD0] rounded-md shadow-sm p-2 focus:outline-none focus:border-none"
                                />
                                {newLiabilityErrors.name && <p className="text-red-500 text-sm mt-1">{newLiabilityErrors.name}</p>}
                            </div>
                            <div>
                                <label className="block text-lg font-medium text-gray-800">Amount (in Rs.)</label>
                                <input
                                    type="number"
                                    placeholder='10,000'
                                    value={newLiability.amount}
                                    onChange={(e) => setNewLiability({ ...newLiability, amount: e.target.value })}
                                    className="mt-1 block w-full bg-[#D8CFD0] rounded-md shadow-sm p-2 focus:outline-none focus:border-none"
                                />
                                {newLiabilityErrors.amount && <p className="text-red-500 text-sm mt-1">{newLiabilityErrors.amount}</p>}
                            </div>
                            <div>
                                <label className="block text-lg font-medium text-gray-800">Description</label>
                                <textarea
                                    placeholder='Description of Liability'
                                    rows="4"
                                    value={newLiability.description}
                                    onChange={(e) => setNewLiability({ ...newLiability, description: e.target.value })}
                                    className="mt-1 block w-full bg-[#D8CFD0] rounded-md shadow-sm p-2 focus:outline-none focus:border-none"
                                />
                                {newLiabilityErrors.description && <p className="text-red-500 text-sm mt-1">{newLiabilityErrors.description}</p>}
                            </div>
                            <div>
                                <label className="block text-lg font-medium text-gray-800">Due Date</label>
                                <input
                                    type="date"
                                    placeholder='Due Date'
                                    value={newLiability.duedate}
                                    onChange={(e) => setNewLiability({ ...newLiability, dueDate: e.target.value })}
                                    className="mt-1 block w-full bg-[#D8CFD0] rounded-md shadow-sm p-2 focus:outline-none focus:border-none"
                                />
                                {newLiabilityErrors.dueDate && <p className="text-red-500 text-sm mt-1">{newLiabilityErrors.dueDate}</p>}
                            </div>
                            <div className="flex justify-center space-x-2">
                                <button
                                    className="bg-gray-300 text-gray-700 font-bold px-4 py-2 rounded-md hover:bg-gray-400 transition-colors"
                                    onClick={() => {
                                        setIsLiabilitiesModalOpen(false);
                                    }}
                                >
                                    Cancel
                                </button>
                                <button
                                    className="bg-[#4A4A4A] text-white font-bold px-4 py-2 rounded-md hover:bg-[#4A4A4A]/70 transition-colors"
                                    onClick={handleLiabilitySaveClick}
                                >
                                    Save
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Add Asset Modal */}
            {isAssetsModalOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-[#697184] p-6 rounded-md shadow-lg max-w-3xl w-full">
                        <h2 className="text-2xl flex justify-centre text-[#D8CFD0] font-bold ml-75 mb-4">Add Asset</h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-lg font-medium text-gray-800">Name of Asset</label>
                                <input
                                    type="text"
                                    placeholder='House, Car etc.'
                                    value={newAsset.name}
                                    onChange={(e) => setNewAsset({ ...newAsset, name: e.target.value })}
                                    className="mt-1 block w-full bg-[#D8CFD0] rounded-md shadow-sm p-2 focus:outline-none focus:border-none"
                                />
                                {newAssetErrors.name && <p className="text-red-500 text-sm mt-1">{newAssetErrors.name}</p>}
                            </div>
                            <div>
                                <label className="block text-lg font-medium text-gray-800">Amount (in Rs.)</label>
                                <input
                                    type="number"
                                    placeholder='10,000'
                                    value={newAsset.amount}
                                    onChange={(e) => setNewAsset({ ...newAsset, amount: e.target.value })}
                                    className="mt-1 block w-full bg-[#D8CFD0] rounded-md shadow-sm p-2 focus:outline-none focus:border-none"
                                />
                                {newAssetErrors.amount && <p className="text-red-500 text-sm mt-1">{newAssetErrors.amount}</p>}
                            </div>
                            <div>
                                <label className="block text-lg font-medium text-gray-800">Description</label>
                                <textarea
                                    placeholder='Description of Asset'
                                    rows="4"
                                    value={newAsset.description}
                                    onChange={(e) => setNewAsset({ ...newAsset, description: e.target.value })}
                                    className="mt-1 block w-full bg-[#D8CFD0] rounded-md shadow-sm p-2 focus:outline-none focus:border-none"
                                />
                                {newAssetErrors.description && <p className="text-red-500 text-sm mt-1">{newAssetErrors.description}</p>}
                            </div>
                            <div className="flex justify-center space-x-2">
                                <button
                                    className="bg-gray-300 text-gray-700 font-bold px-4 py-2 rounded-md hover:bg-gray-400 transition-colors"
                                    onClick={() => setIsAssetsModalOpen(false)}
                                >
                                    Cancel
                                </button>
                                <button
                                    className="bg-[#4A4A4A] text-white font-bold px-4 py-2 rounded-md hover:bg-[#4A4A4A]/70 transition-colors"
                                    onClick={handleAssetSaveClick}
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

export default Profile;