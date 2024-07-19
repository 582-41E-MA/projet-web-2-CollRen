import React from "react";

export default function filtreRecherche(e, arrayVoitures, results){
   
    let ObjetContientRecherche;
    
    function trimString(s) {
        var l = 0, r = s.length - 1;
        while (l < s.length && s[l] === ' ') l++;
        while (r > l && s[r] === ' ') r -= 1;
        return s.substring(l, r + 1);
    }

    function compareObjects(o1, o2) {
        var k = '';
        for (k in o1) if (o1[k] !== o2[k]) return false;
        for (k in o2) if (o1[k] !== o2[k]) return false;
        return true;
    }

    function itemExists(haystack, needle) {
        for (var i = 0; i < haystack.length; i++) if (compareObjects(haystack[i], needle)) return true;
        return false;
    }

    function searchFor(ArrOfObjects, toSearch, objetPrincipal) {
        // Changer la date en format number en format string pour la recherche
        ArrOfObjects[2] = ArrOfObjects[2].toString();
        toSearch = trimString(toSearch).toLowerCase(); // trim & lower case it
        ArrOfObjects.map((objet) => {
            if (objet.toLowerCase().indexOf(toSearch) !== -1) {
                if (!itemExists(results, objet)) {
                    // Si ce résultat n'est pas déjà là, ajoute-le
                    results.indexOf(objetPrincipal) === -1 ? results.push(objetPrincipal) : console.log("This item already exists");
                }
            }
        });
        return results;
    }
    
    const effectueLaRecherche = (termeRecherche) => {
        console.log(arrayVoitures)
        console.log(termeRecherche)
    if (termeRecherche === "") return [];
        

    for (let i = 0; i < arrayVoitures.length; i++) {
        // Créer un array d'objet pour chacune des catégories dans lesquelles effectuer la recherche
        const elementModele = arrayVoitures[i].modele.type;
        const elementConstructeur = arrayVoitures[i].modele.constructeur.type;
        const elementDateFabrication = arrayVoitures[i].date;

        // Mettre toutes les arrays d'objet dans un tableau pour y faire un map
        const arrayOfElementToSearchIn = [elementModele, elementConstructeur, elementDateFabrication];

        // Enregistrer les objets dans lesquels la recherche à trouver une concordance
        ObjetContientRecherche = searchFor(arrayOfElementToSearchIn, termeRecherche, arrayVoitures[i]);
    }


}

    effectueLaRecherche(e);
    return ObjetContientRecherche;
    

/*     const handleInputChange = (e) => {
        let ObjetContientRecherche = filtreRecherche(e, arrayVoitures, results)
        setArrayResultatRecherche(ObjetContientRecherche);
    }; */

    
}