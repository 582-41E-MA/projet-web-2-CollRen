import React, { createContext, useState, useContext, useEffect } from 'react';
import FormFacture from '../../vente/FormFacture';

// Créer le contexte pour le panier
export const PanierContext = createContext();

export const PanierProvider = ({ children }) => {
  const [panier, setPanier] = useState([]);

  useEffect(() => {
    const panierData = localStorage.getItem('panier');
    if (panierData) {
      setPanier(JSON.parse(panierData));
    }
  }, []);

  const ajouterAuPanier = (voiture) => {
    const newPanier = [...panier, voiture];
    setPanier(newPanier);
    localStorage.setItem('panier', JSON.stringify(newPanier));
  };

  const supprimerDuPanier = (id) => {
    const updatedPanier = panier.filter((voiture) => voiture.id !== id);
    setPanier(updatedPanier);
    localStorage.setItem('panier', JSON.stringify(updatedPanier));
  };

  const viderPanier = () => {
    setPanier([]);
    localStorage.removeItem('panier');
  };

  return (
    <PanierContext.Provider value={{ panier, ajouterAuPanier, supprimerDuPanier, viderPanier }}>
      {children}
    </PanierContext.Provider>
  );
};

// Composant pour afficher le contenu du panier
const Panier = ({t, user}) => {
  const { panier, supprimerDuPanier, viderPanier } = useContext(PanierContext);
  const [language, setLanguage] = useState(localStorage.getItem("langueChoisie"));
  const userPrivilege = user.usager.privilege_id;
  const userId = user.usager.id;
 

  return (
    <div className="container mx-auto px-4 py-8">

      <h1 className="text-4xl font-bold mb-4">Votre Panier</h1>
      {panier.length === 0 ? (
        <p>Votre panier est vide.</p>
      ) : (
        <div>
          <h2 className='text-center font-bold mb-12'>Mon panier</h2>
          <div className='flex'>
            <FormFacture t={t} userId={userId}/>
            <ul>
              {panier.map((voiture) => (
                <li key={voiture.id} className="flex justify-between items-center mb-4">
                  <div className='flex w-full justify-between'>
                    {voiture.principaleImage && (
                      <div className="mb-8 w-1/4">
                        <img
                          src={'/imgs/${voiture.principaleImage.chemin'}
                          alt={voiture.modele?.type?.[language] || ''}
                          className="w-full h-auto rounded-lg shadow-lg object-contain"
                          style={{ maxHeight: "200px" }}
                        />
                      </div>
                    )}
                    <div className="mb-8 w-1/2"><span className='text-left'>{voiture.modele?.type?.[language] || ''} {voiture.constructeur?.type?.[language] || ''} - {voiture.prix} $</span></div>
                    <div><button className="bg-red-500 text-white font-bold py-2 px-4 rounded" onClick={() => supprimerDuPanier(voiture.id)}>Supprimer</button></div>
                  </div>
                </li>
              ))}
            </ul>
            <button className="bg-red-500 text-white font-bold py-2 px-4 rounded mt-4" onClick={viderPanier}>Vider le Panier</button>
            <button className="bg-green-500 text-white font-bold py-2 px-4 rounded mt-4 ml-4">Passer à la Caisse</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Panier;