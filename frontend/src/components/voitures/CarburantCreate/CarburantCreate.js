import React, { useState } from 'react';
import MenuDashboardAdmin from '../../dashboards/MenuDashboardAdmin/MenuDashboardAdmin';
import ChampText from '../../partialsFormulaire/ChampText/ChampText';
import Bouton from '../../partialsFormulaire/Bouton/Bouton';
import { useNavigate } from 'react-router-dom';

function CarburantCreate({ t }) {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        carburant_en: '',
        carburant_fr: ''
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
                en: formData.carburant_en,
                fr: formData.carburant_fr
            })
        };

        try {
            const response = await fetch(`${t("fetch")}carburants`, {
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
            alert('Carburant créé avec succès!');
            navigate('/carburant');
            setFormData({
                carburant_en: '',
                carburant_fr: ''
            });

        } catch (error) {
            console.error('Erreur:', error);
            alert(`Échec de la création du carburant: ${error.message}`);
        }
    };

    return (
        <div className="flex flex-wrap">
            <div>
                <MenuDashboardAdmin t={t} />
            </div>

            <div className="w-[100%] mx-[4rem] mt-24">
                <h2 className="p-3">{t("carburantCreate_titre")}</h2>

                <form onSubmit={handleSubmit} className="p-3">
                    <div className="mb-3">
                        <label htmlFor="carburant_en" className="form-label">Carburant in English</label>
                        <ChampText
                            type="text"
                            className="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded"
                            id="carburant_en"
                            name="carburant_en"
                            value={formData.carburant_en}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="carburant_fr" className="form-label">Carburant in French</label>
                        <ChampText
                            type="text"
                            className="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded"
                            id="carburant_fr"
                            name="carburant_fr"
                            value={formData.carburant_fr}
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

export default CarburantCreate;
