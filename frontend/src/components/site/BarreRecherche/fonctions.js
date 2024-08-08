import itemExists from './itemExists';

function trimString(s) {
    var l = 0, r = s.length - 1;
    while (l < s.length && s[l] === ' ') l++;
    while (r > l && s[r] === ' ') r -= 1;
    return s.substring(l, r + 1);
}

/**
 * 
 * @param {<array>} ArrOfObjects Je ne sais plus ce que c'est
 * @param {string} toSearch Ce qui est recherché par l'utilisateur
 * @param {array} objetPrincipal Dans quoi effectuer la recherche
 * @param {array} results Le tableau de qu'il reste de l'objet principal une fois enlever ce qui ne contient pas toSearch
 * @returns 
 */
export default function searchFor(ArrOfObjects, toSearch, objetPrincipal, results) {

    
    // Changer la date en format number en format string pour la recherche
    ArrOfObjects[2] = ArrOfObjects[2].toString();
    // nettoyer les strings
    toSearch = trimString(toSearch).toLowerCase();
/**
 * ArrOfObjects => séparation de l'objet Voitures en fonctionalité: modèle, carburant, constructeur etc.
 */
    ArrOfObjects.map((objet) => {
        if (objet.toLowerCase().indexOf(toSearch) !== -1) {

                // Si ce résultat n'est pas déjà là, ajoute-le
                results.indexOf(objetPrincipal) === -1 ? results.push(objetPrincipal) : console.log("This item already exists");
        }
    });
    return results;
}