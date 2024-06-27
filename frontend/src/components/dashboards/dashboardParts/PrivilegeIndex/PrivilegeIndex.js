import React, { useEffect, useState } from 'react';

function PrivilegeIndex({ t, changeLanguage }) {
    const [privileges, setPrivileges] = useState([]);
    const [language, setLanguage] = useState(localStorage.getItem('langueChoisie') || '');

    useEffect(() => {
        // Function to fetch privileges based on language
        const fetchPrivileges = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/privileges');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();

                // Convert type field from JSON string to JavaScript object
                const updatedData = data.map(item => ({
                    ...item,
                    type: JSON.parse(item.type)
                }));
                setPrivileges(updatedData);
            } catch (error) {
                console.error('Error fetching privileges:', error);
            }
        };

        // Fetch privileges based on the current language
        fetchPrivileges();
    }, [language]); // Dependência agora é language

    // Function to handle language change
    useEffect(() => {
        const storedLanguage = localStorage.getItem('langueChoisie') || '';
        setLanguage(storedLanguage);
    }, [changeLanguage]);

    // Render table with fetched data
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
                <thead>
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {privileges.map(privilege => (
                        <tr key={privilege.id}>
                            <td className="px-6 py-4 whitespace-nowrap">{privilege.type[language]}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <button
                                    className="px-4 py-2 font-medium text-white bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:shadow-outline-blue active:bg-blue-600 transition duration-150 ease-in-out"
                                >
                                    Edit
                                </button>
                                <button
                                    className="ml-2 px-4 py-2 font-medium text-white bg-red-600 rounded-md hover:bg-red-500 focus:outline-none focus:shadow-outline-red active:bg-red-600 transition duration-150 ease-in-out"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default PrivilegeIndex;
