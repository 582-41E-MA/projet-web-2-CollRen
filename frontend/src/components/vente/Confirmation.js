import React from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Confirmation = () => {
  const {t} = useTranslation();

  const { i18n } = useTranslation();
  const language = i18n.language; // Obtention de la langue actuelle
  const location = useLocation();
  const { user, voiture, totalWithTax } = location.state || {};
  const modele = voiture?.modele?.type?.[language] || 'Inconnu';
  const constructeur = voiture?.constructeur?.type?.[language] || 'Inconnu';


  return (
    <div className="container mx-auto p-6 min-h-screen mt-24">
      <h1 className="text-3xl font-extrabold text-center text-gray-800 mb-6">{t('confirmation.order')}</h1>
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-md mx-auto">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">{t('confirmation.thank_you')}, {user.prenom}!</h2>
        <div className="border-t border-gray-200 pt-4">
          <h3 className="text-xl font-medium text-gray-600 mb-2">{t('confirmation.order_summary')}</h3>
          <div className="space-y-2">
            <p className="text-gray-800"><strong>{t('confirmation.name')}:</strong> {user.prenom} {user.nom}</p>
            <p className="text-gray-800"><strong>{t('confirmation.car')}:</strong> {modele} {constructeur}</p>
            <p className="text-gray-800"><strong>{t("total_price_with_taxes")}</strong> ${totalWithTax.toFixed(2)}</p>
          </div>
        </div>
        <div className="mt-6 text-center">
          <a href="/" className="text-blue-500 hover:underline">{t('confirmation.return_home')}</a>
        </div>
      </div>
    </div>
  );
}

export default Confirmation;
