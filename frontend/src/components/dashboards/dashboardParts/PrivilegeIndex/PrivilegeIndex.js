import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import MenuDashboardAdmin from '../../MenuDashboardAdmin/MenuDashboardAdmin';

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
    }, [language]); // Dependency is now language

    // Function to handle language change
    useEffect(() => {
        const storedLanguage = localStorage.getItem('langueChoisie') || '';
        setLanguage(storedLanguage);
    }, [changeLanguage]);

    // Function to handle privilege deletion
    const handleDeletePrivilege = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/api/privileges/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            // Update privileges state to reflect deletion
            const updatedPrivileges = privileges.filter(privilege => privilege.id !== id);
            setPrivileges(updatedPrivileges);

            // For demonstration, alert success
            alert('Privilege deleted successfully!');
        } catch (error) {
            console.error('Error deleting privilege:', error);
            alert('Error deleting privilege. Please try again.');
        }
    };

    // Render table with fetched data
    return (

        <div className="flex">
            <div>
                <MenuDashboardAdmin t={t} />
            </div>

            <div className="w-[30%] mx-[4rem] mt-24">
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
                                    <Link to={`/privilege-edit/${privilege.id}`} className="px-4 py-2 font-medium text-white bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:shadow-outline-blue active:bg-blue-600 transition duration-150 ease-in-out">
                                        {t("privilegeIndex.btnEditer")}
                                    </Link>
                                    <button
                                        onClick={() => handleDeletePrivilege(privilege.id)}
                                        className="ml-2 px-4 py-2 font-medium text-white bg-red-600 rounded-md hover:bg-red-500 focus:outline-none focus:shadow-outline-red active:bg-red-600 transition duration-150 ease-in-out"
                                    >
                                         {t("privilegeIndex.btnDeleter")}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default PrivilegeIndex;
