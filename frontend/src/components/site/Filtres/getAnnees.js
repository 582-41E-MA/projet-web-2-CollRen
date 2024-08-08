/**
  * 
  * @param {array} voitures 
  * @returns array des dates unique de fabrication
  */
export default function getAnnees(voitures = []) {
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