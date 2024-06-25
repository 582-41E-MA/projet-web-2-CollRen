import React, { useState, useEffect } from 'react';
import MenuDashboardAdmin from "../../dashboards/MenuDashboardAdmin/MenuDashboardAdmin";

function UserIndex({ t }) {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/api/utilisateurs')
            .then(response => response.json())
            .then(data => {
                console.log("data", data);
                setUsers(data)
            })
            .catch(error => console.error('Error fetching users:', error));
    }, []);

    return (
        <div className="flex">
            <div>
                <MenuDashboardAdmin t={t} />
            </div>
            <div className="w-[65%] mx-[4rem] mt-24">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t("user.prenom")}</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t("user.nom")}</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t("user.anniversaire")}</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t("user.courriel")}</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t("user.adresse")}</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t("user.codepostal")}</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t("user.telephone")}</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t("user.cellulaire")}</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t("user.privilege")}</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {users.map((user, index) => (
                            <tr key={index}>
                                <td className="px-6 py-4 whitespace-nowrap">{user.prenom}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{user.nom}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{user.anniversaire}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{user.courriel}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{user.adresse}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{user.codepostal}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{user.telephone}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{user.cellulaire}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{user.privilege}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <button className="px-4 py-2 font-medium text-white bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:shadow-outline-blue active:bg-blue-600 transition duration-150 ease-in-out">Edit</button>
                                    <button className="ml-2 px-4 py-2 font-medium text-white bg-red-600 rounded-md hover:bg-red-500 focus:outline-none focus:shadow-outline-red active:bg-red-600 transition duration-150 ease-in-out">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default UserIndex;
