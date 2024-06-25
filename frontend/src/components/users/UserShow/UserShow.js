import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import MenuDashboardAdmin from '../../dashboards/MenuDashboardAdmin/MenuDashboardAdmin';

function UserShow({ t }) {
    const { id } = useParams();
    const [user, setUser] = useState({
        prenom: '',
        nom: '',
        anniversaire: '',
        courriel: '',
        adresse: '',
        codepostal: '',
        telephone: '',
        cellulaire: '',
        privilege: 'user',
    });

    useEffect(() => {
        axios.get(`http://localhost:5000/api/utilisateurs/${id}`)
            .then(response => {
                setUser(response.data);
            })
            .catch(error => {
                console.error("There was an error fetching the user!", error);
            });
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    return (
        <div className="flex">
            <div>
                <MenuDashboardAdmin t={t}   />
            </div>

            <div className="w-[65%] mx-[4rem] mt-24">
            <form className="max-w-lg mx-auto bg-white p-8 rounded-md shadow-md">
            <div className="grid grid-cols-1 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700">{t("user.prenom")}</label>
                    <input 
                        type="text" 
                        name="prenom" 
                        value={user.prenom}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" 
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">{t("user.nom")}</label>
                    <input 
                        type="text" 
                        name="nom" 
                        value={user.nom}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" 
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">{t("user.anniversaire")}</label>
                    <input 
                        type="date" 
                        name="anniversaire" 
                        value={user.anniversaire}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" 
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">{t("user.courriel")}</label>
                    <input 
                        type="email" 
                        name="courriel" 
                        value={user.courriel}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" 
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">{t("user.adresse")}</label>
                    <input 
                        type="text" 
                        name="adresse" 
                        value={user.adresse}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" 
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">{t("user.codepostal")}</label>
                    <input 
                        type="text" 
                        name="codepostal" 
                        value={user.codepostal}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" 
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">{t("user.telephone")}</label>
                    <input 
                        type="text" 
                        name="telephone" 
                        value={user.telephone}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" 
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">{t("user.cellulaire")}</label>
                    <input 
                        type="text" 
                        name="cellulaire" 
                        value={user.cellulaire}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" 
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">{t("user.privilege")}</label>
                    <select 
                        name="privilege" 
                        value={user.privilege}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    >
                        <option value="admin">Admin</option>
                        <option value="user">User</option>
                        <option value="guest">Guest</option>
                    </select>
                </div>
            </div>
            <div className="mt-6 flex justify-end">
                <button 
                    type="submit" 
                    className="px-4 py-2 font-medium text-white bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:shadow-outline-blue active:bg-blue-600 transition duration-150 ease-in-out"
                >
                    Submit
                </button>
                <button 
                    type="reset" 
                    className="ml-2 px-4 py-2 font-medium text-white bg-red-600 rounded-md hover:bg-red-500 focus:outline-none focus:shadow-outline-red active:bg-red-600 transition duration-150 ease-in-out"
                >
                    Reset
                </button>
            </div>
        </form>
            </div>
        </div>

    );
}

export default UserShow;
