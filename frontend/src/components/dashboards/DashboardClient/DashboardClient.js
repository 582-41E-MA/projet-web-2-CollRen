import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../App/App';
import ChampText from '../../partialsFormulaire/ChampText/ChampText';
import Bouton from '../../partialsFormulaire/Bouton/Bouton';

const DashboardClient = ({ t }) => {
  const { user } = useContext(AppContext); // Agora usamos o contexto para obter os dados do usuário
  const [clientData, setClientData] = useState(null);
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    anniversaire: '',
    adresse: '',
    code_postal: '',
    telephone: '',
    cellulaire: '',
    courriel: '',
    nom_utilisateur: '',

  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchClientData = async () => {
      try {
        const response = await fetch(`${t("fetch")}utilisateurs/${user.usager.id}`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('user-token')}`,
          },
        });
        const data = await response.json();
        if (response.ok) {
          setClientData(data);
          setFormData({
            nom: data.nom,
            prenom: data.prenom,
            anniversaire: data.anniversaire ? formatDateForInput(data.anniversaire) : '',
            adresse: data.adresse || '',
            code_postal: data.code_postal || '',
            telephone: data.telephone || '',
            cellulaire: data.cellulaire || '',
            courriel: data.courriel,
            nom_utilisateur: data.nom_utilisateur,
            mot_de_passe: '',
          });
        } else {
          console.error(data.message);
        }
      } catch (error) {
        console.error('Error fetching client data:', error);
      }
    };

    if (user.isLogged) {
      fetchClientData();
    }
  }, [user.isLogged, user.usager.id]); // Dependências atualizadas para reagir às mudanças em user

  const formatDateForInput = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return '';
    return date.toISOString().split('T')[0];
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const formattedData = {
      ...formData,
      anniversaire: formData.anniversaire ? formData.anniversaire : null,
    };

    try {
      const response = await fetch(`${t("fetch")}utilisateurs/${user.usager.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('user-token')}`,
        },
        body: JSON.stringify(formattedData),
      });
      const data = await response.json();
      if (response.ok) {
        alert('Client data updated successfully');
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Error updating client data:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user-token');
    navigate('/login');
  };

  if (!clientData) return <div>Loading...</div>;

  return (
    <div className='w-full mx-auto max-w-screen-lg px-4 py-6'>
    <h1 className='text-3xl font-bold mb-6 text-center md:text-left'>{t('dashC_salutation')}, {formData.prenom}!</h1>
  
    <div className='flex flex-col md:flex-row md:items-start md:space-x-6'>
      <div className='md:w-1/3 mb-6 md:mb-0 flex flex-col items-center md:items-start'>
        <img src='/imgs/bazou_logo.png' alt='logo Beaux Bazou' className='w-32 h-32 rounded-full mb-4 border-4 border-gray-200 shadow-lg' />
        <p className='text-lg font-semibold text-gray-800'>{formData.prenom} {formData.nom}</p>
      </div>
      <div className='md:w-2/3'>
        <form onSubmit={handleFormSubmit} className='space-y-6'>
          <div className='flex flex-col space-y-4'>
            <ChampText
              label={t('dashC_prenom')}
              type="text"
              name="prenom"
              value={formData.prenom}
              onChange={handleInputChange}
              className='p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
            />
            <ChampText
              label={t('dashC_nom')}
              type="text"
              name="nom"
              value={formData.nom}
              onChange={handleInputChange}
              className='p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
            />
            <ChampText
              label={t('dashC_anniversaire')}
              type="date"
              name="anniversaire"
              value={formData.anniversaire}
              onChange={handleInputChange}
              className='p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
            />
            <ChampText
              label={t('dashC_adresse')}
              type="text"
              name="adresse"
              value={formData.adresse}
              onChange={handleInputChange}
              className='p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
            />
            <ChampText
              label={t('dashC_codePostal')}
              type="text"
              name="code_postal"
              value={formData.code_postal}
              onChange={handleInputChange}
              className='p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
            />
            <ChampText
              label={t('dashC_telephone')}
              type="text"
              name="telephone"
              value={formData.telephone}
              onChange={handleInputChange}
              className='p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
            />
            <ChampText
              label={t('dashC_cellulaire')}
              type="text"
              name="cellulaire"
              value={formData.cellulaire}
              onChange={handleInputChange}
              className='p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
            />
            <ChampText
              label={t('dashC_courriel')}
              type="email"
              name="courriel"
              value={formData.courriel}
              onChange={handleInputChange}
              className='p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
            />
            <ChampText
              label={t('dashC_nom_utilisateur')}
              type="text"
              name="nom_utilisateur"
              value={formData.nom_utilisateur}
              onChange={handleInputChange}
              className='p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
            />
          </div>
          <div className='flex flex-col md:flex-row md:space-x-4'>
            <Bouton type="submit" className='w-full md:w-auto'>{t('Update')}</Bouton>
            <Bouton onClick={handleLogout} className='w-full md:w-auto mt-4 md:mt-0'>{t('Logout')}</Bouton>
          </div>
        </form>
      </div>
    </div>
  </div>
  


  );
};

export default DashboardClient;
