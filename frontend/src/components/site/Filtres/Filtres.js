import './Filtres.css';
import React, { useEffect, useState } from 'react';
import Bouton from '../../partialsFormulaire/Bouton/Bouton';
import SelectOptions from '../../partialsFormulaire/SelectOptions/SelectOptions';
import filtreRecherche from '../BarreRecherche/FiltreRecherche';



function Filtres({ t, changeLanguage, arrayVoitures, handleSetVoitures }) {
    const [voitures, setVoitures] = useState([]);
    const [modeles, setModeles] = useState([]);
    const [constructeurs, setConstructeurs] = useState([]);
    const [language, setLanguage] = useState(localStorage.getItem('langueChoisie'));
    const labelModele = 'Modèles';
    const labelConstructeur = 'Constructeurs';
    let results = []

    useEffect(() => {

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


        const fetchConstructeurs = async () => {
            try {
                const response = await fetch(`${t("fetch")}constructeurs`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setConstructeurs(data);
            } catch (error) {
                console.error('Error fetching constructeurs:', error);
            }
        };


        fetchModeles();
        fetchConstructeurs();
    }, [language, t]);

    useEffect(() => {
        const storedLanguage = localStorage.getItem('langueChoisie') || '';
        setLanguage(storedLanguage);
    }, [changeLanguage]);



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
    
    function setUrl(e) {


        /**
         * Utilise la barre de recherche pour recevoir le nom d'un modèle ou d'une marque
         * @return array contenant les voitures
         * 
         */
        let ObjetContientRecherche = filtreRecherche(e, arrayVoitures, results)
        handleSetVoitures(ObjetContientRecherche)


        // Renvoyer le tableau contenant les voitures après filtrage
        //handleSetVoitures(arrayvoitureFiltrees)
    }

    return (
        <div className="bg-white p-4 rounded-lg shadow-md mb-8 mt-12">
            <h2 className="text-2xl font-bold mb-4">Filtres</h2>
            <div className="flex flex-col gap-4">
                <div>
                    <label className="block text-gray-700 font-bold mb-2">Type de carburant</label>
                    <select className="block w-full p-2 border border-gray-300 rounded-md">
                        <option value="">Tous</option>
                        <option value="Essence">Essence</option>
                        <option value="Diesel">Diesel</option>
                        <option value="Electrique">Électrique</option>
                        <option value="Hybride">Hybride</option>
                    </select>
                </div>


                <SelectOptions list={constructeurs} whenChanged={setUrl} itemAFiltrer={labelConstructeur} arrayVoitures={arrayVoitures} ></SelectOptions>
                <SelectOptions list={modeles} whenChanged={setUrl} itemAFiltrer={labelModele} arrayVoitures={arrayVoitures} ></SelectOptions>
                    
                <div>
                    <label className="block text-gray-700 font-bold mb-2">Année</label>
                    <input type="number" className="block w-full p-2 border border-gray-300 rounded-md" placeholder="Année" />
                </div>
                <div>
                    <label className="block text-gray-700 font-bold mb-2">Prix</label>
                    <input type="number" className="block w-full p-2 border border-gray-300 rounded-md" placeholder="Prix maximum" />
                </div>
                <div>
                    <label className="block text-gray-700 font-bold mb-2">Motopropulseur</label>
                    <select className="block w-full p-2 border border-gray-300 rounded-md">
                        <option value="">Tous</option>
                        <option value="FWD">FWD (Traction)</option>
                        <option value="RWD">RWD (Propulsion)</option>
                        <option value="AWD">AWD (Intégrale)</option>
                        <option value="4WD">4WD (4 roues motrices)</option>
                    </select>
                </div>
                <div>
                    <label className="block text-gray-700 font-bold mb-2">Corps</label>
                    <select className="block w-full p-2 border border-gray-300 rounded-md">
                        <option value="">Tous</option>
                        <option value="Sedan">Sedan</option>
                        <option value="SUV">SUV</option>
                        <option value="Hatchback">Hatchback</option>
                        <option value="Coupe">Coupe</option>
                    </select>
                </div>
                <div>
                    <label className="block text-gray-700 font-bold mb-2">Transmission</label>
                    <select className="block w-full p-2 border border-gray-300 rounded-md">
                        <option value="">Toutes</option>
                        <option value="Automatique">Automatique</option>
                        <option value="Manuelle">Manuelle</option>
                    </select>
                </div>
                <div>
                    <Bouton type="">Filtrer</Bouton>
                    
                </div>
            </div>
        </div>
    );
}

export default Filtres;
