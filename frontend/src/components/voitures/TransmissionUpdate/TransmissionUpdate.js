import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import MenuDashboardAdmin from '../../dashboards/MenuDashboardAdmin/MenuDashboardAdmin';
import ChampText from '../../partialsFormulaire/ChampText/ChampText';
import Bouton from '../../partialsFormulaire/Bouton/Bouton';

function TransmissionUpdate({ t }) {
    const { id } = useParams();
    const [formData, setFormData] = useState({
        transmission_en: '',
        transmission_fr: ''
    });

    useEffect(() => {
        const fetchTransmission = async () => {
            try {
                const response = await fetch(`${t("fetch")}transmissions/${id}`);
                if (!response.ok) {
                    throw new Error(`Erreur HTTP! statut: ${response.status}`);
                }
                const data = await response.json();

                const transmissionData = {
                    transmission_en: '',
                    transmission_fr: ''
                };

                console.log(data);

                if (data.type) {
                    const parsedType = JSON.parse(data.type);
                    transmissionData.transmission_en = parsedType.en;
                    transmissionData.transmission_fr = parsedType.fr;
                }

                setFormData(transmissionData);
            } catch (error) {
                console.error('Erreur lors de la récupération de la transmission:', error);
            }
        };

        if (id) {
            fetchTransmission();
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
            const response = await fetch(`${t("fetch")}transmissions/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    type: JSON.stringify({
                        en: formData.transmission_en,
                        fr: formData.transmission_fr
                    })
                })
            });

            if (!response.ok) {
                throw new Error(`Erreur HTTP! statut: ${response.status}`);
            }

            alert('Transmission mise à jour avec succès!');
        } catch (error) {
            console.error('Erreur lors de la mise à jour de la transmission:', error);
            alert('Erreur lors de la mise à jour de la transmission. Veuillez réessayer.');
        }
    };

    return (
        <div className="flex">
            <div>
                <MenuDashboardAdmin t={t} />
            </div>

            <div className="w-[30%] mx-[4rem] mt-24 mb-[4rem]">
                <h2 className="p-3 text-bleuFonce">{t("transmissionUpdate_titre")}</h2>

                <form onSubmit={handleSubmit} className="p-3 bg-[#21283B] rounded-lg">
                    <div className="mb-3">
                        <ChampText
                            label={"Transmission in English"}
                            type="text"
                            className="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded"
                            id="transmission_en"
                            name="transmission_en"
                            value={formData.transmission_en}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-3">
                        <ChampText
                            label={"Transmission in French"}
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

export default TransmissionUpdate;
