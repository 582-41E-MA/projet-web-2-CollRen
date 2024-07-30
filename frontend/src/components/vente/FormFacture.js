
import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useNavigate } from 'react-router-dom';
import ChampText from '../partialsFormulaire/ChampText/ChampText';
import Bouton from '../partialsFormulaire/Bouton/Bouton';

// Charger Stripe avec votre clé publique
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

function FormFacture({ t, userId, totalPanier, panier, userName }) {
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
  const [message, setMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [paymentData, setPaymentData] = useState({
    payment_method_id: '',
    total: 0,
});


  // console.log("User Name:", userName);

  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  
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

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
        // Stripe.js n'a pas encore chargé
        return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: elements.getElement(CardElement),
    });

    if (error) {
        setErrorMessage(error.message);
        console.error('Stripe error:', error);
        return;
    }

    const { id: payment_method_id } = paymentMethod;

    try {
        const response = await fetch('http://localhost:5000/api/stripe/payment', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({ payment_method_id, total: totalWithTax }),
});


        const result = await response.json();
        console.log('Payment response:', result);

        if (result.success) {
            setMessage('Payment successful!');
            navigate('/confirmation', {
              state: {
                  user,
                  voiture: panier[0],
                  totalWithTax
              }
          });
        } else {
            setErrorMessage(result.error);
        }
    } catch (error) {
        console.error('Erreur lors du paiement:', error);
        setErrorMessage('Paiement echouén veuillez réessayer.');
    }
};


  return (
    <div className="flex">
      <div className="w-full">
      <h2 className="text-center text-xl my-6">Bonjour {user.prenom} </h2>


        <div className="max-w-lg mx-auto bg-white p-8 rounded-md shadow-md">
        {message && <div className="mb-4 p-4 text-green-700 bg-green-100 rounded">{message}</div>}
        {errorMessage && <div className="mb-4 p-4 text-red-700 bg-red-100 rounded">{errorMessage}</div>}
          <form onSubmit={handleSubmit}>
            <h3 className="mt-6 text-lg font-semibold text-left my-4">Informations personnelles</h3>
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
            <div className="my-8 ">
              <h3 className="text-lg font-semibold mb-4">Résumé du Panier</h3>
              <table className="min-w-full bg-white rounded-lg shadow-lg overflow-hidden">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Voiture</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Prix</th>
                  </tr>
                </thead>
                <tbody>
                  {panier.map((voiture) => (
                    <tr key={voiture.id} className="border-b">
                      <td className="px-6 py-4 text-gray-900">
                        {voiture.modele?.type?.[language] || ''} {voiture.constructeur?.type?.[language] || ''}
                      </td>
                      <td className="px-6 py-4 text-gray-900">{voiture.prix} $</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <h3 className="mt-6 text-lg font-semibold text-left">{t("paiement.details")}</h3>
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
