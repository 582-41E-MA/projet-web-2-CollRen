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
  const [expeditions, setExpeditions] = useState([]);
  const [modePaiements, setModePaiements] = useState([]);
  const [selectedExpedition, setSelectedExpedition] = useState('');
  const [selectedModePaiement, setSelectedModePaiement] = useState('');


  const stripe = useStripe();
  const elements = useElements();

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
          taux: parseFloat(item.taux) || 0,
          type: typeof item.type === 'string' ? JSON.parse(item.type) : item.type
        }));
        setTaxes(updatedData);
      })
      .catch(error => {
        console.error("There was an error fetching the taxes!", error);
      });

      fetch(`${t("fetch")}expeditions`)
      .then(response => response.json())
      .then(data => {
        const updatedData = data.map(item => ({
          ...item,
          type: typeof item.type === 'string' ? JSON.parse(item.type) : item.type
        }));
        setExpeditions(updatedData);
      })
      .catch(error => {
        console.error("There was an error fetching the expeditions!", error);
      });

    fetch(`${t("fetch")}mode_paiements`)
      .then(response => response.json())
      .then(data => {
        const updatedData = data.map(item => ({
          ...item,
          type: typeof item.type === 'string' ? JSON.parse(item.type) : item.type
        }));
        setModePaiements(updatedData);
      })
      .catch(error => {
        console.error("There was an error fetching the mode de paiements!", error);
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
        setTaxName(tax.type[language]); // Utiliser la langue pour obtenir le nom de la taxe
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
  }, [user.province_id, villes, taxes, totalPanier, language]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      console.error("Stripe.js has not yet loaded.");
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
      billing_details: {
        name: `${user.prenom} ${user.nom}`,
        email: user.courriel,
        address: {
          line1: user.adresse,
          postal_code: user.code_postal
        },
        phone: user.telephone
      }
    });

    if (error) {
      console.error("Payment Error:", error);
      return;
    }

    // Envoyer les données au serveur
    const response = await fetch(`${t("fetch")}stripe/payment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        payment_method_id: paymentMethod.id,
        user: user,
        total: totalWithTax,
        expedition: selectedExpedition,
        mode_paiement: selectedModePaiement
      })
    });

    const result = await response.json();
    if (response.ok) {
      console.log('Payment successful:', result);
    } else {
      console.error('Payment failed:', result);
    }
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
                  className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
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
                  className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                >
                  <option value="">{t("selectionner")}</option>
                  {filteredVilles.map(ville => (
                    <option key={ville.id} value={ville.id}>
                      {ville.nom[language]}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">{t("expedition")}</label>
                <select
                  value={selectedExpedition}
                  onChange={e => setSelectedExpedition(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                >
                  <option value="">{t("select_expedition")}</option>
                  {expeditions.map(expedition => (
                    <option key={expedition.id} value={expedition.id}>
                      {expedition.type[language]}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">{t("payment_method")}</label>
                <select
                  value={selectedModePaiement}
                  onChange={e => setSelectedModePaiement(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                >
                  <option value="">{t("select_payment_method")}</option>
                  {modePaiements.map(mode => (
                    <option key={mode.id} value={mode.id}>
                      {mode.type[language]}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <h3 className="mt-6 text-lg font-semibold text-center">{t("paiement.details")}</h3>
            <div className="border-t border-gray-200 pt-6">
              <CardElement className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
            </div>
            <div className="mt-8 text-right">
              <p className="text-lg">{t("panier.total")}: {totalPanier.toFixed(2)} $</p>
              {taxName && (
                <p className="text-sm text-gray-600 my-3">
                  {t("taxes.incluses")}: {taxName} ({tauxTaxe.toFixed(2)} %)
                </p>
              )}
              <p className="text-lg">{t("total")}: {totalWithTax.toFixed(2)} $</p>
              <button
                type="submit"
                className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                {t("pay_now")}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default function WrappedFormFacture(props) {
  return (
    <Elements stripe={stripePromise}>
      <FormFacture {...props} />
    </Elements>
  );
}
