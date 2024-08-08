import './Filtres.css';
import React, { useEffect, useState } from 'react';
import Bouton from '../../partialsFormulaire/Bouton/Bouton';
import SelectOptions from '../../partialsFormulaire/SelectOptions/SelectOptions';
import filtreRecherche from '../BarreRecherche/FiltreRecherche';

function Filtres({ t, changeLanguage, arrayVoitures, arrayVoituresImuable, handleSetVoitures }) {
    const [anneesFabrication, setAnneesFabrication] = useState([]);
    const [statutsVoiture, setStatutsVoiture] = useState([]);
    const [arrayAEnvoyer, setArrayAEnvoyer] = useState([]);
    const [constructeurs, setConstructeurs] = useState([]);
    const [modelesConstructeurs, setModelesConstructeurs] = useState([]);
    const [voituresConstructeurs, setVoituresConstructeurs] = useState([]);
    const [language, setLanguage] = useState(localStorage.getItem('langueChoisie'));
    const labelModele = 'Modèles';
    const labelConstructeur = 'Constructeurs';
    const labelAnnee = 'Années';
    const labelStatuts = 'Status';
    const [leFiltreDesConstructeurs, setLeFiltreDesConstructeurs] = useState('');
    const [leFiltreDesModeles, setLeFiltreDesModeles] = useState('');
    const [leFiltreDesAnnees, setLeFiltreDesAnnees] = useState('');
    const [leFiltreDesStatus, setLeFiltreDesStatus] = useState('');
    let results = []

    function setFiltres(e) {
        let nomFiltre = e.target.attributes[1].value
        let valeur = e.target.value

        // Assigne une valeur à chacun des filtre
        switch (nomFiltre) {
            case 'Constructeurs': {
                setModelesConstructeurs([])
                setLeFiltreDesConstructeurs(valeur)
                setLeFiltreDesModeles('Modèles')
            }

                break;
            case 'Modèles': {
                setLeFiltreDesModeles(valeur)
            }

                break;
            case 'Années': setLeFiltreDesAnnees(valeur)

                break;

            case 'Status': {
                setLeFiltreDesStatus(valeur)
                // reset()
            }

                break;

            default:
                break;
        }
    }

    /**
     * 
     * @param {array} voitures 
     * @returns array des dates unique de fabrication
     */
    function getAnnees(voitures = []) {
        let anneeFabrication = []
        for (let i = 0; i < voitures.length; i++) {
            const elementAnnee = voitures[i].date;
            //Créer tableau de toutes les années, unique, pour le Select Annéees

            if (anneeFabrication.indexOf(elementAnnee) === -1) {

                anneeFabrication.push(elementAnnee)
            }
        }
        return anneeFabrication.sort();
    }

    function appliquerFiltreModele(e, arrayVoitures) {
        results = []
        let objetCeModele = filtreRecherche(e, arrayVoitures)
        return objetCeModele
    }

    async function fetchConstructeurs() {
        try {
            const response = await fetch(`${t("fetch")}constructeurs`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setConstructeurs(creerArrayElement(arrayVoituresImuable))
        } catch (error) {
            console.error('Error fetching constructeurs:', error);
        }
    }

    useEffect(() => {
        setConstructeurs(creerArrayElement(arrayVoituresImuable))
    }, [arrayVoituresImuable, anneesFabrication])


    function creerArrayElement(arrayDeVoitures, quoi = 'Constructeurs') {
        let array = []

        for (let i = 0; i < arrayDeVoitures.length; i++) {
            let element = ''
            // Créer un array d'objet pour chacune des catégories dans lesquelles effectuer la recherche
            if (quoi == 'Constructeurs') {
                element = arrayDeVoitures[i].modele.constructeur.type;
            } else if (quoi == 'Statuts' && arrayDeVoitures[i].commande != null) {

                const elementStatutJson = JSON.parse(arrayDeVoitures[i].commande.statut.type)
                element = elementStatutJson[language]
            }


            //Envoyer tous les objets Modèles des voitures de ce constructeur
            if (array.indexOf(element) === -1 && element != '') {
                array.push(element)
            }
        }
        return array
    }

    function arraySelectModeles(voituresDeCeConstructeur, modelesConstructeurs = []) {
        let lesModelesDeCeConstructeurSont = []

        for (let i = 0; i < voituresDeCeConstructeur.length; i++) {

            // Créer un array d'objet pour chacune des catégories dans lesquelles effectuer la recherche
            const elementModele = voituresDeCeConstructeur[i].modele.type;

            //Envoyer tous les objets Modèles des voitures de ce constructeur
            if (lesModelesDeCeConstructeurSont.indexOf(elementModele) === -1) {

                lesModelesDeCeConstructeurSont.push(elementModele)
                modelesConstructeurs.push(voituresDeCeConstructeur[i].modele)
            }
            setAnneesFabrication(getAnnees(voituresDeCeConstructeur
            ))
        }
        return modelesConstructeurs
    }


    useEffect(() => {
        arrayVoitures = arrayVoituresImuable
        fetchConstructeurs()

        const storedLanguage = localStorage.getItem('langueChoisie') || ''
        setLanguage(storedLanguage)
    }, [changeLanguage, language, t]);


    //!SECTION Passer tous les filtres actif
    useEffect(() => {
        arrayVoitures = arrayVoituresImuable

        console.log(arrayVoitures)
        //ANCHOR - Constructeurs inactif
        if (leFiltreDesConstructeurs == 'Constructeurs') {
            setVoituresConstructeurs(arrayVoitures)
            setModelesConstructeurs([])
        }


        if (leFiltreDesModeles != '' && leFiltreDesConstructeurs != '' && leFiltreDesModeles != 'Modèles') {
            arrayVoitures = appliquerFiltreModele(leFiltreDesModeles, arrayVoitures)
        }

        //ANCHOR - Années
        if (leFiltreDesAnnees != 'Années' && leFiltreDesAnnees != '') {

            // Si réinitialisé, on remet tous les modèles de ce constructeur
            // setModelesConstructeurs(filtreRecherche(leFiltreDesAnnees, arrayVoitures, results))
            results = []
            arrayVoitures = filtreRecherche(leFiltreDesAnnees, arrayVoitures, results)
            setModelesConstructeurs(arraySelectModeles(arrayVoitures))
        }
        console.log(arrayVoitures)
        console.log(leFiltreDesStatus)
        //ANCHOR - Statut
        if (leFiltreDesStatus != '' && leFiltreDesStatus != 'Status' ) {
            arrayVoitures = appliquerFiltreModele(leFiltreDesStatus, arrayVoitures)
        }

        //ANCHOR - Constructeurs ACTIF
        if (leFiltreDesConstructeurs != '' && leFiltreDesConstructeurs != 'Constructeurs') {

            arrayVoitures = filtreRecherche(leFiltreDesConstructeurs, arrayVoitures, results, language)

            if (leFiltreDesModeles == 'Modèles') {

                // Montage de l'array pour le Select des modèles selon ce constructeur.
                setVoituresConstructeurs(arrayVoitures)
                if (voituresConstructeurs != []) {
                    console.log(arrayVoitures)
                    setModelesConstructeurs(arraySelectModeles(arrayVoitures))
                }
            }
        }

        //!SECTION Passer par touts les filtre
        setAnneesFabrication(getAnnees(arrayVoitures))
        setStatutsVoiture(creerArrayElement(arrayVoitures, 'Statuts'))


        //LINK - Fin gestion des filtres, on envoie le tableau travaillé
        setArrayAEnvoyer(arrayVoitures)
    }, [leFiltreDesConstructeurs, leFiltreDesModeles, leFiltreDesAnnees, leFiltreDesStatus])


    // Envoyer le nouvel array de voitures au composant Catalogue
    useEffect(() => {
        handleSetVoitures(arrayAEnvoyer)
    }, [arrayAEnvoyer])

    // Affecter au bouton de réinitialisation
    const reinitialiser = () => {
        setLeFiltreDesConstructeurs('Constructeurs')
        setConstructeurs([])
        setStatutsVoiture([])
        setModelesConstructeurs([])
        setAnneesFabrication([])
        setLeFiltreDesModeles([])
        setLeFiltreDesAnnees('')
        setLeFiltreDesStatus('')
        fetchConstructeurs()
    }

    const reset = () => {
        setModelesConstructeurs([])
        setAnneesFabrication([])
        setLeFiltreDesModeles([])
        setLeFiltreDesAnnees('')
    }

    return (
        <div className="bg-white p-4 rounded-lg shadow-md mb-8 mt-12">
            <h2 className="text-2xl font-bold mb-4">Filtres</h2>
            <div className="flex flex-col gap-4">
                <SelectOptions list={constructeurs} whenChanged={setFiltres} itemAFiltrer={labelConstructeur} arrayVoitures={arrayVoitures} ></SelectOptions>
                <SelectOptions list={modelesConstructeurs} whenChanged={setFiltres} itemAFiltrer={labelModele} arrayVoitures={arrayVoitures} ></SelectOptions>
                <SelectOptions list={anneesFabrication} whenChanged={setFiltres} itemAFiltrer={labelAnnee} arrayVoitures={arrayVoitures} ></SelectOptions>
                <SelectOptions list={statutsVoiture} whenChanged={setFiltres} itemAFiltrer={labelStatuts} arrayVoitures={arrayVoitures} ></SelectOptions>
                <div>
                    <Bouton type="" onClick={reinitialiser}>Réinitialiser</Bouton>
                </div>
            </div>
        </div>
    );
}
export default Filtres;
