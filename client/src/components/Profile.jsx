import { useState, useEffect } from 'react';
import Modal from '../layouts/Modal';

function Profile() {
    const [user, setUser] = useState({
        name: '',
        email: '',
        occupation: '',
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

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/auth/me', {
                    method: 'GET',
                    credentials: 'include', // Include cookies in the request
                });
                if (response.ok) {
                    const data = await response.json();
                    setUser({
                        name: data.username,
                        email: data.email,
                        occupation: data.profession,
                        phone: data.phone || '', // Set phone from data
                        age: data.age || '', // Set age from data
                        maritalStatus: data.maritalStatus || '' // Set marital status from data
                    });
                } else {
                    console.error('Failed to fetch user profile');
                }
            } catch (error) {
                console.error('Error fetching user profile:', error);
            }
        };

        const fetchLiabilities = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/liabilities', {
                    method: 'GET',
                    credentials: 'include', // Include cookies in the request
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
                    credentials: 'include', // Include cookies in the request
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

        fetchUserProfile();
        fetchLiabilities();
        fetchAssets();
    }, []);

    const handleEditClick = () => {
        setEditUser({ ...user });
        setIsModalOpen(true);
    };

    const handleSaveClick = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/auth/profile/update', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include', // Include cookies in the request
                body: JSON.stringify(editUser),
            });

            if (response.ok) {
                const updatedUser = await response.json();
                setUser(updatedUser);
                setIsModalOpen(false);
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

    const handleLiabilitySaveClick = async () => {
        try {
            console.log('Sending liability data:', newLiability); // Log the data being sent
            const response = await fetch('http://localhost:5000/api/liabilities/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include', // Include cookies in the request
                body: JSON.stringify(newLiability),
            });

            if (response.ok) {
                const addedLiability = await response.json();
                setLiabilities([...liabilities, addedLiability]);
                setNewLiability({ name: '', amount: '', description: '', dueDate: '' });
                setIsLiabilitiesModalOpen(false);
            } else {
                const errorData = await response.json();
                console.error('Failed to add liability:', errorData); // Log the error response
            }
        } catch (error) {
            console.error('Error adding liability:', error);
        }
    };

    const handleAddAssetClick = () => {
        setIsAssetsModalOpen(true);
    };

    const handleAssetSaveClick = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/assets/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include', // Include cookies in the request
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

    const handleDeleteLiability = (index) => {
        const updatedLiabilities = liabilities.filter((_, i) => i !== index);
        setLiabilities(updatedLiabilities);
    };

    const handleDeleteAsset = (index) => {
        const updatedAssets = assets.filter((_, i) => i !== index);
        setAssets(updatedAssets);
    };

    return (
        <div className="p-4">
            <h1 className="text-4xl font-bold text-[#4A4A4A] ml-5 mb-3">Profile</h1>
            <div className="flex">
                {/* Left half */}
                <div className="w-3/5 p-5">
                    <div className="flex flex-col h-full space-y-2">
                        <div className="flex-1 p-4 rounded bg-[#697184]">
                            <div className="flex">
                                <div className="w-1/3 mx-5 mt-10">
                                    <img src="/person.png" alt="User" className="w-24 h-24 rounded-full object-cover" />
                                </div>
                                <div className="w-2/3 flex flex-col">
                                    <div className="flex justify-between items-center">
                                        <h2 className="text-2xl font-bold text-[#1D3557]">Profile Information</h2>
                                        <button className="bg-[#BABABA] text-[#1D3557] px-4 py-1 rounded-full hover:bg-gray-200" onClick={handleEditClick}>
                                            Edit
                                        </button>
                                    </div>
                                    <p className="text-dark">Name: {user.name}</p>
                                    <p className="text-dark">Email: {user.email}</p>
                                    <p className="text-dark">Occupation: {user.occupation}</p>
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
                                {liabilities.map((liability, index) => (
                                    <div key={index} className="p-2">
                                        <div className="flex justify-between items-center">
                                            <div>
                                                <p className="font-bold text-xl text-[#1D3557]">{liability.name}</p>
                                                <p>worth Rs. {liability.amount}</p>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <p>Due Date
                                                    <br />
                                                    {new Date(liability.dueDate).toISOString().split('T')[0]}</p>
                                                <button onClick={() => handleDeleteLiability(index)} className="ml-2 text-red-500">
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
                                {assets.map((asset, index) => (
                                    <div key={index} className="p-2">
                                        <div className="flex justify-between items-center">
                                            <div>
                                                <p className="font-bold text-xl text-[#102647]">{asset.name}</p>
                                                <p className='text-dark'>worth Rs. {asset.amount}</p>
                                            </div>
                                            <button onClick={() => handleDeleteAsset(index)} className="text-red-800">
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
                        <p className='text-3xl font-bold ml-1 text-[#1D3557] mt-4 mr-20'>
                            “Do not save what is left after spending, but spend what is left after saving.” <br /> - Warren Buffett
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
                    {/* <div className="items-center mt-15 mb-4">
                        <p className='text-3xl font-bold ml-2 text-[#1D3557] mt-4'>
                            “You must gain control over your money, or the lack of it will forever control you.” — Dave Ramsey
                        </p>
                    </div> */}
                </div>
            </div>

            {/* Edit Profile Modal */}
            {editUser && (
                <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                    <h2 className="text-xl flex justify-center text-[#D8CFD0] font-bold mb-4">Edit Profile</h2>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Name</label>
                            <input
                                placeholder='eg. John Doe'
                                type="text"
                                value={editUser.name}
                                onChange={(e) => setEditUser({ ...editUser, name: e.target.value })}
                                className="mt-1 block w-full bg-[#D8CFD0] rounded-md shadow-sm p-2 focus:outline-none focus:border-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Email</label>
                            <input
                                type="email"
                                placeholder='eg. abc@gmail.com'
                                value={editUser.email}
                                onChange={(e) => setEditUser({ ...editUser, email: e.target.value })}
                                className="mt-1 block w-full bg-[#D8CFD0] rounded-md shadow-sm p-2 focus:outline-none focus:border-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Occupation</label>
                            <input
                                type="text"
                                placeholder='eg. Doctor/Engineer'
                                value={editUser.occupation}
                                onChange={(e) => setEditUser({ ...editUser, occupation: e.target.value })}
                                className="mt-1 block w-full bg-[#D8CFD0] rounded-md shadow-sm p-2 focus:outline-none focus:border-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Phone</label>
                            <input
                                type="text"
                                placeholder='eg. 123-456-7890'
                                value={editUser.phone}
                                onChange={(e) => setEditUser({ ...editUser, phone: e.target.value })}
                                className="mt-1 block w-full bg-[#D8CFD0] rounded-md shadow-sm p-2 focus:outline-none focus:border-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Age</label>
                            <input
                                type="text"
                                placeholder='eg. 25'
                                value={editUser.age}
                                onChange={(e) => setEditUser({ ...editUser, age: e.target.value })}
                                className="mt-1 block w-full bg-[#D8CFD0] rounded-md shadow-sm p-2 focus:outline-none focus:border-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Marital Status</label>
                            <input
                                type="text"
                                placeholder='eg. Single/Married/Divorced'
                                value={editUser.maritalStatus}
                                onChange={(e) => setEditUser({ ...editUser, maritalStatus: e.target.value })}
                                className="mt-1 block w-full bg-[#D8CFD0] rounded-md shadow-sm p-2 focus:outline-none focus:border-none"
                            />
                        </div>
                        <div className="flex justify-center space-x-2">
                            <button
                                className="bg-gray-300 text-gray-700 font-bold px-4 py-2 rounded-md"
                                onClick={() => setIsModalOpen(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className="bg-[#D8CFD0] text-[#817B7B] font-bold px-4 py-2 rounded-md"
                                onClick={handleSaveClick}
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </Modal>
            )}

            {/* Add Liability Modal */}
            <Modal isOpen={isLiabilitiesModalOpen} onClose={() => setIsLiabilitiesModalOpen(false)}>
                <h2 className="text-xl flex justify-centre text-[#D8CFD0] font-bold ml-75 mb-4">Add Liability</h2>
                <div className="space-y-4">
                    <div>
                        <input
                            type="text"
                            placeholder='Name of Liability'
                            value={newLiability.name}
                            onChange={(e) => setNewLiability({ ...newLiability, name: e.target.value })}
                            className="mt-1 block w-full bg-[#D8CFD0] rounded-md shadow-sm p-2 focus:outline-none focus:border-none"
                        />
                    </div>
                    <div>
                        <input
                            type="number"
                            placeholder='Amount'
                            value={newLiability.amount}
                            onChange={(e) => setNewLiability({ ...newLiability, amount: e.target.value })}
                            className="mt-1 block w-full bg-[#D8CFD0] rounded-md shadow-sm p-2 focus:outline-none focus:border-none"
                        />
                    </div>
                    <div>
                        <textarea
                            placeholder='Description'
                            value={newLiability.description}
                            onChange={(e) => setNewLiability({ ...newLiability, description: e.target.value })}
                            className="mt-1 block w-full bg-[#D8CFD0] rounded-md shadow-sm p-2 focus:outline-none focus:border-none"
                        />
                    </div>
                    <div>
                        <input
                            type="date"
                            placeholder='Due Date'
                            value={newLiability.duedate}
                            onChange={(e) => setNewLiability({ ...newLiability, dueDate: e.target.value })}
                            className="mt-1 block w-full bg-[#D8CFD0] rounded-md shadow-sm p-2 focus:outline-none focus:border-none"
                        />
                    </div>
                    <div className="flex justify-center space-x-2">
                        <button
                            className="bg-gray-300 text-gray-700 font-bold px-4 py-2 rounded-md"
                            onClick={() => setIsLiabilitiesModalOpen(false)}
                        >
                            Cancel
                        </button>
                        <button
                            className="bg-[#D8CFD0] text-[#817B7B] font-bold px-4 py-2 rounded-md"
                            onClick={handleLiabilitySaveClick}
                        >
                            Save
                        </button>
                    </div>
                </div>
            </Modal>

            {/* Add Asset Modal */}
            <Modal isOpen={isAssetsModalOpen} onClose={() => setIsAssetsModalOpen(false)}>
                <h2 className="text-xl flex justify-centre text-[#D8CFD0] font-bold ml-75 mb-4">Add Asset</h2>
                <div className="space-y-4">
                    <div>
                        <input
                            type="text"
                            placeholder='Name of Asset'
                            value={newAsset.name}
                            onChange={(e) => setNewAsset({ ...newAsset, name: e.target.value })}
                            className="mt-1 block w-full bg-[#D8CFD0] rounded-md shadow-sm p-2 focus:outline-none focus:border-none"
                        />
                    </div>
                    <div>
                        <input
                            type="number"
                            placeholder='Amount'
                            value={newAsset.amount}
                            onChange={(e) => setNewAsset({ ...newAsset, amount: e.target.value })}
                            className="mt-1 block w-full bg-[#D8CFD0] rounded-md shadow-sm p-2 focus:outline-none focus:border-none"
                        />
                    </div>
                    <div>
                        <textarea
                            placeholder='Description'
                            value={newAsset.description}
                            onChange={(e) => setNewAsset({ ...newAsset, description: e.target.value })}
                            className="mt-1 block w-full bg-[#D8CFD0] rounded-md shadow-sm p-2 focus:outline-none focus:border-none"
                        />
                    </div>
                    <div className="flex justify-center space-x-2">
                        <button
                            className="bg-gray-300 text-gray-700 font-bold px-4 py-2 rounded-md"
                            onClick={() => setIsAssetsModalOpen(false)}
                        >
                            Cancel
                        </button>
                        <button
                            className="bg-[#D8CFD0] text-[#817B7B] font-bold px-4 py-2 rounded-md"
                            onClick={handleAssetSaveClick}
                        >
                            Save
                        </button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}

export default Profile;
