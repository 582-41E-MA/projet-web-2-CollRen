// ConstructeurUpdate.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import MenuDashboardAdmin from '../../dashboards/MenuDashboardAdmin/MenuDashboardAdmin';
import ChampText from '../../partialsFormulaire/ChampText/ChampText';
import Bouton from '../../partialsFormulaire/Bouton/Bouton';

function ConstructeurUpdate({ t }) {
    const { id } = useParams();
    const [constructeurType, setConstructeurType] = useState('');

    useEffect(() => {
        const fetchConstructeur = async () => {
            try {
                const response = await fetch(`${t("fetch")}constructeurs/${id}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setConstructeurType(data.type);
            } catch (error) {
                console.error('Error fetching constructeur:', error);
            }
        };

        fetchConstructeur();
    }, [id]);

    const handleChange = (event) => {
        const { value } = event.target;
        setConstructeurType(value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch(`${t("fetch")}constructeurs/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ type: constructeurType })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            alert('Constructeur updated successfully!');
        } catch (error) {
            console.error('Error updating constructeur:', error);
            alert('Error updating constructeur. Please try again.');
        }
    };

    return (
        <div className="flex flex-wrap sm:flex-nowrap">
    <div className="w-full sm:w-[20%] sm:pr-4">
        <MenuDashboardAdmin t={t} />
    </div>

    <div className="w-full px-3 sm:w-[80%] mx-4 sm:mx-0 mt-24 mb-16 sm:mb-24">
        <h2 className="text-bleuFonce p-3">{t("constructeurUpdate_titre")}</h2>
        
        <form onSubmit={handleSubmit} className="p-6 bg-[#21283B] rounded-lg">
            <div className="mb-4">
                <ChampText
                    label={t("constructeurType_label")}
                    type="text"
                    className="block w-full py-2 px-3 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded"
                    value={constructeurType}
                    onChange={handleChange}
                />
            </div>
            <Bouton
                type="submit"
                className="inline-block text-center select-none border font-normal whitespace-no-wrap rounded py-2 px-4 bg-blue-600 text-white hover:bg-blue-700"
            >
                {t("btnSubmit")}
            </Bouton>
        </form>
    </div>
</div>


    );
}

export default ConstructeurUpdate;
