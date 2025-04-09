import { useState, useEffect } from 'react';
import Modal from '../layouts/Modal';

function ExpertProfile() {
    const [expert, setExpert] = useState({
        name: '',
        email: '',
        phoneNumber: '',
        age: '',
        occupation: '',
        expertise: ''
    });

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editExpert, setEditExpert] = useState(null);

    useEffect(() => {
        const fetchExpertProfile = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/expert/me', {
                    method: 'GET',
                    credentials: 'include',
                });
                if (response.ok) {
                    const data = await response.json();
                    setExpert({
                        name: data.name,
                        email: data.email,
                        phoneNumber: data.phoneNumber || '',
                        age: data.age || '',
                        occupation: data.occupation,
                        expertise: data.expertise || ''
                    });
                } else {
                    console.error('Failed to fetch expert profile');
                }
            } catch (error) {
                console.error('Error fetching expert profile:', error);
            }
        };

        fetchExpertProfile();
    }, []);

    const handleEditClick = () => {
        setEditExpert({ ...expert });
        setIsModalOpen(true);
    };

    const handleSaveClick = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/expert/profile/update', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(editExpert),
            });

            if (response.ok) {
                const updatedExpert = await response.json();
                setExpert(updatedExpert);
                setIsModalOpen(false);
                setEditExpert(null);
            } else {
                console.error('Failed to update expert profile');
            }
        } catch (error) {
            console.error('Error updating expert profile:', error);
        }
    };

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-[#4A4A4A] ml-5 mt-10 mb-2">Profile</h1>
            <p className="text-xl text-gray-700 ml-5 mb-3">Welcome, {expert.name}!</p>
            <div className="flex">
                {/* Left half */}
                <div className="w-3/5 p-5 h-60">
                    <div className="flex flex-col h-full space-y-2">
                        <div className="flex-1 p-4 rounded bg-[#697184]">
                            <div className="flex">
                                <div className="w-1/3 ml-5 mt-10">
                                    <img src="/person.png" alt="Expert" className="w-24 h-24 rounded-full object-cover" />
                                </div>
                                <div className="w-2/3 flex flex-col">
                                    <div className="flex justify-between items-center">
                                        <h2 className="text-3xl mb-3 font-bold text-[#1D3557]">Profile Information</h2>
                                        <button className="bg-[#BABABA] font-bold mr-3 text-[#1D3557] px-4 py-1 rounded-full hover:bg-gray-200" onClick={handleEditClick}>
                                            Edit
                                        </button>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                                            <div className="text-xl font-medium text-dark">Name:</div>
                                            <div className="text-xl font-medium text-[#D8CFD0]">{expert.name}</div>

                                            <div className="text-xl font-medium text-dark">Email:</div>
                                            <div className="text-xl font-medium text-[#D8CFD0]">{expert.email}</div>

                                            <div className="text-xl font-medium text-dark">Phone:</div>
                                            <div className="text-xl font-medium text-[#D8CFD0]">{expert.phoneNumber}</div>

                                            <div className="text-xl font-medium text-dark">Age:</div>
                                            <div className="text-xl font-medium text-[#D8CFD0]">{expert.age}</div>

                                            <div className="text-xl font-medium text-dark">Occupation:</div>
                                            <div className="text-xl font-medium text-[#D8CFD0]">{expert.occupation}</div>

                                            <div className="text-xl font-medium text-dark">Area of Expertise:</div>
                                            <div className="text-xl font-medium text-[#D8CFD0]">{expert.expertise}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Right half */}
                <div className="ml-20 w-2/5 p-5 rounded">
                    <div className="items-center w-90 h-45 rounded-md bg-[#D8CFD0] mb-4 overflow-hidden">
                        <h2 className="text-3xl font-bold text-[#1D3557] ml-10 mt-5">
                            Finding difficulties?
                        </h2>
                        <p className="text-xl text-dark ml-10 mt-6">
                            For any queries email on:
                            <br />
                            financeease@gmail.com
                        </p>
                    </div>
                </div>
            </div>

            {/* Edit Profile Modal */}
            {editExpert && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-[#697184] p-6 rounded-md shadow-lg max-w-3xl w-full">
                        <h2 className="text-2xl flex justify-center text-[#D8CFD0] font-bold mb-4">Edit Profile</h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-lg font-medium text-gray-800">Name</label>
                                <input
                                    placeholder='eg. John Doe'
                                    type="text"
                                    value={editExpert.name}
                                    onChange={(e) => setEditExpert({ ...editExpert, name: e.target.value })}
                                    className="mt-1 block w-full bg-[#D8CFD0] rounded-md shadow-sm p-2 focus:outline-none focus:border-none"
                                />
                            </div>
                            <div>
                                <label className="block text-lg font-medium text-gray-800">Email</label>
                                <input
                                    type="email"
                                    placeholder='eg. abc@gmail.com'
                                    value={editExpert.email}
                                    onChange={(e) => setEditExpert({ ...editExpert, email: e.target.value })}
                                    className="mt-1 block w-full bg-[#D8CFD0] rounded-md shadow-sm p-2 focus:outline-none focus:border-none"
                                />
                            </div>
                            <div>
                                <label className="block text-lg font-medium text-gray-800">Phone</label>
                                <input
                                    type="text"
                                    placeholder='eg. 123-456-7890'
                                    value={editExpert.phoneNumber}
                                    onChange={(e) => setEditExpert({ ...editExpert, phoneNumber: e.target.value })}
                                    className="mt-1 block w-full bg-[#D8CFD0] rounded-md shadow-sm p-2 focus:outline-none focus:border-none"
                                />
                            </div>
                            <div>
                                <label className="block text-lg font-medium text-gray-800">Age</label>
                                <input
                                    type="text"
                                    placeholder='eg. 25'
                                    value={editExpert.age}
                                    onChange={(e) => setEditExpert({ ...editExpert, age: e.target.value })}
                                    className="mt-1 block w-full bg-[#D8CFD0] rounded-md shadow-sm p-2 focus:outline-none focus:border-none"
                                />
                            </div>
                            <div>
                                <label className="block text-lg font-medium text-gray-800">Occupation</label>
                                <input
                                    type="text"
                                    placeholder='eg. Doctor/Engineer'
                                    value={editExpert.occupation}
                                    onChange={(e) => setEditExpert({ ...editExpert, occupation: e.target.value })}
                                    className="mt-1 block w-full bg-[#D8CFD0] rounded-md shadow-sm p-2 focus:outline-none focus:border-none"
                                />
                            </div>
                            <div>
                                <label className="block text-lg font-medium text-gray-800">Area of Expertise</label>
                                <input
                                    type="text"
                                    placeholder='eg. Financial Management'
                                    value={editExpert.expertise}
                                    onChange={(e) => setEditExpert({ ...editExpert, expertise: e.target.value })}
                                    className="mt-1 block w-full bg-[#D8CFD0] rounded-md shadow-sm p-2 focus:outline-none focus:border-none"
                                />
                            </div>
                            <div className="flex justify-center space-x-2">
                                <button
                                    className="bg-gray-300 text-gray-700 font-bold px-4 py-2 rounded-md hover:bg-gray-400 transition-colors"
                                    onClick={() => {
                                        setIsModalOpen(false);
                                        setEditExpert(null);
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
        </div>
    );
}

export default ExpertProfile;