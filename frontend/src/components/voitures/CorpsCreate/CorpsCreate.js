import React, { useState } from 'react';
import MenuDashboardAdmin from '../../dashboards/MenuDashboardAdmin/MenuDashboardAdmin';
import ChampText from '../../partialsFormulaire/ChampText/ChampText';
import Bouton from '../../partialsFormulaire/Bouton/Bouton';
import { useNavigate } from 'react-router-dom';

function CorpsCreate({ t }) {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        corps_en: '',
        corps_fr: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            type: JSON.stringify({
                en: formData.corps_en,
                fr: formData.corps_fr
            })
        };

        try {
            const response = await fetch(`${t("fetch")}corps`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'La réponse réseau n\'était pas correcte');
            }

            const data = await response.json();
            console.log('Succès:', data);
            alert('Corps créé avec succès!');
            navigate('/corps');
            setFormData({
                corps_en: '',
                corps_fr: ''
            });

        } catch (error) {
            console.error('Erreur:', error);
            alert(`Échec de la création du corps: ${error.message}`);
        }
    };

    return (
        <div className="flex flex-wrap">
    <div className="w-full sm:w-[20%] sm:pr-4">
        <MenuDashboardAdmin t={t} />
    </div>

    <div className="w-full px-3 sm:w-[80%] mx-4 sm:mx-0 mt-24 mb-16 sm:mb-24">
        <h2 className="text-2xl sm:text-3xl text-bleuFonce mb-6">{t("corpsCreate_titre")}</h2>

        <form onSubmit={handleSubmit} className="p-6 bg-[#21283B] rounded-lg">
            <div className="mb-4">
                <label htmlFor="corps_en" className="block text-sm font-medium text-gray-300">Corps in English</label>
                <ChampText
                    type="text"
                    className="block appearance-none w-full py-2 px-3 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded"
                    id="corps_en"
                    name="corps_en"
                    value={formData.corps_en}
                    onChange={handleChange}
                />
            </div>
            <div className="mb-4">
                <label htmlFor="corps_fr" className="block text-sm font-medium text-gray-300">Corps in French</label>
                <ChampText
                    type="text"
                    className="block appearance-none w-full py-2 px-3 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded"
                    id="corps_fr"
                    name="corps_fr"
                    value={formData.corps_fr}
                    onChange={handleChange}
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

    );
}

export default CorpsCreate;
