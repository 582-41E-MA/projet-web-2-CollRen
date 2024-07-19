import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import ChampText from '../partialsFormulaire/ChampText/ChampText';
import Bouton from '../partialsFormulaire/Bouton/Bouton';

// Charger Stripe avec votre clé publique
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

function FormFacture({ t, userId, totalPanier }) {
  const [user, setUser] = useState({
    prenom: '',
    nom: '',
    anniversaire: '',
    courriel: '',
    adresse: '',
    code_postal: '',
    telephone: '',
    cellulaire: '',
    ville_id: '',
    province_id: ''
  });

  const [villes, setVilles] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [taxes, setTaxes] = useState([]);
  const [filteredVilles, setFilteredVilles] = useState([]);
  const [language, setLanguage] = useState(localStorage.getItem('langueChoisie'));
  const [totalWithTax, setTotalWithTax] = useState(totalPanier);
  const [taxName, setTaxName] = useState('');
  const [tauxTaxe, setTaxRate] = useState(0);

  useEffect(() => {
    if (userId) {
      fetch(`${t("fetch")}utilisateurs/${userId}`)
        .then(response => response.json())
        .then(data => {
          setUser({
            ...data,
            province_id: data.ville ? data.ville.province_id : ''
          });
        })
        .catch(error => {
          console.error("There was an error fetching the user!", error);
        });
    }
  
    fetch(`${t("fetch")}villes`)
      .then(response => response.json())
      .then(data => {
        const updatedData = data.map(item => ({
          ...item,
          nom: typeof item.nom === 'string' ? JSON.parse(item.nom) : item.nom
        }));
        setVilles(updatedData);
      })
      .catch(error => {
        console.error("There was an error fetching the villes!", error);
      });
  
    fetch(`${t("fetch")}provinces`)
      .then(response => response.json())
      .then(data => {
        const updatedData = data.map(item => ({
          ...item,
          nom: typeof item.nom === 'string' ? JSON.parse(item.nom) : item.nom
        }));
        setProvinces(updatedData);
      })
      .catch(error => {
        console.error("There was an error fetching the provinces!", error);
      });
  
    fetch(`${t("fetch")}taxes`)
      .then(response => response.json())
      .then(data => {
        const updatedData = data.map(item => ({
          ...item,
          taux: parseFloat(item.taux) || 0
        }));
        setTaxes(updatedData);
      })
      .catch(error => {
        console.error("There was an error fetching the taxes!", error);
      });
  
  }, [userId, t]);

  useEffect(() => {
    if (user.province_id) {
      const filtered = villes.filter(ville => ville.province_id === parseInt(user.province_id));
      setFilteredVilles(filtered);

      const tax = taxes.find(tax => tax.province_id === parseInt(user.province_id));
      if (tax) {
        const taxAmount = totalPanier * (tax.taux);
        const tauxTaxe = (tax.taux) * 100;
        setTotalWithTax(totalPanier + taxAmount);
        setTaxName(tax.type);
        setTaxRate(tauxTaxe);
      } else {
        setTotalWithTax(totalPanier);
        setTaxName('');
        setTaxRate(0);
      }
    } else {
      setFilteredVilles(villes);
      setTotalWithTax(totalPanier);
      setTaxName('');
      setTaxRate(0);
    }
  }, [user.province_id, villes, taxes, totalPanier]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser(prevState => ({
      ...prevState,
      [name]: value
    }));

    if (name === 'ville_id') {
      const selectedVille = villes.find(ville => ville.id === parseInt(value));
      if (selectedVille) {
        setUser(prevState => ({
          ...prevState,
          province_id: selectedVille.province_id
        }));
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted with total including tax:", totalWithTax);
  };

  return (
    <div className="flex">
      <div className="w-full">
        <h2 className="text-center text-xl my-6">Veuillez entrer vos coordonnées pour compléter l'achat</h2>

        <div className="max-w-lg mx-auto bg-white p-8 rounded-md shadow-md">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">{t("user.prenom")}</label>
                <ChampText
                  type="text"
                  name="prenom"
                  value={user.prenom}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">{t("user.nom")}</label>
                <ChampText
                  type="text"
                  name="nom"
                  value={user.nom}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">{t("user.anniversaire")}</label>
                <ChampText
                  type="date"
                  name="anniversaire"
                  value={user.anniversaire}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">{t("user.courriel")}</label>
                <ChampText
                  type="email"
                  name="courriel"
                  value={user.courriel}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">{t("user.adresse")}</label>
                <ChampText
                  type="text"
                  name="adresse"
                  value={user.adresse}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">{t("user.codepostal")}</label>
                <ChampText
                  type="text"
                  name="code_postal"
                  value={user.code_postal}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">{t("user.telephone")}</label>
                <ChampText
                  type="text"
                  name="telephone"
                  value={user.telephone}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">{t("user.cellulaire")}</label>
                <ChampText
                  type="text"
                  name="cellulaire"
                  value={user.cellulaire}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">{t("user.province")}</label>
                <select
                  name="province_id"
                  value={user.province_id}
                  onChange={handleChange}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                >
                  <option value="">{t("selectionner")}</option>
                  {provinces.map(province => (
                    <option key={province.id} value={province.id}>
                      {province.nom[language]}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">{t("user.ville")}</label>
                <select
                  name="ville_id"
                  value={user.ville_id}
                  onChange={handleChange}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                >
                  <option value="">{t("selectionner")}</option>
                  {filteredVilles.map(ville => (
                    <option key={ville.id} value={ville.id}>
                      {ville.nom[language]}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="text-right mt-8 mb-6">
              <h3 className="text-lg font-medium text-gray-700">Total: <strong>{totalPanier} $</strong></h3>
              <h3 className="text-lg font-medium text-gray-700 mt-6">Taxe: <strong>{taxName}</strong> : <strong>{tauxTaxe}%</strong></h3>
              <h3 className="text-lg font-medium text-gray-700 mt-6">Total TTC : <strong>{totalWithTax} $</strong></h3>
            </div>

            <div className="mt-6">
              <Elements stripe={stripePromise}>
                <CheckoutForm totalWithTax={totalWithTax} />
              </Elements>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

function CheckoutForm({ totalWithTax }) {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);  // Ajoutez cet état pour suivre le succès du paiement

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);
    setError(null);
    setSuccess(null);  // Réinitialiser l'état de succès

    const cardElement = elements.getElement(CardElement);

    const { error: stripeError, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (stripeError) {
      setError(stripeError.message);
      setIsProcessing(false);
      return;
    }

    try {
      const response = await fetch('/api/stripe/payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: Math.round(totalWithTax * 100), // Montant en centimes
          currency: 'usd',
          source: paymentMethod.id,
          description: 'Achat de véhicule',
        }),
      });

      const result = await response.json();

      if (result.success) {
        setSuccess('Paiement réussi!');  // Mettez à jour l'état de succès
      } else {
        setError('Erreur de paiement.');
      }
    } catch (error) {
      setError('Erreur lors du traitement du paiement.');
    }

    setIsProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      {error && <div className="error">{error}</div>}
      {success && <div className="success">{success}</div>} 
      <button
        type="submit"
        disabled={isProcessing}
        className="px-4 py-2 font-medium text-white bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:shadow-outline-blue active:bg-blue-600 transition duration-150 ease-in-out"
      >
        {isProcessing ? 'Processing...' : 'Payer'}
      </button>
    </form>
  );
}

export default FormFacture;
