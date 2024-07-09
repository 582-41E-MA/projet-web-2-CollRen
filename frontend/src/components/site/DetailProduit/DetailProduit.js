import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function DetailProduit({ t }) {
    const { id } = useParams();
    const [voiture, setVoiture] = useState(null);
    const [language, setLanguage] = useState(localStorage.getItem('langueChoisie'));

    useEffect(() => {
        const fetchVoiture = async () => {
            try {
                const response = await fetch(`${t("fetch")}voitures/${id}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();

                const parseJSONSafely = (str) => {
                    try {
                        return JSON.parse(str);
                    } catch (e) {
                        console.error('JSON parse error:', e);
                        return { en: str, fr: str };
                    }
                };

                const updatedData = {
                    ...data,
                    description: parseJSONSafely(data.description),
                    carburant: { ...data.carburant, type: parseJSONSafely(data.carburant.type) },
                    corp: { ...data.corp, type: parseJSONSafely(data.corp.type) },
                    transmission: { ...data.transmission, type: parseJSONSafely(data.transmission.type) },
                    motopropulseur: { ...data.motopropulseur, type: parseJSONSafely(data.motopropulseur.type) }
                };

                setVoiture(updatedData);
            } catch (error) {
                console.error('Error fetching voiture:', error);
            }
        };

        fetchVoiture();
    }, [id, t, language]);

    if (!voiture) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold text-center mb-8 text-bleuFonce">{voiture.model}</h1>
            <img src={voiture.principaleImage?.url} alt={voiture.model} className="w-full h-auto mb-8" />
            <div className="text-lg mb-4">
                <strong>{t("description")}:</strong> {voiture.description[language]}
            </div>
            <div className="text-lg mb-4">
                <strong>{t("carburant")}:</strong> {voiture.carburant.type[language]}
            </div>
            <div className="text-lg mb-4">
                <strong>{t("corp")}:</strong> {voiture.corp.type[language]}
            </div>
            <div className="text-lg mb-4">
                <strong>{t("transmission")}:</strong> {voiture.transmission.type[language]}
            </div>
            <div className="text-lg mb-4">
                <strong>{t("motopropulseur")}:</strong> {voiture.motopropulseur.type[language]}
            </div>
            <div className="text-lg mb-4">
                <strong>{t("price")}:</strong> {voiture.price}
            </div>
        </div>
    );
}

export default DetailProduit;
