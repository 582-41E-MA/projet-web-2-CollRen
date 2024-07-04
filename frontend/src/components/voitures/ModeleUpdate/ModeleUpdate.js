import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import MenuDashboardAdmin from '../../dashboards/MenuDashboardAdmin/MenuDashboardAdmin';
import ChampText from '../../partialsFormulaire/ChampText/ChampText';
import Bouton from '../../partialsFormulaire/Bouton/Bouton';

function ModeleUpdate({ t }) {
    const navigate = useNavigate();
    const { id } = useParams();
    const [type, setType] = useState('');
    const [constructeurs, setConstructeurs] = useState([]);
    const [selectedConstructeur, setSelectedConstructeur] = useState('');

    useEffect(() => {
        const fetchConstructeurs = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/constructeurs');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setConstructeurs(data);
            } catch (error) {
                console.error('Error fetching constructeurs:', error);
            }
        };

        const fetchModele = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/modeles/${id}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setType(data.type);
                setSelectedConstructeur(data.constructeur_id);
            } catch (error) {
                console.error('Error fetching modele:', error);
            }
        };

        fetchConstructeurs();
        fetchModele();
    }, [id]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        console.log('Selected Constructeur:', selectedConstructeur); // Log para depuração

        try {
            const response = await fetch(`http://localhost:5000/api/modeles/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ type, constructeur_id: selectedConstructeur })
            });

            if (!response.ok) {
                throw new Error(`Erreur HTTP ! statut : ${response.status}`);
            }

            alert('Modèle mis à jour avec succès !');
            navigate('/model');
        } catch (error) {
            console.error('Erreur lors de la mise à jour du modèle :', error);
            alert('Erreur lors de la mise à jour du modèle. Veuillez réessayer.');
        }
    };

    return (
        <div className="flex">
            <div>
                <MenuDashboardAdmin t={t} />
            </div>

            <div className='flex flex-col '>
                <h1 className="mx-[4rem] mt-24 text-[#21283B] '">{t("modeleUpdate_titre")}</h1>
                <div className="w-[120%] mx-[4rem] mt-12 bg-[#F96C25] rounded-lg">
                    <form onSubmit={handleSubmit} className="p-3 bg-[#21283B] rounded-lg">
                        <div className="mb-3">
                            <ChampText
                                label={t("modeleType_label")}
                                type="text"
                                className="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded"
                                value={type}
                                onChange={(e) => setType(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="constructeur">
                                {t("constructeur_label")}
                            </label>
                            <select
                                id="constructeur"
                                className="block appearance-none w-full bg-white border border-gray-200 text-gray-800 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                value={selectedConstructeur}
                                onChange={(e) => {
                                    console.log('Selected Value:', e.target.value); // Log para depuração
                                    setSelectedConstructeur(e.target.value);
                                }}
                            >
                                <option value="">{t("selectConstructeur")}</option>
                                {constructeurs.map((constructeur) => (
                                    <option key={constructeur.id} value={constructeur.id}>
                                        {constructeur.type}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <Bouton
                            type="submit"
                            className="inline-block align-middle text-center select-none border font-normal whitespace-no-wrap rounded py-1 px-3 leading-normal no-underline bg-blue-600 text-white hover:bg-blue-600"
                        >
                            {t("CreateUser.btnSubmit")}
                        </Bouton>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ModeleUpdate;
