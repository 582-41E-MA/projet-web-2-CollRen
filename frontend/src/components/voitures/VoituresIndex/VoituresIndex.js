import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import MenuDashboardAdmin from '../../dashboards/MenuDashboardAdmin/MenuDashboardAdmin';
import Bouton from '../../partialsFormulaire/Bouton/Bouton';
import BarreRecherche from '../../site/BarreRecherche/BarreRecherche';

function VoitureIndex({ t, changeLanguage }) {
    const [voitures, setVoitures] = useState([]);
    const [modeles, setModeles] = useState([]);
    const [language, setLanguage] = useState(localStorage.getItem('langueChoisie'));
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

    useEffect(() => {
        const fetchVoitures = async () => {
            try {
                const response = await fetch(`${t("fetch")}voitures`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();

                const parseJSONSafely = (str) => {
                    try {
                        return JSON.parse(str);
                    } catch (e) {
                        console.error('JSON parse error:', e);
                        return { en: str, fr: str };
                    }
                };

                const updatedData = data.map(item => ({
                    ...item,
                    carburant: { ...item.carburant, type: parseJSONSafely(item.carburant.type) },
                    constructeur: { ...item.modele.constructeur, type: item.modele.constructeur.type },
                    corp: { ...item.corp, type: parseJSONSafely(item.corp.type) },
                    description: parseJSONSafely(item.description),
                    modele: { ...item.modele, type: item.modele.type },
                    motopropulseur: { ...item.motopropulseur, type: parseJSONSafely(item.motopropulseur.type) },
                    transmission: { ...item.transmission, type: parseJSONSafely(item.transmission.type) },
                }));

                setVoitures(updatedData);

                // Fetch images for each voiture
                await fetchImagesForVoitures(updatedData);
            } catch (error) {
                console.error('Error fetching voitures:', error);
            }
        };

        const fetchModeles = async () => {
            try {
                const response = await fetch(`${t("fetch")}modeles`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setModeles(data);
            } catch (error) {
                console.error('Error fetching modeles:', error);
            }
        };

        fetchVoitures();
    }, [language, t]);

    useEffect(() => {
        const storedLanguage = localStorage.getItem('langueChoisie') || '';
        setLanguage(storedLanguage);
    }, [changeLanguage]);

    const fetchImagesForVoitures = async (voitures) => {
        try {
            const fetchImagePromises = voitures.map(async (voiture) => {
                const response = await fetch(`${t("fetch")}images?voiture_id=${voiture.id}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const images = await response.json();
            });

            await Promise.all(fetchImagePromises);
        } catch (error) {
            console.error('Error fetching images:', error);
        }
    };

    const handleDeleteVoiture = async (id) => {
        try {
            const response = await fetch(`${t("fetch")}voitures/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const updatedVoitures = voitures.filter(voiture => voiture.id !== id);
            setVoitures(updatedVoitures);

            alert('Voiture supprimée avec succès!');
        } catch (error) {
            console.error('Error deleting voiture:', error);
            alert('Error deleting voiture. Please try again.');
        }
    };

    const getConstructeurType = (modeleId) => {
        const modele = modeles.find(m => m.id === modeleId);
        return modele ? modele.constructeur.type : '';
    };

    const handleSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    const sortedVoitures = [...voitures].sort((a, b) => {
        if (sortConfig.key) {
            let aValue, bValue;

            if (sortConfig.key === 'prix' || sortConfig.key === 'date') {
                aValue = a[sortConfig.key];
                bValue = b[sortConfig.key];
            } else if (sortConfig.key === 'constructeur') {
                aValue = getConstructeurType(a.modele_id);
                bValue = getConstructeurType(b.modele_id);
            } else if (sortConfig.key === 'modele') {
                aValue = a.modele.type;
                bValue = b.modele.type;
            } else {
                aValue = a[sortConfig.key]?.type ? a[sortConfig.key].type[language] : a[sortConfig.key];
                bValue = b[sortConfig.key]?.type ? b[sortConfig.key].type[language] : b[sortConfig.key];
            }

            if (sortConfig.direction === 'asc') {
                return aValue > bValue ? 1 : -1;
            } else {
                return aValue < bValue ? 1 : -1;
            }
        }
        return 0;
    });

    return (
        <main className="flex">
            <div>
                <MenuDashboardAdmin t={t} />
            </div>

            <div className="w-full mx-4 mt-24">

                <BarreRecherche t={t} />

                <h1 className='text-[#182036]'>{t("voitureIndex_titre")}</h1>

                <Link to={"/voiture-create"}>
                    <p className='my-4'>+ {t("voitureIndex_create")}</p>
                </Link>

                <div className='overflow-x-auto'>
                    <table className="w-full divide-y divide-gray-200 bg-[#21283B] mt-4 rounded-lg mb-[4rem]">
                        <thead>
                            <tr>
                                <th
                                    className="px-6 py-3 text-left text-xs font-large text-gray-500 uppercase tracking-wider cursor-pointer"
                                    onClick={() => handleSort('date')}
                                >
                                    <span className={sortConfig.key === 'date' ? 'font-bold' : ''}>
                                        Date {sortConfig.key === 'date' ? (sortConfig.direction === 'asc' ? '▲' : '▼') : '⇅'}
                                    </span>
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-large text-gray-500 uppercase tracking-wider">Description</th>
                                <th
                                    className="px-6 py-3 text-left text-xs font-large text-gray-500 uppercase tracking-wider cursor-pointer"
                                    onClick={() => handleSort('prix')}
                                >
                                    <span className={sortConfig.key === 'prix' ? 'font-bold' : ''}>
                                        {t("voituretableau_Prix")} {sortConfig.key === 'prix' ? (sortConfig.direction === 'asc' ? '▲' : '▼') : '⇅'}
                                    </span>
                                </th>
                                <th
                                    className="px-6 py-3 text-left text-xs font-large text-gray-500 uppercase tracking-wider cursor-pointer"
                                    onClick={() => handleSort('modele')}
                                >
                                    <span className={sortConfig.key === 'modele' ? 'font-bold' : ''}>
                                        {t("voituretableau_Modele")} {sortConfig.key === 'modele' ? (sortConfig.direction === 'asc' ? '▲' : '▼') : '⇅'}
                                    </span>
                                </th>
                                <th
                                    className="px-6 py-3 text-left text-xs font-large text-gray-500 uppercase tracking-wider cursor-pointer"
                                    onClick={() => handleSort('constructeur')}
                                >
                                    <span className={sortConfig.key === 'constructeur' ? 'font-bold' : ''}>
                                        {t("voituretableau_Constructeur")} {sortConfig.key === 'constructeur' ? (sortConfig.direction === 'asc' ? '▲' : '▼') : '⇅'}
                                    </span>
                                </th>
                                <th
                                    className="px-6 py-3 text-left text-xs font-large text-gray-500 uppercase tracking-wider cursor-pointer"
                                    onClick={() => handleSort('transmission')}
                                >
                                    <span className={sortConfig.key === 'transmission' ? 'font-bold' : ''}>
                                        {t("voituretableau_Transmission")} {sortConfig.key === 'transmission' ? (sortConfig.direction === 'asc' ? '▲' : '▼') : '⇅'}
                                    </span>
                                </th>
                                <th
                                    className="px-6 py-3 text-left text-xs font-large text-gray-500 uppercase tracking-wider cursor-pointer"
                                    onClick={() => handleSort('motopropulseur')}
                                >
                                    <span className={sortConfig.key === 'motopropulseur' ? 'font-bold' : ''}>
                                        {t("voituretableau_Motopropulseur")} {sortConfig.key === 'motopropulseur' ? (sortConfig.direction === 'asc' ? '▲' : '▼') : '⇅'}
                                    </span>
                                </th>
                                <th
                                    className="px-6 py-3 text-left text-xs font-large text-gray-500 uppercase tracking-wider cursor-pointer"
                                    onClick={() => handleSort('carburant')}
                                >
                                    <span className={sortConfig.key === 'carburant' ? 'font-bold' : ''}>
                                        {t("voituretableau_Carburant")} {sortConfig.key === 'carburant' ? (sortConfig.direction === 'asc' ? '▲' : '▼') : '⇅'}
                                    </span>
                                </th>
                                <th
                                    className="px-6 py-3 text-left text-xs font-large text-gray-500 uppercase tracking-wider cursor-pointer"
                                    onClick={() => handleSort('corp')}
                                >
                                    <span className={sortConfig.key === 'corp' ? 'font-bold' : ''}>
                                        {t("voituretableau_Corps")} {sortConfig.key === 'corp' ? (sortConfig.direction === 'asc' ? '▲' : '▼') : '⇅'}
                                    </span>
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-large text-gray-500 uppercase tracking-wider">Action</th>
                            </tr>
                        </thead>
                        <tbody className="bg-[#21283B] divide-y divide-gray-200">
                            {sortedVoitures.map(voiture => (
                                <tr key={voiture.id}>
                                    <td className="px-4 py-2 whitespace-nowrap text-white">{voiture.date}</td>
                                    <td className="px-4 py-2 text-white break-words"> {voiture.description[language]}</td>
                                    <td className="px-4 py-2 whitespace-nowrap text-white">{voiture.prix}</td>
                                    <td className="px-4 py-2 whitespace-nowrap text-white">{voiture.modele.type}</td>
                                    <td className="px-4 py-2 whitespace-nowrap text-white">{voiture.modele.constructeur.type}</td>
                                    <td className="px-4 py-2 whitespace-nowrap text-white">{voiture.transmission.type[language]}</td>
                                    <td className="px-4 py-2 whitespace-nowrap text-white">{voiture.motopropulseur.type[language]}</td>
                                    <td className="px-4 py-2 whitespace-nowrap text-white">{voiture.carburant.type[language]}</td>
                                    <td className="px-4 py-2 whitespace-nowrap text-white">{voiture.corp.type[language]}</td>
                                    <td className="px-4 py-2 whitespace-nowrap">
                                        <Link to={`/voiture-update/${voiture.id}`} className="bg-[#F96C25] hover:bg-[#868E9B] text-white font-bold py-2 px-4 rounded-full mr-2">
                                            {t("btnEditer")}
                                        </Link>
                                        <Bouton onClick={() => handleDeleteVoiture(voiture.id)}>
                                            {t("btnDeleter")}
                                        </Bouton>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </main>
    );
}

export default VoitureIndex;
