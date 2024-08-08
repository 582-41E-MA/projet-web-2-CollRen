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
        <div className="flex flex-wrap sm:flex-nowrap">
            <div className="w-full sm:w-[25%] sm:pr-4">
                <MenuDashboardAdmin t={t} />
            </div>

            <div className="w-full sm:w-[75%] px-3 mx-4 sm:mx-0 mt-24 mb-16 sm:mb-24">
                <h2 className="text-[#21283B] text-xl sm:text-2xl p-3">{t("carburantUpdate_titre")}</h2>

                <form onSubmit={handleSubmit} className="p-4 bg-[#21283B] rounded-lg">
                    <div className="mb-4">
                        <ChampText
                            label={"Carburant in English"}
                            type="text"
                            className="block w-full py-2 px-3 mb-2 text-base bg-white text-gray-800 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            id="carburant_en"
                            name="carburant_en"
                            value={formData.carburant_en}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-4">
                        <ChampText
                            label={"Carburant in French"}
                            type="text"
                            className="block w-full py-2 px-3 mb-2 text-base bg-white text-gray-800 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            id="carburant_fr"
                            name="carburant_fr"
                            value={formData.carburant_fr}
                            onChange={handleChange}
                        />
                    </div>
                    <Bouton
                        type="submit"
                        className="mt-4 py-2 px-6 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                    >
                        {t("btnSubmit")}
                    </Bouton>
                </form>
            </div>
        </div>

    );
}

export default CarburantUpdate;
