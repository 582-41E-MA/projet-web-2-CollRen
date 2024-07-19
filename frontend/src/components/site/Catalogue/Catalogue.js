import React, { useEffect, useState } from 'react';
import Tuile from '../Tuile/Tuile';
import Filtres from '../Filtres/Filtres';


function Catalogue({ t, changeLanguage }) {
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [voitures, setVoitures] = useState([]);
    const [arrvoitures, setArrvoitures] = useState([]);
    const [language, setLanguage] = useState(localStorage.getItem('langueChoisie'));

    let i = 0;
    
  
    useEffect(() => {
        const fetchVoitures = async () => {
            try {
                const response = await fetch(`${t("fetch")}voitures`);
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

                const updatedData = data.map(item => ({
                    ...item,
                    description: parseJSONSafely(item.description),
                    carburant: { ...item.carburant, type: parseJSONSafely(item.carburant.type) },
                    corp: { ...item.corp, type: parseJSONSafely(item.corp.type) },
                    transmission: { ...item.transmission, type: parseJSONSafely(item.transmission.type) },
                    motopropulseur: { ...item.motopropulseur, type: parseJSONSafely(item.motopropulseur.type) }
                }));

                setVoitures(updatedData);

                // Fetch images for each voiture
                await fetchImagesForVoitures(updatedData);
            } catch (error) {
                console.error('Error fetching voitures:', error);
            }
        };

        const fetchImagesForVoitures = async (voitures) => {
            try {
                const fetchImagePromises = voitures.map(async (voiture) => {
                    const response = await fetch(`${t("fetch")}images?voiture_id=${voiture.id}`);
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    const images = await response.json();
                    const principaleImage = images.find(image => image.est_principale === 1 && image.voiture_id === voiture.id);
                    return { ...voiture, images: images, principaleImage };
                });

                const voituresWithImages = await Promise.all(fetchImagePromises);
                console.log(voituresWithImages)
                creerLeTableauDesVoitures(voituresWithImages)

                setVoitures(voituresWithImages);
            } catch (error) {
                console.error('Error fetching images:', error);
            }
        };

        fetchVoitures();
    }, [t, language]);

    useEffect(() => {
        const storedLanguage = localStorage.getItem('langueChoisie');
        setLanguage(storedLanguage);
    }, [changeLanguage]);

    const toggleFilter = () => {
        setIsFilterOpen(!isFilterOpen);
    };

    function onFiltered(arr){
        setVoitures(arr)
    }

    function creerLeTableauDesVoitures(arr) {
        console.log(i)
        if (i == 0){
            setArrvoitures(arr);
            i++;
        }
        console.log(arrvoitures)

    }
    console.log(arrvoitures)

    return (
        
        <div className="relative min-h-screen bg-gray-100">
            <button 
                className={`fixed top-4  z-20 bg-orange text-white p-2 rounded transition-transform duration-300 ${
                    isFilterOpen ? 'mt-1 left-48' : 'mt-72 left-1'
                }`}
                onClick={toggleFilter}
            >
                {isFilterOpen ? 'Cacher <' : 'Trier >'}
            </button>

            <div className={`filter-panel ${isFilterOpen ? 'open' : 'closed'}`}>
                <Filtres t={t} changeLanguage={changeLanguage} arrayVoitures={arrvoitures} handleSetVoitures={onFiltered}  />
            </div>

            <div className="container mx-auto px-4 py-8">
                <h1 className="text-4xl font-bold text-center mb-8 text-bleuFonce">{t("catalog.title")}</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {voitures.map(voiture => (
                        <Tuile key={voiture.id} voiture={voiture} language={language} />
                ))}
                </div>
            </div>

        </div>
);
}
export default Catalogue;


