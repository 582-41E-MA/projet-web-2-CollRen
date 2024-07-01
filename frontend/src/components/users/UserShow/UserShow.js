import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import MenuDashboardAdmin from '../../dashboards/MenuDashboardAdmin/MenuDashboardAdmin';
import ChampText from '../../partialsFormulaire/ChampText/ChampText';

function UserShow({ t }) {
    const { id } = useParams();
    const [user, setUser] = useState({
        prenom: '',
        nom: '',
        anniversaire: '',
        courriel: '',
        adresse: '',
        code_postal: '',
        telephone: '',
        cellulaire: '',
        privilege_id: '',
    });

    const [privileges, setPrivileges] = useState([]);
    const [language, setLanguage] = useState(localStorage.getItem('langueChoisie'));

    useEffect(() => {
        // Fetch user data
        fetch(`http://localhost:5000/api/utilisateurs/${id}`)
            .then(response => response.json())
            .then(data => {
                setUser(data);
            })
            .catch(error => {
                console.error("There was an error fetching the user!", error);
            });

        // Fetch privileges data
        fetch('http://localhost:5000/api/privileges')
            .then(response => response.json())
            .then(data => {
                // Transforma a lista de privilégios em um objeto com chave sendo o id do privilégio
                const updatedData = data.map(item => ({
                    ...item,
                    type: JSON.parse(item.type)
                }));
                setPrivileges(updatedData);
            })
            .catch(error => {
                console.error("There was an error fetching the privileges!", error);
            });

            
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        fetch(`http://localhost:5000/api/utilisateurs/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
        })
        .catch(error => {
            console.error("There was an error updating the user!", error);
        });
    };

    const handleDelete = () => {
        fetch(`http://localhost:5000/api/utilisateurs/${id}`, {
            method: 'DELETE',
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
        })
        .catch(error => {
            console.error("There was an error deleting the user!", error);
        });
    };

    return (
        <div className="flex">
            <div>
                <MenuDashboardAdmin t={t} />
            </div>

            <div className="w-[65%] mx-[4rem] mt-24">
                <form className="max-w-lg mx-auto bg-white p-8 rounded-md shadow-md" onSubmit={handleUpdate}>
                    <div className="grid grid-cols-1 gap-6">
                        {/* Outras entradas */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">{t("user.prenom")}</label>
                            <ChampText
                                type="text" 
                                name="prenom" 
                                value={user.prenom}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" 
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">{t("user.nom")}</label>
                            <ChampText
                                type="text" 
                                name="nom" 
                                value={user.nom}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" 
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">{t("user.anniversaire")}</label>
                            <ChampText
                                type="date" 
                                name="anniversaire" 
                                value={user.anniversaire}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" 
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">{t("user.courriel")}</label>
                            <ChampText
                                type="email" 
                                name="courriel" 
                                value={user.courriel}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" 
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">{t("user.adresse")}</label>
                            <ChampText
                                type="text" 
                                name="adresse" 
                                value={user.adresse}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" 
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">{t("user.codepostal")}</label>
                            <ChampText
                                type="text" 
                                name="code_postal" 
                                value={user.code_postal}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" 
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">{t("user.telephone")}</label>
                            <ChampText
                                type="text" 
                                name="telephone" 
                                value={user.telephone}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" 
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">{t("user.cellulaire")}</label>
                            <ChampText
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
                                name="privilege_id"  
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            >
                                <option value="">{t("user.selectprivilege")}</option>
                                {privileges.map(privilege => (
                                        <option key={privilege.id} value={privilege.id}>
                                            {privilege.type[language]}
                                        </option>
                                    ))
                                }
                            </select>
                        </div>
                    </div>
                    <div className="mt-6 flex justify-end">
                        <button 
                            type="submit" 
                            className="px-4 py-2 font-medium text-white bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:shadow-outline-blue active:bg-blue-600 transition duration-150 ease-in-out"
                        >
                            Update
                        </button>
                        <button 
                            type="button" 
                            onClick={handleDelete}
                            className="ml-2 px-4 py-2 font-medium text-white bg-red-600 rounded-md hover:bg-red-500 focus:outline-none focus:shadow-outline-red active:bg-red-600 transition duration-150 ease-in-out"
                        >
                            Delete
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default UserShow;
