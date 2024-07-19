import { useNavigate, useLocation } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import Bouton from '../../partialsFormulaire/Bouton/Bouton';
import ChampText from '../../partialsFormulaire/ChampText/ChampText.js';
import './Recherche.css';
import AfficherResultats from './AfficheResultat.js';
import filtreRecherche from './FiltreRecherche.js';

function BarreRecherche(props) {
    let t = props.t;
    let results = []
    let affichage;
    let updatedData;
    const location = useLocation();

    const [language, setLanguage] = useState(localStorage.getItem('langueChoisie'));
    const [arrayResultatRecherche, setArrayResultatRecherche] = useState([]);
    const [arrayVoitures, setArrayVoitures] = useState([]);

    useEffect(() => {
        const setDataVoitures = async () => {
            try {
                const response = await fetch(`${t("fetch")}voitures`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                console.log(data);
                
                const parseJSONSafely = (str) => {
                    try {
                        return JSON.parse(str);
                    } catch (e) {
                        console.error('JSON parse error:', e);
                        return { en: str, fr: str };
                    }
                };

                // Baser la recherche sur le constructeur, l'année et le modèle seulement
                // Retourner les résultats, lien vers page avec prix, description et photos
                updatedData = data.map(item => ({
                    ...item,
                    //modele: { ...item.modele, type: parseJSONSafely(item.modele.type) },
                }));

                setArrayVoitures(data);

            } catch (error) {
                console.error('Error fetching voitures:', error);
            }
        };
        setDataVoitures();
    }, [language]);


 

    const handleInputChange = async (e) => {
        e.preventDefault();
        let termeRecherche = e.target[0].value;
        let ObjetContientRecherche = filtreRecherche(termeRecherche, arrayVoitures, results)
        setArrayResultatRecherche(ObjetContientRecherche)
    };

    affichage = <AfficherResultats t={t} voitures={arrayResultatRecherche} language={language} location={location.pathname }></AfficherResultats>;

    if (location.pathname === "/") {
        return (
            <div className="form-container-recherche w-full h-full bg-white p-6 rounded-lg shadow-md">
            <h1 className="text-4xl font-titre font-bold mb-4">{t("barreRecheche.titre")}</h1>
            <form onSubmit={handleInputChange} className='form-inner'>
            <ChampText type="text" name="termeRecherche" placeholder={t("barreRecheche.placeHolder")} className="mb-4" />
            <div className="flex justify-center">
                <Bouton type="submit" className="bg-orange text-white px-4 py-2 rounded-md shadow-md">{t("barreRecheche.titre")}</Bouton>
            </div>
            </form>
            {affichage ? affichage : ''}
        </div>
        );
    } else if (location.pathname === "/voitures") {
        return (
            <div className="form-container-recherche w-[80%] bg-white mb-[4rem] rounded-lg shadow-md">
                <form onSubmit={handleInputChange} className="flex items-center justify-center w-full p-3">
                    <input type="text" name="termeRecherche" placeholder={t("barreRecheche.placeHolder")} className="flex-grow m-4 p-3 rounded-lg" />
                    <Bouton type="submit" className="bg-orange text-white px-2 rounded-md shadow-md">{t("barreRecheche.titre")}</Bouton>
                </form>
            {arrayResultatRecherche.length > 0 && affichage}
        </div>
        
        );
    } else {
        return null;
    }
}

export default BarreRecherche;
