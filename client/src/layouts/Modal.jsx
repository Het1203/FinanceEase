import React from 'react';

const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-10 bg-[#D9D9D9] bg-opacity-50 flex items-center justify-center">
            <div className="bg-[#697184] p-6 rounded-lg shadow-lg w-1/2">
                <button className="absolute top-2 right-2 text-dark" onClick={onClose}>
                    &times;
                </button>
                {children}
            </div>
        </div>
    );
};

export default Modal;