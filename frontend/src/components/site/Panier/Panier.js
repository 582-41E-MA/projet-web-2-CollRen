import React, { createContext, useState, useContext, useEffect } from 'react';
import FormFacture from '../../vente/FormFacture.js';
import FormReservation from '../../reservation/FormReservation'; // Assurez-vous que ce chemin est correct
import './Panier.css';
import { AppContext } from '../../App/App.js';

// Créer le contexte pour le panier
export const PanierContext = createContext();

export const PanierProvider = ({ children }) => {
  const { user } = useContext(AppContext);
  const [panier, setPanier] = useState([]);

  useEffect(() => {
    if (user.isLogged) {
      const panierData = localStorage.getItem(`panier_${user.usager.id}`);
      if (panierData) {
        setPanier(JSON.parse(panierData));
      }
    }
  }, [user]);

  const ajouterAuPanier = (voiture) => {
    const voitureExiste = panier.find(item => item.id === voiture.id);
    if (!voitureExiste) {
      const newPanier = [...panier, voiture];
      setPanier(newPanier);
      localStorage.setItem(`panier_${user.usager.id}`, JSON.stringify(newPanier));
    } else {
      alert('Cette voiture est déjà dans le panier.');
    }
  };

  const supprimerDuPanier = (id) => {
    const updatedPanier = panier.filter((voiture) => voiture.id !== id);
    setPanier(updatedPanier);
    localStorage.setItem(`panier_${user.usager.id}`, JSON.stringify(updatedPanier));
  };

  const viderPanier = () => {
    setPanier([]);
    localStorage.removeItem(`panier_${user.usager.id}`);
  };

  const totalPanier = panier.reduce((total, voiture) => total + voiture.prix, 0);

  return (
    <PanierContext.Provider value={{ panier, ajouterAuPanier, supprimerDuPanier, viderPanier, totalPanier, user }}>
      {children}
    </PanierContext.Provider>
  );
};

// Composant pour afficher le contenu du panier
const Panier = ({ t, user }) => {
  const { panier, supprimerDuPanier, viderPanier, totalPanier } = useContext(PanierContext);
  const [showPopup, setShowPopup] = useState(false); // État pour afficher la popup de facturation
  const [showReservationPopup, setShowReservationPopup] = useState(false); // État pour afficher la popup de réservation
  const [language, setLanguage] = useState(localStorage.getItem("langueChoisie"));
  const userPrivilege = user?.usager?.privilege_id;
  const userId = user?.usager?.id;

  const openPopup = () => {
    setShowPopup(true);
    document.body.classList.add('no-scroll');
  };

  const closePopup = () => {
    setShowPopup(false);
    document.body.classList.remove('no-scroll');
  };

  const openReservationPopup = () => {
    setShowReservationPopup(true);
    document.body.classList.add('no-scroll');
  };

  const closeReservationPopup = () => {
    setShowReservationPopup(false);
    document.body.classList.remove('no-scroll');
  };

  // Assurez-vous que prenom et nom sont disponibles
  const userName = user?.usager?.prenom && user?.usager?.nom 
    ? `${user.usager.prenom} ${user.usager.nom}`
    : 'Nom d\'utilisateur non disponible'; // Nom complet de l'utilisateur ou message par défaut

  return (
    <div className="container mx-auto px-4 py-8 relative">
      <h1 className="text-4xl font-bold mb-6 text-left text-bleuFonce">{t('your_cart')}</h1>
      {panier.length === 0 ? (
        <p className="text-center text-gray-600 text-lg">{t('your_cart_is_empty')}</p>
      ) : (
        <div>
          {/* Affichage conditionnel du nom de l'utilisateur */}
          <h2 className='text-center text-2xl font-semibold mb-8'>{t('my_cart')}</h2>
          <div className='overflow-x-auto'>
            <table className="min-w-full bg-white rounded-lg shadow-md overflow-hidden">
              {/* Table header */}
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('image')}</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('car')}</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('price')}</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('action')}</th>
                </tr>
              </thead>
              {/* Table body */}
              <tbody className="divide-y divide-gray-200">
                {panier.map((voiture) => (
                  <tr key={voiture.id} className="hover:bg-gray-50">
                    <td className="px-4 py-4">
                      {voiture.principaleImage && (
                        <img
                          src={`/imgs/${voiture.principaleImage.chemin}`}
                          alt={voiture.modele?.type?.[language] || ''}
                          className="w-20 h-auto rounded-lg shadow-sm object-cover"
                        />
                      )}
                    </td>
                    <td className="px-4 py-4 text-gray-800">
                      {voiture.modele?.type?.[language] || ''} {voiture.constructeur?.type?.[language] || ''}
                    </td>
                    <td className="px-4 py-4 text-gray-800">{voiture.prix} $</td>
                    <td className="px-4 py-4">
                      <button className="bg-red-500 text-white font-semibold py-1 px-3 rounded hover:bg-red-600 transition" onClick={() => supprimerDuPanier(voiture.id)}>{t('remove')}</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center mt-8">
            <div className="text-2xl font-bold mb-4 md:mb-0">{t('total')} : {totalPanier} $</div>
            <div className="flex space-x-4">
              <button className="bg-red-500 text-white font-semibold py-2 px-4 rounded hover:bg-red-600 transition" onClick={viderPanier}>{t('empty_cart')}</button>
              <button className="bg-green-500 text-white font-semibold py-2 px-4 rounded hover:bg-green-600 transition" onClick={openPopup}>{t('checkout')}</button>
              <button className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 transition" onClick={openReservationPopup}>{t('reserve')}</button>
            </div>
          </div>
          {/* Popup pour le formulaire de facturation */}
          {showPopup && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="h-[80vh] bg-white p-8 rounded-lg shadow-lg w-full max-w-lg relative overflow-auto">
                <FormFacture
                  t={t}
                  userId={userId}
                  totalPanier={totalPanier}
                  panier={panier}
                  userName={userName} 
                />
                <button
                  className="absolute top-4 right-4 text-gray-600 hover:text-red-500 transition"
                  onClick={closePopup}
                >
                  {t('close')}
                </button>
              </div>
            </div>
          )}
          {/* Popup pour le formulaire de réservation */}
          {showReservationPopup && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="h-[80vh] bg-white p-8 rounded-lg shadow-lg w-full max-w-lg relative overflow-auto">
                <FormReservation
                  t={t}
                  userId={userId}
                  panier={panier}
                  userName={userName}
                />
                <button
                  className="absolute top-4 right-4 text-gray-600 hover:text-red-500 transition"
                  onClick={closeReservationPopup}
                >
                  {t('close')}
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
