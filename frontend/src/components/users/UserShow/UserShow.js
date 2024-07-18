import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ChampText from '../../partialsFormulaire/ChampText/ChampText';
import MenuDashboardAdmin from '../../dashboards/MenuDashboardAdmin/MenuDashboardAdmin';
import Bouton from '../../partialsFormulaire/Bouton/Bouton';

function UserShow({ t }) {
  const { id } = useParams();
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
    province_id: '',
    nom_utilisateur: '',
    privilege_type: '' // Assuming you will get this from the API response
  });

  const [villes, setVilles] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [privileges, setPrivileges] = useState([]);
  const [language, setLanguage] = useState(localStorage.getItem('langueChoisie'));

  useEffect(() => {
    // Fetch user data
    fetch(`${t("fetch")}utilisateurs/${id}`)
      .then(response => response.json())
      .then(data => {
        setUser({
          ...data,
          province_id: data.ville.province_id, // Assumindo que a API retorna isso
          privilege_type: JSON.parse(data.privilege.type)[language] // Transforming string into object
        });
      })
      .catch(error => {
        console.error("There was an error fetching the user!", error);
      });

    // Fetch villes data
    fetch(`${t("fetch")}villes`)
      .then(response => response.json())
      .then(data => {
        const updatedData = data.map(item => ({
          ...item,
          nom: JSON.parse(item.nom)
        }));
        setVilles(updatedData);
      })
      .catch(error => {
        console.error("There was an error fetching the villes!", error);
      });

    // Fetch provinces data
    fetch(`${t("fetch")}provinces`)
      .then(response => response.json())
      .then(data => {
        const updatedData = data.map(item => ({
          ...item,
          nom: JSON.parse(item.nom)
        }));
        setProvinces(updatedData);
      })
      .catch(error => {
        console.error("There was an error fetching the provinces!", error);
      });

    // Fetch privileges data
    fetch(`${t("fetch")}privileges`)
      .then(response => response.json())
      .then(data => {
        const updatedData = data.map(item => ({
          ...item,
          type: JSON.parse(item.type)
        }));
        setPrivileges(updatedData);
      })
      .catch(error => {
        console.error("There was an error fetching the privileges!", error);
      });

  }, [id, t, language]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser(prevState => ({
      ...prevState,
      [name]: value
    }));

    if (name === 'province_id') {
      setUser(prevState => ({
        ...prevState,
        ville_id: '' // Reset ville when province changes
      }));
    } else if (name === 'ville_id') {
      const selectedVille = villes.find(ville => ville.id === parseInt(value));
      if (selectedVille) {
        setUser(prevState => ({
          ...prevState,
          province_id: selectedVille.province_id // Update province when ville changes
        }));
      }
    }
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    fetch(`${t("fetch")}utilisateurs/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })
      .then(response => response.json())
      .then(data => {
        alert(data.message);
      })
      .catch(error => {
        console.error("There was an error updating the user!", error);
      });
  };

  const handleDelete = () => {
    fetch(`${t("fetch")}utilisateurs/${id}`, {
      method: 'DELETE',
    })
      .then(response => response.json())
      .then(data => {
        alert(data.message);
      })
      .catch(error => {
        console.error("There was an error deleting the user!", error);
      });
  };

  const filteredVilles = villes.filter(ville => ville.province_id === parseInt(user.province_id));

  return (
    <div className="flex">
        <div>
            <MenuDashboardAdmin t={t}/>
        </div>
    
      <div className="flex flex-col w-full mx-[3rem] mt-24 mb-[4rem] ">

        <h1 className='text-[#21283B] text-left mb-[2rem]'>{t("user.EditTitle")}</h1>
        <form className="w-[65%] mx-0 bg-[#21283B] p-8 rounded-md shadow-md mb-[4rem]" onSubmit={handleUpdate}>
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label className="block text-sm text-white font-medium ">{t("user.prenom")}</label>
              <ChampText
                type="text"
                name="prenom"
                value={user.prenom}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm text-white font-medium ">{t("user.nom")}</label>
              <ChampText
                type="text"
                name="nom"
                value={user.nom}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white">{t("user.nom_utilisateur")}</label>
              <ChampText
                type="text"
                name="nom_utilisateur"
                value={user.nom_utilisateur}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white">{t("user.anniversaire")}</label>
              <ChampText
                type="date"
                name="anniversaire"
                value={user.anniversaire}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white">{t("user.courriel")}</label>
              <ChampText
                type="email"
                name="courriel"
                value={user.courriel}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white">{t("user.adresse")}</label>
              <ChampText
                type="text"
                name="adresse"
                value={user.adresse}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white">{t("user.codepostal")}</label>
              <ChampText
                type="text"
                name="code_postal"
                value={user.code_postal}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white">{t("user.telephone")}</label>
              <ChampText
                type="text"
                name="telephone"
                value={user.telephone}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white">{t("user.cellulaire")}</label>
              <ChampText
                type="text"
                name="cellulaire"
                value={user.cellulaire}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white">{t("user.province")}</label>
              <select
                name="province_id"
                value={user.province_id}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              >
                <option value="">{t("user.selectprovince")}</option>
                {provinces.map(province => (
                  <option key={province.id} value={province.id}>
                    {province.nom[language]}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-white">{t("user.ville")}</label>
              <select
                name="ville_id"
                value={user.ville_id}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              >
                <option value="">{t("user.selectville")}</option>
                {filteredVilles.map(ville => (
                  <option key={ville.id} value={ville.id}>
                    {ville.nom[language]}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-white">{t("user.privilege")}</label>
              <select
                name="privilege_type"
                value={user.privilege_type}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              >
                <option value="">{t("user.selectprivilege")}</option>
                {privileges.map(privilege => (
                  <option key={privilege.id} value={privilege.id}>
                    {privilege.type[language]}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="mt-6 flex justify-end">
            <Bouton
              type="submit"
              className="px-4 py-2 font-medium text-white bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:shadow-outline-blue active:bg-blue-600 transition duration-150 ease-in-out"
            >
              Update
            </Bouton>
            <Bouton
              type="button"
              onClick={handleDelete}
              className="ml-2 px-4 py-2 font-medium text-white bg-red-600 rounded-md hover:bg-red-500 focus:outline-none focus:shadow-outline-red active:bg-red-600 transition duration-150 ease-in-out"
            >
              Delete
            </Bouton>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UserShow;