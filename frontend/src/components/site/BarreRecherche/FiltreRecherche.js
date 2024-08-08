import React from "react";
import searchFor from './fonctions';

export default function filtreRecherche(e, arrayVoitures, results = [], language = 'fr') {

    let ObjetContientRecherche

    const effectueLaRecherche = (termeRecherche) => {

        if (termeRecherche === "") return [];


        for (let i = 0; i < arrayVoitures.length; i++) {
            // Créer un array d'objet pour chacune des catégories dans lesquelles effectuer la recherche
            const elementModele = arrayVoitures[i].modele.type;
            const elementConstructeur = arrayVoitures[i].modele.constructeur.type;
            const elementDateFabrication = arrayVoitures[i].date;


            let arrayOfElementToSearchIn = [elementModele, elementConstructeur, elementDateFabrication];
            if (arrayVoitures[i].commande != null) {
                const elementStatutJson = JSON.parse(arrayVoitures[i].commande.statut.type)
                const elementStatut = elementStatutJson[language]
                arrayOfElementToSearchIn.push(elementStatut)
            }

            // Mettre toutes les arrays d'objet dans un tableau pour y faire un map

            // Enregistrer les objets dans lesquels la recherche à trouver une concordance
            ObjetContientRecherche = searchFor(arrayOfElementToSearchIn, termeRecherche, arrayVoitures[i], results);
        }
    }
    effectueLaRecherche(e);
    return ObjetContientRecherche;
}