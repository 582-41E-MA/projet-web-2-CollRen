import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import MenuDashboardAdmin from '../../dashboards/MenuDashboardAdmin/MenuDashboardAdmin';
import ChampText from '../../partialsFormulaire/ChampText/ChampText';
import Bouton from '../../partialsFormulaire/Bouton/Bouton';

function CarburantUpdate({ t }) {
    const { id } = useParams();
    const [formData, setFormData] = useState({
        carburant_en: '',
        carburant_fr: ''
    });

    useEffect(() => {
        const fetchCarburant = async () => {
            try {
                const response = await fetch(`${t("fetch")}carburants/${id}`);
                if (!response.ok) {
                    throw new Error(`Erreur HTTP! statut: ${response.status}`);
                }
                const data = await response.json();

                const carburantData = {
                    carburant_en: '',
                    carburant_fr: ''
                };

                console.log(data);

                if (data.type) {
                    const parsedType = JSON.parse(data.type);
                    carburantData.carburant_en = parsedType.en;
                    carburantData.carburant_fr = parsedType.fr;
                }

                setFormData(carburantData);
            } catch (error) {
                console.error('Erreur lors de la récupération du carburant:', error);
            }
        };

        if (id) {
            fetchCarburant();
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
            const response = await fetch(`${t("fetch")}carburants/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    type: JSON.stringify({
                        en: formData.carburant_en,
                        fr: formData.carburant_fr
                    })
                })
            });

            if (!response.ok) {
                throw new Error(`Erreur HTTP! statut: ${response.status}`);
            }

            alert('Carburant mis à jour avec succès!');
        } catch (error) {
            console.error('Erreur lors de la mise à jour du carburant:', error);
            alert('Erreur lors de la mise à jour du carburant. Veuillez réessayer.');
        }
    };

    return (
        <div className="flex flex-wrap">
            <div>
                <MenuDashboardAdmin t={t} />
            </div>

            <div className="w-[100%] mx-[4rem] mt-24 mb-[4rem]">
                <h2 className="text-[#21283B] p-3">{t("carburantUpdate_titre")}</h2>

                <form onSubmit={handleSubmit} className="p-3 bg-[#21283B] rounded-lg">
                    <div className="mb-3">
                        <ChampText
                            label={"Carburant in English"}
                            type="text"
                            className="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded"
                            id="carburant_en"
                            name="carburant_en"
                            value={formData.carburant_en}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-3">
                        <ChampText
                            label={"Carburant in French"}
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

export default CarburantUpdate;
