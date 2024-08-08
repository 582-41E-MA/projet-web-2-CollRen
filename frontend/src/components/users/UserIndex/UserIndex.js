import React, { useState, useEffect } from 'react';
import MenuDashboardAdmin from "../../dashboards/MenuDashboardAdmin/MenuDashboardAdmin";
import { Link } from 'react-router-dom';
import Bouton from '../../partialsFormulaire/Bouton/Bouton';

function UserIndex({ t }) {
    const [users, setUsers] = useState([]);
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
    const [language, setLanguage] = useState(localStorage.getItem('langueChoisie') || 'en');

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch(`${t("fetch")}utilisateurs`);
                const usersData = await response.json();

                const fetchCityAndProvince = async (user) => {
                    try {
                        const cityResponse = await fetch(`${t("fetch")}villes/${user.ville_id}`);
                        const cityData = await cityResponse.json();
                        const provinceResponse = await fetch(`${t("fetch")}provinces/${cityData.province_id}`);
                        const provinceData = await provinceResponse.json();

                        return {
                            ...user,
                            privilege: {
                                ...user.privilege,
                                type: JSON.parse(user.privilege.type)
                            },
                            ville: {
                                ...cityData,
                                nom: JSON.parse(cityData.nom),
                                province: JSON.parse(provinceData.nom)
                            }
                        };
                    } catch (error) {
                        console.error('Error fetching city or province:', error);
                        return user;
                    }
                };

                const updatedUsers = await Promise.all(usersData.map(fetchCityAndProvince));
                setUsers(updatedUsers);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, [t]);

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
            } else if (sortConfig.key === 'ville') {
                const aValue = a.ville.nom[language];
                const bValue = b.ville.nom[language];
                if (sortConfig.direction === 'asc') {
                    return aValue.localeCompare(bValue);
                } else {
                    return bValue.localeCompare(aValue);
                }
            } else if (sortConfig.key === 'province') {
                const aValue = a.ville.province ? a.ville.province[language] : '';
                const bValue = b.ville.province ? b.ville.province[language] : '';
                if (sortConfig.direction === 'asc') {
                    return aValue.localeCompare(bValue);
                } else {
                    return bValue.localeCompare(aValue);
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

                <h2 className="mb-[2rem] p-3">{t("user_list_titre")}</h2>

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
        <th
           className="px-6 py-3 text-left text-xs font-large text-gray-500 uppercase tracking-wider cursor-pointer"
           onClick={() => handleSort('ville')}
        >
            <span className={sortConfig.key === 'ville' ? 'font-bold' : ''}>
                {t("user.ville")} {sortConfig.key === 'ville' ? (sortConfig.direction === 'asc' ? '▲' : '▼') : '⇅'}
            </span>
        </th>
        <th
           className="px-6 py-3 text-left text-xs font-large text-gray-500 uppercase tracking-wider cursor-pointer"
           onClick={() => handleSort('province')}
        >
            <span className={sortConfig.key === 'province' ? 'font-bold' : ''}>
                {t("user.province")} {sortConfig.key === 'province' ? (sortConfig.direction === 'asc' ? '▲' : '▼') : '⇅'}
            </span>
        </th>
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
                               
                                <td className="px-4 py-2 whitespace-nowrap text-white">{user.ville.nom[language]}</td>
                                <td className="px-4 py-2 whitespace-nowrap text-white">{user.ville.province ? user.ville.province[language] : ''}</td>
                                <td className="px-4 py-2 whitespace-nowrap text-white">{user.privilege.type[language]}</td>
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