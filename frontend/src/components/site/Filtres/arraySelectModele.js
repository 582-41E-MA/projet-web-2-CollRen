/**
     * 
     * @param {array} voituresDeCeConstructeur 
     * @param {*} modelesConstructeurs 
     * @returns 
     */
export default function arraySelectModeles(voituresDeCeConstructeur, modelesConstructeurs = []) {
    let lesModelesDeCeConstructeurSont = []

    for (let i = 0; i < voituresDeCeConstructeur.length; i++) {

        // Créer un array d'objet pour chacune des catégories dans lesquelles effectuer la recherche
        const elementModele = voituresDeCeConstructeur[i].modele.type;

        //Envoyer tous les objets Modèles des voitures de ce constructeur
        if (lesModelesDeCeConstructeurSont.indexOf(elementModele) === -1) {

            lesModelesDeCeConstructeurSont.push(elementModele)
            modelesConstructeurs.push(voituresDeCeConstructeur[i].modele)
        }

    }
    return modelesConstructeurs
}