import React from 'react';
import './Filtres.css';
import Bouton from '../../partialsFormulaire/Bouton/Bouton';

function Filtres() {


    // Filtres demandés: constructeur, année, modèle, autres détails généraux


    // Créer les filtres à partir de données dynamique

        // Fetch des voitures


        // Créer les composants pour le formulaire de filtre

            // map constructeurs


            // map modèles



            // map type carburant




    // Créer l'url en fonction des filtres sélectionnés

    // ex. modele_id=1&datemin=1999
    // ex. ?modele_id=27&transmission_id=1&motopropulseur_id=1&carburant_id=1&corp_id=2
    // ex. 
    

    function handleClick(){
        console.log(handleClick);
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
                <div>
                    <label className="block text-gray-700 font-bold mb-2">Marque</label>
                    <select className="block w-full p-2 border border-gray-300 rounded-md">
                        <option value="">Toutes</option>
                        <option value="Toyota">Toyota</option>
                        <option value="Honda">Honda</option>
                        <option value="Ford">Ford</option>
                        <option value="BMW">BMW</option>
                    </select>
                </div>
                <div>
                    <label className="block text-gray-700 font-bold mb-2">Modèle</label>
                    <input type="text" className="block w-full p-2 border border-gray-300 rounded-md" placeholder="Modèle" />
                </div>
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
