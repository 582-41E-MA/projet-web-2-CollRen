import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import MenuDashboardAdmin from '../../dashboards/MenuDashboardAdmin/MenuDashboardAdmin';
import ChampText from '../../partialsFormulaire/ChampText/ChampText';
import Bouton from '../../partialsFormulaire/Bouton/Bouton';

function CorpsUpdate({ t }) {
    const { id } = useParams(); 
    const [formData, setFormData] = useState({
        corps_en: '',
        corps_fr: ''
    });


    useEffect(() => {
        const fetchCorps = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/corps/${id}`);
                if (!response.ok) {
                    throw new Error(`Erreur HTTP! statut: ${response.status}`);
                }
                const data = await response.json();

                const corpsData = {
                    corps_en: '',
                    corps_fr: ''
                };

                console.log(data);

                if (data.type) {
                    const parsedType = JSON.parse(data.type);
                    corpsData.corps_en = parsedType.en;
                    corpsData.corps_fr = parsedType.fr;
                }

                setFormData(corpsData);
            } catch (error) {
                console.error('Erreur lors de la récupération du corps:', error);
            }
        };

        if (id) {
            fetchCorps();
        }
    }, [id]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch(`http://localhost:5000/api/corps/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    type: JSON.stringify({
                        en: formData.corps_en,
                        fr: formData.corps_fr
                    })
                })
            });

            if (!response.ok) {
                throw new Error(`Erreur HTTP! statut: ${response.status}`);
            }

            alert('Corps mis à jour avec succès!');
        } catch (error) {
            console.error('Erreur lors de la mise à jour du corps:', error);
            alert('Erreur lors de la mise à jour du corps. Veuillez réessayer.');
        }
    };


    return (
        <div className="flex">
            <div>
                <MenuDashboardAdmin t={t} />
            </div>

            <div className="w-[30%] mx-[4rem] mt-24">
                <h2 className="p-3">{t("corpsUpdate_titre")}</h2>

                <form onSubmit={handleSubmit} className="p-3 bg-[#21283B] rounded-lg">
                    <div className="mb-3">
                        <ChampText
                            label={"Corps in English"}
                            type="text"
                            className="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded"
                            id="corps_en"
                            name="corps_en"
                            value={formData.corps_en}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-3">
                        <ChampText
                            label={"Corps in French"}
                            type="text"
                            className="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded"
                            id="corps_fr"
                            name="corps_fr"
                            value={formData.corps_fr}
                            onChange={handleChange}
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
    );
}

export default CorpsUpdate;
