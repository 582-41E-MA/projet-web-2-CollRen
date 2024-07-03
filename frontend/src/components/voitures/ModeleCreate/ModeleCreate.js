import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import MenuDashboardAdmin from '../../dashboards/MenuDashboardAdmin/MenuDashboardAdmin';
import ChampText from '../../partialsFormulaire/ChampText/ChampText';
import Bouton from '../../partialsFormulaire/Bouton/Bouton';

function ModeleCreate({ t }) {
    const navigate = useNavigate();
    const [type, setType] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch(`http://localhost:5000/api/models`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ type })
            });

            if (!response.ok) {
                throw new Error(`Erreur HTTP ! statut : ${response.status}`);
            }

            alert('Modèle créé avec succès !');
            navigate('/model'); 
        } catch (error) {
            console.error('Erreur lors de la création du modèle :', error);
            alert('Erreur lors de la création du modèle. Veuillez réessayer.');
        }
    };

   
    return (
        <div className="flex">
            <div>
                <MenuDashboardAdmin t={t} />
            </div>

            <div className='flex flex-col '> 
                <h2 className="mx-[4rem] mt-24">{t("modeleCreate_titre")}</h2>
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

export default ModeleCreate;
