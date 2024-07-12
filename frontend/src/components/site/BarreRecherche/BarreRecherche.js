
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import Bouton from '../../partialsFormulaire/Bouton/Bouton';
import ChampText from '../../partialsFormulaire/ChampText/ChampText.js';
import './Recherche.css';
import AfficherResultats from './AfficheResultat.js';

function BarreRecherche(props) {
    let t = props.t;
    let results = []
    let affichage;
    let updatedData;


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


    function trimString(s) {
        var l = 0, r = s.length - 1;
        while (l < s.length && s[l] == ' ') l++;
        while (r > l && s[r] == ' ') r -= 1;
        return s.substring(l, r + 1);
    }

    function compareObjects(o1, o2) {
        var k = '';
        for (k in o1) if (o1[k] != o2[k]) return false;
        for (k in o2) if (o1[k] != o2[k]) return false;
        return true;
    }

    function itemExists(haystack, needle) {

        for (var i = 0; i < haystack.length; i++) if (compareObjects(haystack[i], needle)) return true;
        return false;
    }

    function searchFor(ArrOfObjects, toSearch, objetPrincipal) {

        console.log(toSearch)

        toSearch = trimString(toSearch).toLowerCase(); // trim & lower case it
        ArrOfObjects.map((objet) => {


            if (objet.toLowerCase().indexOf(toSearch) != -1) {

                if (!itemExists(results, objet)) {
                    // Si ce résultat n'est pas déjà là, ajoute-le
                    results.indexOf(objetPrincipal) === -1 ? results.push(objetPrincipal) : console.log("This item already exists")
                }
            }

            if (objet.toLowerCase().indexOf(toSearch) != -1) {

                if (!itemExists(results, objet)) {
                    // Si ce résultat n'est pas déjà là, ajoute-le
                    results.indexOf(objetPrincipal) === -1 ? results.push(objetPrincipal) : console.log("This item already exists")
                }
            }


        })
        return results;
    }

    const handleInputChange = async (e) => {
        e.preventDefault();
        let termeRecherche = e.target[0].value;
        if (termeRecherche == []) return []
        let ObjetContientRecherche;

        for (let i = 0; i < arrayVoitures.length; i++) {

            // Créer un array d'objet pour chacune des catégories dans lesquelles effectuer la recherche
            const elementModele = arrayVoitures[i].modele.type;
            const elementConstructeur = arrayVoitures[i].modele.constructeur.type;
            console.log(elementModele);
            console.log(elementConstructeur);


            // Mettre toutes les arrays d'objet dans un tableau pour y faire un map
            const arrayOfElementToSearchIn = [elementModele, elementConstructeur]

            // Enregistrer les objets dans lesquels la recherche à trouver une concordance
            ObjetContientRecherche = searchFor(arrayOfElementToSearchIn, termeRecherche, arrayVoitures[i])
        }

        setArrayResultatRecherche(ObjetContientRecherche);

    };

    // Faire apparaître les résultats sous la barre de recherche après l'entré de 2 caratères minimum

    // 1. Vérification: est-ce le résultat attendu ? --> oui à date
    if (arrayResultatRecherche !== undefined) {


        affichage = <AfficherResultats t={t} voitures={arrayResultatRecherche} language={language} ></AfficherResultats>


    } else {
        // console.log('=>Faux => arrayResultatRecherche !== undefined')
    }

    // 2. Créer le html de l'affichage des résultats


    // 3. À chaque changement de "arrayResultatRecherche" useEffect pour ajuster l'affichage des résultats

    useEffect(() => {

        return () => {
        }
    }, [arrayResultatRecherche])



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
}
export default BarreRecherche;
