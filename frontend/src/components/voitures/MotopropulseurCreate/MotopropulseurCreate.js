import React, { useState } from 'react';
import MenuDashboardAdmin from '../../dashboards/MenuDashboardAdmin/MenuDashboardAdmin';
import ChampText from '../../partialsFormulaire/ChampText/ChampText';
import Bouton from '../../partialsFormulaire/Bouton/Bouton';
import { useNavigate } from 'react-router-dom';

function MotopropulseurCreate({ t }) {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        motopropulseur_en: '',
        motopropulseur_fr: ''
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
                en: formData.motopropulseur_en,
                fr: formData.motopropulseur_fr
            })
        };

        try {
            const response = await fetch(`${t("fetch")}motopropulseurs`, {
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
            alert('Motopropulseur créé avec succès!');
            navigate('/motopropulseur');
            setFormData({
                motopropulseur_en: '',
                motopropulseur_fr: ''
            });

        } catch (error) {
            console.error('Erreur:', error);
            alert(`Échec de la création du motopropulseur: ${error.message}`);
        }
    };

    return (
        <div className="flex flex-wrap">
            <div>
                <MenuDashboardAdmin t={t} />
            </div>

            <div className="w-[100%] mx-[2rem] mt-24 mb-[4rem]">
                <h2 className="p-3 text-bleuFonce">{t("motopropulseurCreate_titre")}</h2>

                <form onSubmit={handleSubmit} className="p-3">
                    <div className="mb-3">
                        <label htmlFor="motopropulseur_en" className="form-label">Motopropulseur in English</label>
                        <ChampText
                            type="text"
                            className="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded"
                            id="motopropulseur_en"
                            name="motopropulseur_en"
                            value={formData.motopropulseur_en}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="motopropulseur_fr" className="form-label">Motopropulseur in French</label>
                        <ChampText
                            type="text"
                            className="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded"
                            id="motopropulseur_fr"
                            name="motopropulseur_fr"
                            value={formData.motopropulseur_fr}
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

export default MotopropulseurCreate;
