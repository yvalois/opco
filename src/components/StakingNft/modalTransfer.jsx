import { useState } from 'react';

const ModalS = ({ isOpen, onClose, onRetirar, id }) => {
    const [dropdownValue, setDropdownValue] = useState('');
    const options = ['1 Mes', '3 Meses', '6 Meses', '1 Año', '2 Años'];

    const closeModal = () => {
        onClose();
    };

    const handleRetirar = () => {
        // onRetirar(dropdownValue);
        closeModal();
    };

    const handleDropdownChange = (e) => {
        setDropdownValue(e.target.value);

    };

    return (
        <>
            {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="fixed inset-0 bg-black opacity-50"></div>
                    <div className="bg-white w-[400px] h-[300px] rounded-lg p-6 z-10">
                        <div className="flex  justify-between items-center mb-4">
                            <h2 className="text-xl font-bold">Transferir</h2>
                            <button
                                className="text-gray-500 hover:text-gray-800"
                                onClick={closeModal}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="w-6 h-6"
                                >
                                    <path d="M18 6L6 18M6 6l12 12"></path>
                                </svg>
                            </button>
                        </div>
                        <div className="mb-4">
                            <input
                                type='text'
                                className='block w-full mt-1 p-2 border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500'
                            />
                        </div>


                        <div className="flex justify-center items-end mt-12">
                            <button
                                className="mr-2 px-4 py-2 bg-yellow-300 text-black rounded hover:bg-red-600"
                                onClick={handleRetirar}
                            >
                                Transferir
                            </button>
                            <button
                                className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                                onClick={closeModal}
                            >
                                Cancelar
                            </button>


                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ModalS;
