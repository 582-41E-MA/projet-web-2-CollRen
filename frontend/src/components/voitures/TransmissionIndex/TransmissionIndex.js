import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import MenuDashboardAdmin from '../../dashboards/MenuDashboardAdmin/MenuDashboardAdmin';
import Bouton from '../../partialsFormulaire/Bouton/Bouton';

function TransmissionIndex({ t, changeLanguage }) {
    const [transmissions, setTransmissions] = useState([]);
    const [language, setLanguage] = useState(localStorage.getItem('langueChoisie'));

    useEffect(() => {
        // Fonction pour récupérer les transmissions en fonction de la langue
        const fetchTransmissions = async () => {
            try {
                const response = await fetch(`${t("fetch")}transmissions`);
                if (!response.ok) {
                    throw new Error(`Erreur HTTP! statut: ${response.status}`);
                }
                const data = await response.json();

                // Convertir le champ type de JSON string en objet JavaScript
                const updatedData = data.map(item => ({
                    ...item,
                    type: JSON.parse(item.type)
                }));
                setTransmissions(updatedData);
            } catch (error) {
                console.error('Erreur lors de la récupération des transmissions:', error);
            }
        };

        // Récupérer les transmissions en fonction de la langue actuelle
        fetchTransmissions();
    }, [language]);

    useEffect(() => {
        const storedLanguage = localStorage.getItem('langueChoisie') || '';
        setLanguage(storedLanguage);
    }, [changeLanguage]);

    const handleDeleteTransmission = async (id) => {
        try {
            const response = await fetch(`${t("fetch")}transmissions/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error(`Erreur HTTP! statut: ${response.status}`);
            }

            const updatedTransmissions = transmissions.filter(transmission => transmission.id !== id);
            setTransmissions(updatedTransmissions);

            alert('Transmission supprimée avec succès!');
        } catch (error) {
            console.error('Erreur lors de la suppression de la transmission:', error);
            alert('Erreur lors de la suppression de la transmission. Veuillez réessayer.');
        }
    };

    return (
        <div className="flex flex-wrap">
    <div className="w-full sm:w-[20%] sm:pr-4">
        <MenuDashboardAdmin t={t} />
    </div>
    <div className="w-full px-3 sm:w-[80%] mr-4 sm:mx-0 mt-24 mb-16 sm:mb-24">
        <h1 className="text-2xl sm:text-3xl text-bleuFonce mb-4">{t("transmissionIndex_titre")}</h1>
        <Link to={"/transmission-create"}>
            <p className="text-sm sm:text-base my-2 sm:my-[1rem]">+ {t("transmissionIndex_create")}</p>
        </Link>

        <div className="overflow-x-auto">
            <table className="w-full divide-y divide-gray-200 bg-[#21283B] rounded-lg">
                <thead>
                    <tr>
                        <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Type</th>
                        <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Action</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {transmissions.map(transmission => (
                        <tr key={transmission.id}>
                            <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-white">{transmission.type[language]}</td>
                            <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                                <Link to={`/transmission-update/${transmission.id}`}
                                    className="bg-[#F96C25] hover:bg-[#868E9B] text-white font-bold py-2 px-3 sm:px-4 rounded-full">
                                    {t("btnEditer")}
                                </Link>
                                <Bouton
                                    onClick={() => handleDeleteTransmission(transmission.id)}
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

export default TransmissionIndex;
