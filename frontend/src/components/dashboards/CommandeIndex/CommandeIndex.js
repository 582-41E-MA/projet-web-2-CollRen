import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import MenuDashboardAdmin from '../../dashboards/MenuDashboardAdmin/MenuDashboardAdmin';
import Bouton from '../../partialsFormulaire/Bouton/Bouton';
import BarreRecherche from '../../site/BarreRecherche/BarreRecherche';

function CommandeIndex({ t, changeLanguage }) {
    const [commandes, setCommandes] = useState([]);
    const [voitures, setVoitures] = useState([]);
    const [utilisateurs, setUtilisateurs] = useState([]);
    const [statuts, setStatuts] = useState([]);
    const [language, setLanguage] = useState(localStorage.getItem('langueChoisie'));
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

    // Utilisé pour récupérer les données dès que le composant est monté
    useEffect(() => {
        const fetchCommandes = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/commandes');
                if (!response.ok) {
                    throw new Error(`Erreur HTTP! statut: ${response.status}`);
                }
                const data = await response.json();
                setCommandes(data);
            } catch (error) {
                console.error('Erreur lors de la récupération des commandes:', error);
            }
        };

        const fetchVoitures = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/voitures');
                if (!response.ok) {
                    throw new Error(`Erreur HTTP! statut: ${response.status}`);
                }
                const data = await response.json();
                setVoitures(data);
            } catch (error) {
                console.error('Erreur lors de la récupération des voitures:', error);
            }
        };

        const fetchUtilisateurs = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/utilisateurs');
                if (!response.ok) {
                    throw new Error(`Erreur HTTP! statut: ${response.status}`);
                }
                const data = await response.json();
                setUtilisateurs(data);
            } catch (error) {
                console.error('Erreur lors de la récupération des utilisateurs:', error);
            }
        };

        const fetchStatuts = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/statuts');
                if (!response.ok) {
                    throw new Error(`Erreur HTTP! statut: ${response.status}`);
                }
                const data = await response.json();
                setStatuts(data);
            } catch (error) {
                console.error('Erreur lors de la récupération des statuts:', error);
            }
        };

        fetchCommandes();
        fetchVoitures();
        fetchUtilisateurs();
        fetchStatuts();
    }, [t]);

    // Pour ajuster la langue selon le stockage local
    useEffect(() => {
        const storedLanguage = localStorage.getItem('langueChoisie') || '';
        setLanguage(storedLanguage);
    }, [changeLanguage]);

    // Récupère l'utilisateur basé sur l'identifiant utilisateur
    const getUtilisateurById = (utilisateurId) => {
        const utilisateur = utilisateurs.find(u => u.id === utilisateurId);
        return utilisateur ? `${utilisateur.nom} ${utilisateur.prenom}` : '';
    };

    // Récupère le statut basé sur l'identifiant du statut
    const getStatutById = (statutId) => {
        if (statutId === 1) {
            return 'Reservé';
        } else if (statutId === 2) {
            return 'Vendu';
        } else {
            const statut = statuts.find(s => s.id === statutId);
            return statut ? statut.type[language] : '';
        }
    };

    // Récupère l'ID de la voiture liée à la commande
    const getVoitureIdByCommandeId = (commandeId) => {
        const voiture = voitures.find(v => v.commande_id === commandeId);
        return voiture ? voiture.id : 'Aucune voiture';
    };

    // Gère le tri des colonnes
    const handleSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    // Trie les commandes selon la configuration actuelle
    const sortedCommandes = [...commandes].sort((a, b) => {
        if (sortConfig.key) {
            let aValue, bValue;

            if (sortConfig.key === 'id') {
                aValue = a.id;
                bValue = b.id;
            } else if (sortConfig.key === 'voiture') {
                aValue = getVoitureIdByCommandeId(a.id);
                bValue = getVoitureIdByCommandeId(b.id);
            } else if (sortConfig.key === 'client') {
                aValue = getUtilisateurById(a.utilisateur_id);
                bValue = getUtilisateurById(b.utilisateur_id);
            } else if (sortConfig.key === 'statut') {
                aValue = getStatutById(a.statut_id);
                bValue = getStatutById(b.statut_id);
            }

            if (sortConfig.direction === 'asc') {
                return aValue > bValue ? 1 : -1;
            } else {
                return aValue < bValue ? 1 : -1;
            }
        }
        return 0;
    });

    // Gère la suppression d'une commande
    const handleDeleteCommande = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/api/commandes/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error(`Erreur HTTP! statut: ${response.status}`);
            }
    
            const updatedCommandes = commandes.filter(commande => commande.id !== id);
            setCommandes(updatedCommandes);
    
            alert('Commande supprimée avec succès!');
        } catch (error) {
            console.error('Erreur lors de la suppression de la commande:', error);
            alert('Erreur lors de la suppression de la commande. Veuillez réessayer.');
        }
    };

    return (
        <main className="flex flex-wrap">
            <div className='flex'>
                <MenuDashboardAdmin t={t} />
            </div>

            <div className="w-[70%] mt-24 px-4 sm:px-6 lg:px-8 flex flex-col items-center">
                <h1 className='text-[#182036] mb-8 text-center text-2xl sm:text-3xl'>{t("commandeIndex_titre")}</h1>

                <BarreRecherche t={t} />

                <div className='overflow-x-auto w-full'>
                    <table className="w-full sm:w-5/6 lg:w-4/5 divide-y divide-gray-200 bg-[#21283B] mt-4 rounded-lg mb-16 mx-auto">
                        <thead>
                                <th className="px-2 py-2 sm:px-6 sm:py-3 text-left text-xs sm:text-sm font-large text-gray-500 uppercase tracking-wider cursor-pointer"
                                    onClick={() => handleSort('id')}>
                                    <span className={sortConfig.key === 'id' ? 'font-bold' : ''}>
                                        Commande Id {sortConfig.key === 'id' ? (sortConfig.direction === 'asc' ? '▲' : '▼') : '⇅'}
                                    </span>
                                </th>
                                <th className="px-2 py-2 sm:px-6 sm:py-3 text-left text-xs sm:text-sm font-large text-gray-500 uppercase tracking-wider cursor-pointer"
                                    onClick={() => handleSort('voiture')}>
                                    <span className={sortConfig.key === 'voiture' ? 'font-bold' : ''}>
                                        Voiture {sortConfig.key === 'voiture' ? (sortConfig.direction === 'asc' ? '▲' : '▼') : '⇅'}
                                    </span>
                                </th>
                                <th className="px-2 py-2 sm:px-6 sm:py-3 text-left text-xs sm:text-sm font-large text-gray-500 uppercase tracking-wider cursor-pointer"
                                    onClick={() => handleSort('client')}>
                                    <span className={sortConfig.key === 'client' ? 'font-bold' : ''}>
                                        Client {sortConfig.key === 'client' ? (sortConfig.direction === 'asc' ? '▲' : '▼') : '⇅'}
                                    </span>
                                </th>
                                <th className="px-2 py-2 sm:px-6 sm:py-3 text-left text-xs sm:text-sm font-large text-gray-500 uppercase tracking-wider cursor-pointer"
                                    onClick={() => handleSort('statut')}>
                                    <span className={sortConfig.key === 'statut' ? 'font-bold' : ''}>
                                        Statut {sortConfig.key === 'statut' ? (sortConfig.direction === 'asc' ? '▲' : '▼') : '⇅'}
                                    </span>
                                </th>
                                <th className="px-2 py-2 sm:px-6 sm:py-3 text-left text-xs sm:text-sm font-large text-gray-500 uppercase tracking-wider">
                                    Action
                                </th>
                        </thead>
                        <tbody className="bg-[#21283B] divide-y divide-gray-200">
                            {sortedCommandes.map(commande => (
                                <tr key={commande.id}>
                                    <td className="px-2 py-2 sm:px-4 sm:py-2 whitespace-nowrap text-white">{commande.id}</td>
                                    <td className="px-2 py-2 sm:px-4 sm:py-2 whitespace-nowrap text-white">{getVoitureIdByCommandeId(commande.id)}</td> {/* Affiche l'ID de la voiture liée */}
                                    <td className="px-2 py-2 sm:px-4 sm:py-2 whitespace-nowrap text-white">{getUtilisateurById(commande.utilisateur_id)}</td>
                                    <td className="px-2 py-2 sm:px-4 sm:py-2 whitespace-nowrap text-white">{getStatutById(commande.statut_id)}</td>
                                    <td className="px-2 py-2 sm:px-4 sm:py-2 whitespace-nowrap">
                                        <Link to={`/commande-update/${commande.id}`} className="bg-[#F96C25] hover:bg-[#868E9B] text-white font-bold py-1 sm:py-2 px-2 sm:px-4 rounded-full mr-2">
                                            {t("btnEditer")}
                                        </Link>
                                        <Bouton onClick={() => handleDeleteCommande(commande.id)}>
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

export default CommandeIndex;
