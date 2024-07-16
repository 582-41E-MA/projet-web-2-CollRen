import React, { useState, useEffect } from 'react';
import MenuDashboardAdmin from "../../dashboards/MenuDashboardAdmin/MenuDashboardAdmin";
import { Link } from 'react-router-dom';
import Bouton from '../../partialsFormulaire/Bouton/Bouton';

function UserIndex({ t }) {
    const [users, setUsers] = useState([]);
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

    useEffect(() => {
        fetch(`${t("fetch")}utilisateurs`)
            .then(response => response.json())
            .then(data => {
                setUsers(data);
            })
            .catch(error => console.error('Error fetching users:', error));
    }, []);

    const handleSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    const sortedUsers = [...users].sort((a, b) => {
        if (sortConfig.key) {
            if (sortConfig.key === 'privilege_id') {
                if (sortConfig.direction === 'asc') {
                    return a[sortConfig.key] - b[sortConfig.key];
                } else {
                    return b[sortConfig.key] - a[sortConfig.key];
                }
            } else {
                if (sortConfig.direction === 'asc') {
                    return a[sortConfig.key].localeCompare(b[sortConfig.key]);
                } else {
                    return b[sortConfig.key].localeCompare(a[sortConfig.key]);
                }
            }
        }
        return 0;
    });

    return (
        <div className="flex">
            <div>
                <MenuDashboardAdmin t={t} />
            </div>
            <div className='flex flex-col w-[40%] mx-[3rem] mt-24 mb-[4rem]'>

                <h2 className="mx-[4rem] p-3">{t("user_list_titre")}</h2>

                <table className="w-full divide-y divide-gray-200 bg-[#21283B] mt-4 rounded-lg mb-[4rem]">
                    <thead>
                        <tr>
                            <th
                                className="px-6 py-3 text-left text-xs font-large text-gray-500 uppercase tracking-wider cursor-pointer"
                                onClick={() => handleSort('prenom')}
                            >
                                <span className={sortConfig.key === 'prenom' ? 'font-bold' : ''}>
                                    {t("user.prenom")} {sortConfig.key === 'prenom' ? (sortConfig.direction === 'asc' ? '▲' : '▼') : '⇅'}
                                </span>
                            </th>
                            <th
                               className="px-6 py-3 text-left text-xs font-large text-gray-500 uppercase tracking-wider cursor-pointer"
                                onClick={() => handleSort('nom')}
                            >
                                <span className={sortConfig.key === 'nom' ? 'font-bold' : ''}>
                                    {t("user.nom")} {sortConfig.key === 'nom' ? (sortConfig.direction === 'asc' ? '▲' : '▼') : '⇅'}
                                </span>
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-large text-gray-500 uppercase tracking-wider">{t("user.anniversaire")}</th>
                            <th className="px-6 py-3 text-left text-xs font-large text-gray-500 uppercase tracking-wider">{t("user.courriel")}</th>
                            <th className="px-6 py-3 text-left text-xs font-large text-gray-500 uppercase tracking-wider">{t("user.adresse")}</th>
                            <th className="px-6 py-3 text-left text-xs font-large text-gray-500 uppercase tracking-wider">{t("user.codepostal")}</th>
                            <th className="px-6 py-3 text-left text-xs font-large text-gray-500 uppercase tracking-wider">{t("user.ville")}</th>
                            <th className="px-6 py-3 text-left text-xs font-large text-gray-500 uppercase tracking-wider">{t("user.province")}</th>
                            <th className="px-6 py-3 text-left text-xs font-large text-gray-500 uppercase tracking-wider">{t("user.telephone")}</th>
                            <th className="px-6 py-3 text-left text-xs font-large text-gray-500 uppercase tracking-wider">{t("user.cellulaire")}</th>
                            <th
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                                onClick={() => handleSort('privilege_id')}
                            >
                                <span className={sortConfig.key === 'privilege_id' ? 'font-bold' : ''}>
                                    {t("user.privilege")} {sortConfig.key === 'privilege_id' ? (sortConfig.direction === 'asc' ? '▲' : '▼') : '⇅'}
                                </span>
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-[#21283B] divide-y divide-gray-200">
                        {sortedUsers.map((user, index) => (
                            <tr key={index}>
                                <td className="px-4 py-2 whitespace-nowrap text-white">{user.prenom}</td>
                                <td className="px-4 py-2 whitespace-nowrap text-white">{user.nom}</td>
                                <td className="px-4 py-2 whitespace-nowrap text-white">{user.anniversaire}</td>
                                <td className="px-4 py-2 whitespace-nowrap text-white">{user.courriel}</td>
                                <td className="px-4 py-2 whitespace-nowrap text-white">{user.adresse}</td>
                                <td className="px-4 py-2 whitespace-nowrap text-white">{user.code_postal}</td>
                                <td className="px-4 py-2 whitespace-nowrap text-white">{user.ville}</td>
                                <td className="px-4 py-2 whitespace-nowrap text-white">{user.province}</td>
                                <td className="px-4 py-2 whitespace-nowrap text-white">{user.telephone}</td>
                                <td className="px-4 py-2 whitespace-nowrap text-white">{user.cellulaire}</td>
                                <td className="px-4 py-2 whitespace-nowrap text-white">{user.privilege_id}</td>
                                <td className="px-4 py-2 whitespace-nowrap text-white">
                                    <Link to={`/user/${user.id}`} >
                                        <Bouton>{t("btnEditer")}</Bouton>
                                    </Link>
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
