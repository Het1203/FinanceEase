import { useState, useEffect } from 'react';

function Profile() {
    const [user, setUser] = useState({
        name: '',
        email: '',
        occupation: ''
    });

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/profile', {
                    method: 'GET',
                    credentials: 'include', // Include cookies in the request
                });
                if (response.ok) {
                    const data = await response.json();
                    setUser({
                        name: data.name,
                        email: data.email,
                        occupation: data.occupation
                    });
                } else {
                    console.error('Failed to fetch user profile');
                }
            } catch (error) {
                console.error('Error fetching user profile:', error);
            }
        };

        fetchUserProfile();
    }, []);

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold text-[#4A4A4A] mb-4">Profile</h1>
            <div className="flex">
                {/* Left half */}
                <div className="w-1/2 p-5">
                    <div className="flex flex-col h-full space-y-2">
                        <div className="flex-1 p-4 rounded bg-[#697184]">
                            <div className="flex">
                                <div className="w-1/3 mx-5 mt-10">
                                    <img src="/person.png" alt="User" className="w-24 h-24 rounded-full object-cover" />
                                </div>
                                <div className="w-2/3 flex flex-col">
                                    <div className="flex justify-between items-center">
                                        <h2 className="text-xl font-bold text-[#1D3557]">Profile Information</h2>
                                        <button className="bg-[#BABABA] text-[#1D3557] px-4 py-1 rounded-full">
                                            Edit
                                        </button>
                                    </div>
                                    <p className="text-dark">Name: {user.name}</p>
                                    <p className="text-dark">Email: {user.email}</p>
                                    <p className="text-dark">Occupation: {user.occupation}</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex-1 bg-[#D8CFD0] p-4 rounded">
                            <div className="flex justify-between items-center">
                                <h2>Liabilities</h2>
                                <button className="bg-[#BABABA] text-[#1D3557] px-4 py-1 rounded-full">
                                    Add More
                                </button>
                            </div>
                        </div>
                        <div className="flex-1 bg-[#697184] p-4 rounded">
                            <div className="flex justify-between items-center">
                                <h2>Assets</h2>
                                <button className="bg-[#BABABA] text-[#1D3557] px-4 py-1 rounded-full">
                                    Add More
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Right half */}
                <div className="ml-40 w-1/2 p-5 rounded">
                    <div className="items-center w-70 h-35 rounded-md bg-[#D8CFD0] mb-4 overflow-hidden">
                        <h2 className="text-xl font-bold text-[#1D3557] ml-10 mt-5">
                            Finding difficulties?
                        </h2>
                        <p className="text-dark ml-10 mt-2">
                            For any queries email on:
                            <br />
                            financeease@gmail.com
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;