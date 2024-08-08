import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import MenuDashboardAdmin from '../../dashboards/MenuDashboardAdmin/MenuDashboardAdmin';
import Bouton from '../../partialsFormulaire/Bouton/Bouton';

function CarburantIndex({ t, changeLanguage }) {
    const [carburants, setCarburants] = useState([]);
    const [language, setLanguage] = useState(localStorage.getItem('langueChoisie'));

    useEffect(() => {
        // Fonction pour récupérer les carburants en fonction de la langue
        const fetchCarburants = async () => {
            try {
                const response = await fetch(`${t("fetch")}carburants`);
                if (!response.ok) {
                    throw new Error(`Erreur HTTP! statut: ${response.status}`);
                }
                const data = await response.json();

                // Convertir le champ type de JSON string en objet JavaScript
                const updatedData = data.map(item => ({
                    ...item,
                    type: JSON.parse(item.type)
                }));
                setCarburants(updatedData);
            } catch (error) {
                console.error('Erreur lors de la récupération des carburants:', error);
            }
        };

        // Récupérer les carburants en fonction de la langue actuelle
        fetchCarburants();
    }, [language]);

    useEffect(() => {
        const storedLanguage = localStorage.getItem('langueChoisie') || '';
        setLanguage(storedLanguage);
    }, [changeLanguage]);

    const handleDeleteCarburant = async (id) => {
        try {
            const response = await fetch(`${t("fetch")}carburants/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error(`Erreur HTTP! statut: ${response.status}`);
            }

            const updatedCarburants = carburants.filter(carburant => carburant.id !== id);
            setCarburants(updatedCarburants);

            alert('Carburant supprimé avec succès!');
        } catch (error) {
            console.error('Erreur lors de la suppression du carburant:', error);
            alert('Erreur lors de la suppression du carburant. Veuillez réessayer.');
        }
    };

    return (
        <div className="flex flex-wrap sm:flex-nowrap">
            <div className="w-full sm:w-[25%] sm:pr-4">
                <MenuDashboardAdmin t={t} />
            </div>

            <div className="w-full sm:w-[75%] mx-4 sm:mx-0 mt-24 mb-16 sm:mb-[4rem]">
                <h1 className="text-[#21283B]">{t("carburantIndex_titre")}</h1>
                <Link to={"/carburant-create"}>
                    <p className="my-4 sm:my-[1rem] text-blue-500 hover:text-blue-700">+ {t("carburantIndex_create")}</p>
                </Link>

                <div className="overflow-x-auto">
                    <table className="w-full sm:w-[80%] divide-y divide-gray-200 bg-[#21283B] my-4 sm:my-[2rem] rounded-lg mx-auto">
                        <thead>
                            <tr>
                                <th className="px-4 sm:px-6 py-3 text-left text-xs sm:text-sm font-large text-gray-500 uppercase tracking-wider">Type</th>
                                <th className="px-4 sm:px-6 py-3 text-left text-xs sm:text-sm font-large text-gray-500 uppercase tracking-wider">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-[#21283B] my-4 sm:my-[2rem] rounded-lg">
                            {carburants.map(carburant => (
                                <tr key={carburant.id}>
                                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-white">{carburant.type[language]}</td>
                                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                                        <Link to={`/carburant-update/${carburant.id}`} className="bg-[#F96C25] hover:bg-[#868E9B] text-white font-bold py-2 px-4 rounded-full mx-2 sm:mx-[1rem]">
                                            {t("btnEditer")}
                                        </Link>
                                        <Bouton
                                            onClick={() => handleDeleteCarburant(carburant.id)}
                                            className="ml-2 px-4 py-2 font-medium text-white bg-red-600 rounded-md hover:bg-red-500 focus:outline-none focus:shadow-outline-red active:bg-red-600 transition duration-150 ease-in-out"
                                        >
                                            {t("btnDeleter")}
                                        </Bouton>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>


    );
}

export default CarburantIndex;
