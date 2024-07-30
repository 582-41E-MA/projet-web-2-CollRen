import React from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Confirmation = () => {
  const { i18n } = useTranslation();
  const language = i18n.language; // Obtention de la langue actuelle
  const location = useLocation();
  const { user, voiture, totalWithTax } = location.state || {};
  const modele = voiture?.modele?.type?.[language] || 'Inconnu';
  const constructeur = voiture?.constructeur?.type?.[language] || 'Inconnu';

  console.log('voiture:', voiture);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center">Confirmation de commande</h1>
      <div className="mt-4 p-4 bg-white shadow-md rounded-md">
        <h2 className="text-xl font-semibold">Merci pour votre achat, {user.prenom}!</h2>
        <div className="mt-4">
          <h3 className="text-lg font-medium">Résumé de la commande</h3>
          <div className="mt-2">
            <p><strong>Nom:</strong> {user.prenom} {user.nom}</p>
            <p><strong>Voiture:</strong> {modele} {constructeur}</p>
            <p><strong>Prix total (avec taxes):</strong> ${totalWithTax.toFixed(2)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Confirmation;
