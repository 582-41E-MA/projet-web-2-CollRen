export default function creerArrayElement(arrayDeVoitures, quoi = 'Constructeurs', language = 'fr') {
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