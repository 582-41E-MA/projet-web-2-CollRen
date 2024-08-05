// ConstructeurCreate.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import MenuDashboardAdmin from '../../dashboards/MenuDashboardAdmin/MenuDashboardAdmin';
import ChampText from '../../partialsFormulaire/ChampText/ChampText';
import Bouton from '../../partialsFormulaire/Bouton/Bouton';

function ConstructeurCreate({ t }) {
    const navigate = useNavigate();
    const [constructeurType, setConstructeurType] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch(`${t("fetch")}constructeurs`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ type: constructeurType })
            });

            if (!response.ok) {
                throw new Error(`Erreur HTTP ! statut : ${response.status}`);
            }

            alert('Constructeur créé avec succès !');
            navigate('/constructeur');
        } catch (error) {
            console.error('Erreur lors de la création du constructeur :', error);
            alert('Erreur lors de la création du constructeur. Veuillez réessayer.');
        }
    };

    return (
        <div className="flex flex-wrap">
    <div className="w-full sm:w-auto">
        <MenuDashboardAdmin t={t} />
    </div>

    <div className='flex flex-col w-full sm:w-[80%] mx-4 sm:mx-[4rem] mb-16 sm:mb-[4rem]'>
        <h2 className="text-2xl sm:text-3xl text-bleuFonce mt-24 mb-6">{t("constructeurCreate_titre")}</h2>

        <div className=" rounded-lg ">
            <form onSubmit={handleSubmit} className="p-6 bg-[#21283B] rounded-lg">
                <div className="mb-4">
                    <ChampText
                        label={t("constructeurType_label")}
                        type="text"
                        className="block appearance-none w-full py-2 px-3 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded"
                        value={constructeurType}
                        onChange={(e) => setConstructeurType(e.target.value)}
                    />
                </div>
                <Bouton
                    type="submit"
                    className="inline-block align-middle text-center select-none border font-normal whitespace-no-wrap rounded py-2 px-4 bg-blue-600 text-white hover:bg-blue-700"
                >
                    {t("btnSubmit")}
                </Bouton>
            </form>
        </div>
    </div>
</div>

    );
}

export default ConstructeurCreate;
