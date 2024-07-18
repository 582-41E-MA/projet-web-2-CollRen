import React, { createContext, useState, useContext, useEffect } from 'react';
import FormFacture from '../../vente/FormFacture.js';
import './Panier.css';

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
    const voitureExiste = panier.find(item => item.id === voiture.id);
    if (!voitureExiste) {
      const newPanier = [...panier, voiture];
      setPanier(newPanier);
      localStorage.setItem('panier', JSON.stringify(newPanier));
    } else {
      alert('Cette voiture est déjà dans le panier.');
    }
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

  const totalPanier = panier.reduce((total, voiture) => total + voiture.prix, 0);

  return (
    <PanierContext.Provider value={{ panier, ajouterAuPanier, supprimerDuPanier, viderPanier, totalPanier }}>
      {children}
    </PanierContext.Provider>
  );
};

// Composant pour afficher le contenu du panier
const Panier = ({ t, user }) => {
  const { panier, supprimerDuPanier, viderPanier, totalPanier } = useContext(PanierContext);
  const [language, setLanguage] = useState(localStorage.getItem("langueChoisie"));
  const userPrivilege = user.usager.privilege_id;
  const userId = user.usager.id;
  const [showPopup, setShowPopup] = useState(false); // State pour afficher/cacher la popup

  const openPopup = () => {
    setShowPopup(true);
    document.body.classList.add('no-scroll');
  };

  const closePopup = () => {
    setShowPopup(false);
    document.body.classList.remove('no-scroll');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">Votre Panier</h1>
      {panier.length === 0 ? (
        <p className="text-center text-gray-600">Votre panier est vide.</p>
      ) : (
        <div>
          <h2 className='text-center font-bold mb-12'>Mon panier</h2>
          <div className='overflow-x-auto'>
            <table className="min-w-full bg-white rounded-lg shadow-lg overflow-hidden">
              {/* Table header */}
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Voiture</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Prix</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              {/* Table body */}
              <tbody>
                {panier.map((voiture) => (
                  <tr key={voiture.id} className="border-b">
                    <td className="px-6 py-4">
                      {voiture.principaleImage && (
                        <img
                          src={`/imgs/${voiture.principaleImage.chemin}`}
                          alt={voiture.modele?.type?.[language] || ''}
                          className="w-24 h-auto rounded-lg shadow-md object-contain"
                        />
                      )}
                    </td>
                    <td className="px-6 py-4 text-gray-900">
                      {voiture.modele?.type?.[language] || ''} {voiture.constructeur?.type?.[language] || ''}
                    </td>
                    <td className="px-6 py-4 text-gray-900">{voiture.prix} $</td>
                    <td className="px-6 py-4">
                      <button className="bg-red-500 text-white font-bold py-2 px-4 rounded" onClick={() => supprimerDuPanier(voiture.id)}>Supprimer</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex justify-between items-center mt-8">
            <div className="text-2xl font-bold">Total : {totalPanier} $</div>
            <div>
              <button className="bg-red-500 text-white font-bold py-2 px-4 rounded" onClick={viderPanier}>Vider le Panier</button>
              <button className="bg-green-500 text-white font-bold py-2 px-4 rounded ml-4" onClick={openPopup}>Passer à la Caisse</button>
            </div>
          </div>
          {/* Popup pour le formulaire */}
          {showPopup && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white p-8 rounded-md shadow-lg w-full max-w-xl overflow-y-auto popup-content">
                {/* Contenu de la popup */}
                <FormFacture t={t} userId={userId} />
            
                {/* Bouton pour fermer la popup */}
                <button
                  className="absolute top-0 right-0 mt-4 mr-4 text-white hover:text-red-500"
                  onClick={closePopup}
                >
                  Fermer
                </button>
              </div>
            </div>
          
          )}
        </div>
      )}
    </div>
  );
};

export default Panier;
