import React from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const ConfirmationReservation = () => {
  const { i18n } = useTranslation();
  const language = i18n.language; // Obtention de la langue actuelle
  const location = useLocation();
  const { user, voiture} = location.state || {};
  const modele = voiture?.modele?.type?.[language] || 'Inconnu';
  const constructeur = voiture?.constructeur?.type?.[language] || 'Inconnu';


  return (
    <div className="container mx-auto p-6 min-h-screen mt-24">
      <h1 className="text-3xl font-extrabold text-center text-gray-800 mb-6">Confirmation de commande de reservation</h1>
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-md mx-auto">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Merci pour votre achat, {user.prenom}!</h2>
        <div className="border-t border-gray-200 pt-4">
          <h3 className="text-xl font-medium text-gray-600 mb-2">Résumé de la reservation</h3>
          <div className="space-y-2">
            <p className="text-gray-800"><strong>Nom:</strong> {user.prenom} {user.nom}</p>
            <p className="text-gray-800"><strong>Voiture:</strong> {modele} {constructeur}</p>
          </div>
        </div>
        <div className="mt-6 text-center">
          <a href="/" className="text-blue-500 hover:underline">Retourner à l'accueil</a>
        </div>
      </div>
    </div>
  );
}

export default ConfirmationReservation;
