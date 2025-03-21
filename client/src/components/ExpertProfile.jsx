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
                    credentials: 'include', // Include cookies in the request
                });
                if (response.ok) {
                    const data = await response.json();
                    setExpert({
                        name: data.name,
                        email: data.email,
                        phoneNumber: data.phoneNumber || '', // Set phone from data
                        age: data.age || '', // Set age from data
                        occupation: data.occupation,
                        expertise: data.expertise || '' // Set expertise from data
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
                credentials: 'include', // Include cookies in the request
                body: JSON.stringify(editExpert),
            });

            if (response.ok) {
                const updatedExpert = await response.json();
                setExpert(updatedExpert);
                setIsModalOpen(false);
            } else {
                console.error('Failed to update expert profile');
            }
        } catch (error) {
            console.error('Error updating expert profile:', error);
        }
    };

    return (
        <div className="p-4">
            <h1 className="text-4xl font-bold text-[#4A4A4A] ml-5 mb-4">Profile</h1>
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
                                        <button className="bg-[#BABABA] font-bold mr-3 text-[#1D3557] px-4 py-1 rounded-full" onClick={handleEditClick}>
                                            Edit
                                        </button>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                                            <div className="text-xl font-bold text-dark">Name:</div>
                                            <div className="text-xl font-bold text-[#D8CFD0]">{expert.name}</div>

                                            <div className="text-xl font-bold text-dark">Email:</div>
                                            <div className="text-xl font-bold text-[#D8CFD0]">{expert.email}</div>

                                            <div className="text-xl font-bold text-dark">Phone:</div>
                                            <div className="text-xl font-bold text-[#D8CFD0]">{expert.phoneNumber}</div>

                                            <div className="text-xl font-bold text-dark">Age:</div>
                                            <div className="text-xl font-bold text-[#D8CFD0]">{expert.age}</div>

                                            <div className="text-xl font-bold text-dark">Occupation:</div>
                                            <div className="text-xl font-bold text-[#D8CFD0]">{expert.occupation}</div>

                                            <div className="text-xl font-bold text-dark">Area of Expertise:</div>
                                            <div className="text-xl font-bold text-[#D8CFD0]">{expert.expertise}</div>
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
                        <p className="text-2xl text-dark ml-10 mt-4">
                            For any queries email on:
                            <br />
                            financeease@gmail.com
                        </p>
                    </div>
                </div>
            </div>

            {/* Edit Profile Modal */}
            {editExpert && (
                <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                    <h2 className="text-xl flex justify-center text-[#D8CFD0] font-bold mb-4">Edit Profile</h2>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-xl font-medium text-gray-700">Name</label>
                            <input
                                placeholder='eg. John Doe'
                                type="text"
                                value={editExpert.name}
                                onChange={(e) => setEditExpert({ ...editExpert, name: e.target.value })}
                                className="mt-1 block w-full bg-[#D8CFD0] rounded-md shadow-sm p-2 focus:outline-none focus:border-none"
                            />
                        </div>
                        <div>
                            <label className="block text-xl font-medium text-gray-700">Email</label>
                            <input
                                type="email"
                                placeholder='eg. abc@gmail.com'
                                value={editExpert.email}
                                onChange={(e) => setEditExpert({ ...editExpert, email: e.target.value })}
                                className="mt-1 block w-full bg-[#D8CFD0] rounded-md shadow-sm p-2 focus:outline-none focus:border-none"
                            />
                        </div>
                        <div>
                            <label className="block text-xl font-medium text-gray-700">Phone</label>
                            <input
                                type="text"
                                placeholder='eg. 123-456-7890'
                                value={editExpert.phoneNumber}
                                onChange={(e) => setEditExpert({ ...editExpert, phoneNumber: e.target.value })}
                                className="mt-1 block w-full bg-[#D8CFD0] rounded-md shadow-sm p-2 focus:outline-none focus:border-none"
                            />
                        </div>
                        <div>
                            <label className="block text-xl font-medium text-gray-700">Age</label>
                            <input
                                type="text"
                                placeholder='eg. 25'
                                value={editExpert.age}
                                onChange={(e) => setEditExpert({ ...editExpert, age: e.target.value })}
                                className="mt-1 block w-full bg-[#D8CFD0] rounded-md shadow-sm p-2 focus:outline-none focus:border-none"
                            />
                        </div>
                        <div>
                            <label className="block text-xl font-medium text-gray-700">Occupation</label>
                            <input
                                type="text"
                                placeholder='eg. Doctor/Engineer'
                                value={editExpert.occupation}
                                onChange={(e) => setEditExpert({ ...editExpert, occupation: e.target.value })}
                                className="mt-1 block w-full bg-[#D8CFD0] rounded-md shadow-sm p-2 focus:outline-none focus:border-none"
                            />
                        </div>
                        <div>
                            <label className="block text-xl font-medium text-gray-700">Area of Expertise</label>
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
                                className="bg-gray-300 text-gray-700 text-xl font-bold px-4 py-2 rounded-md"
                                onClick={() => setIsModalOpen(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className="bg-[#D8CFD0] text-[#817B7B] text-xl font-bold px-4 py-2 rounded-md"
                                onClick={handleSaveClick}
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </Modal>
            )}
        </div>
    );
}

export default ExpertProfile;