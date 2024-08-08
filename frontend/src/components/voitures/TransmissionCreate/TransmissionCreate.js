import React, { useState } from 'react';
import MenuDashboardAdmin from '../../dashboards/MenuDashboardAdmin/MenuDashboardAdmin';
import ChampText from '../../partialsFormulaire/ChampText/ChampText';
import Bouton from '../../partialsFormulaire/Bouton/Bouton';
import { useNavigate } from 'react-router-dom';

function TransmissionCreate({ t }) {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        transmission_en: '',
        transmission_fr: ''
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
                en: formData.transmission_en,
                fr: formData.transmission_fr
            })
        };

        try {
            const response = await fetch(`${t("fetch")}transmissions`, {
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
            alert('Transmission créée avec succès!');
            navigate('/transmission');
            setFormData({
                transmission_en: '',
                transmission_fr: ''
            });

        } catch (error) {
            console.error('Erreur:', error);
            alert(`Échec de la création de la transmission: ${error.message}`);
        }
    };

    return (
        <div className="flex flex-wrap sm:flex-nowrap">
            <div className="w-full sm:w-[20%] sm:pr-4">
                <MenuDashboardAdmin t={t} />
            </div>

            <div className="w-[100%] mx-[2rem] mt-24 mb-[4rem]">
                <h2 className="p-3 text-bleuFonce">{t("transmissionCreate_titre")}</h2>

                <form onSubmit={handleSubmit} className="p-3">
                    <div className="mb-3">
                        <label htmlFor="transmission_en" className="form-label">Transmission in English</label>
                        <ChampText
                            type="text"
                            className="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded"
                            id="transmission_en"
                            name="transmission_en"
                            value={formData.transmission_en}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="transmission_fr" className="form-label">Transmission in French</label>
                        <ChampText
                            type="text"
                            className="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded"
                            id="transmission_fr"
                            name="transmission_fr"
                            value={formData.transmission_fr}
                            onChange={handleChange}
                        />
                    </div>
                    <Bouton
                        type="submit"
                        className="inline-block align-middle text-center select-none border font-normal whitespace-no-wrap rounded py-1 px-3 leading-normal no-underline bg-blue-600 text-white hover:bg-blue-600"
                    >
                        {t("btnSubmit")}
                    </Bouton>
                </form>
            </div>
        </div>
    );
}

export default TransmissionCreate;
