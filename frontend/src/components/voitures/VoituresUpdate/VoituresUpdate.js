import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import MenuDashboardAdmin from '../../dashboards/MenuDashboardAdmin/MenuDashboardAdmin';
import ChampText from '../../partialsFormulaire/ChampText/ChampText';
import ChampTextArea from '../../partialsFormulaire/ChampTextArea/ChampTextArea';
import Bouton from '../../partialsFormulaire/Bouton/Bouton';
import { useRef } from 'react';

function VoitureUpdate({ t }) {
    const navigate = useNavigate();
    const { id } = useParams();
    const [date, setDate] = useState('');
    const [descriptionEn, setDescriptionEn] = useState('');
    const [descriptionFr, setDescriptionFr] = useState('');
    const [prix, setPrix] = useState('');
    const [modeles, setModeles] = useState([]);
    const [selectedModele, setSelectedModele] = useState('');
    const [transmissions, setTransmissions] = useState([]);
    const [selectedTransmission, setSelectedTransmission] = useState('');
    const [motopropulseurs, setMotopropulseurs] = useState([]);
    const [selectedMotopropulseur, setSelectedMotopropulseur] = useState('');
    const [carburants, setCarburants] = useState([]);
    const [selectedCarburant, setSelectedCarburant] = useState('');
    const [corps, setCorps] = useState([]);
    const [selectedCorp, setSelectedCorp] = useState('');
    const [images, setImages] = useState([]);
    const [updateFlag, setUpdateFlag] = useState(false); // Nouvel état pour forcer la mise à jour
    const language = localStorage.getItem('langueChoisie') || 'en';

    const fileInputRef = useRef(null);

    const parseJSONSafely = (str) => {
        try {
            return JSON.parse(str);
        } catch (e) {
            console.error('Erreur de parsing JSON :', e);
            return { en: str, fr: str };
        }
    };

    useEffect(() => {
        const fetchVoiture = async () => {
            try {
                const response = await fetch(`${t("fetch")}voitures/${id}`);
                if (!response.ok) {
                    throw new Error(`Erreur HTTP ! statut : ${response.status}`);
                }
                const data = await response.json();
                setDate(data.date);
                setDescriptionEn(parseJSONSafely(data.description).en);
                setDescriptionFr(parseJSONSafely(data.description).fr);
                setPrix(data.prix);
                setSelectedModele(data.modele_id);
                setSelectedTransmission(data.transmission_id);
                setSelectedMotopropulseur(data.motopropulseur_id);
                setSelectedCarburant(data.carburant_id);
                setSelectedCorp(data.corp_id);

            } catch (error) {
                console.error('Erreur lors de la récupération de la voiture :', error);
            }
        };

        const fetchOptions = async () => {
            try {
                const [modelesRes, transmissionsRes, motopropulseursRes, carburantsRes, corpsRes] = await Promise.all([
                    fetch(`${t("fetch")}modeles`),
                    fetch(`${t("fetch")}transmissions`),
                    fetch(`${t("fetch")}motopropulseurs`),
                    fetch(`${t("fetch")}carburants`),
                    fetch(`${t("fetch")}corps`)
                ]);

                if (!modelesRes.ok || !transmissionsRes.ok || !motopropulseursRes.ok || !carburantsRes.ok || !corpsRes.ok) {
                    throw new Error('Erreur HTTP ! Certaines requêtes ont échoué.');
                }

                const [modelesData, transmissionsData, motopropulseursData, carburantsData, corpsData] = await Promise.all([
                    modelesRes.json(),
                    transmissionsRes.json(),
                    motopropulseursRes.json(),
                    carburantsRes.json(),
                    corpsRes.json()
                ]);

                setModeles(modelesData);

                const updatedTransmissions = transmissionsData.map(item => ({
                    ...item,
                    type: parseJSONSafely(item.type)
                }));

                const updatedMotopropulseurs = motopropulseursData.map(item => ({
                    ...item,
                    type: parseJSONSafely(item.type)
                }));

                const updatedCarburants = carburantsData.map(item => ({
                    ...item,
                    type: parseJSONSafely(item.type)
                }));

                const updatedCorps = corpsData.map(item => ({
                    ...item,
                    type: parseJSONSafely(item.type)
                }));

                setTransmissions(updatedTransmissions);
                setMotopropulseurs(updatedMotopropulseurs);
                setCarburants(updatedCarburants);
                setCorps(updatedCorps);

            } catch (error) {
                console.error('Erreur lors de la récupération des options :', error);
            }
        };

        const fetchImages = async () => {
            try {
                const response = await fetch(`${t("fetch")}images?voiture_id=${id}`);
                if (!response.ok) {
                    throw new Error(`Erreur HTTP ! statut : ${response.status}`);
                }
                const data = await response.json();
                // Filtrar as imagens pelo voiture_id
                const filteredImages = data.filter(image => image.voiture_id === parseInt(id, 10));
                setImages(filteredImages);
            } catch (error) {
                console.error('Erreur lors de la récupération des images :', error);
            }
        };

        fetchVoiture();
        fetchOptions();
        fetchImages();
    }, [id, updateFlag]); // Ajout de updateFlag comme dépendance

    const handleDeleteImage = async (imageId) => {
        try {
            const response = await fetch(`${t("fetch")}images/${imageId}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error(`Erreur HTTP ! statut : ${response.status}`);
            }

            const updatedImages = images.filter(image => image.id !== imageId);
            setImages(updatedImages);

            alert('Image supprimée avec succès!');
        } catch (error) {
            console.error('Erreur lors de la suppression de l\'image :', error);
            alert('Erreur lors de la suppression de l\'image. Veuillez réessayer.');
        }
    };

    const handleSetEstPrincipale = async (imageId, newEstPrincipale) => {
        try {
            const response = await fetch(`${t("fetch")}images/${imageId}/est_principale`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ est_principale: newEstPrincipale })
            });
            if (!response.ok) {
                throw new Error(`Erreur HTTP ! statut : ${response.status}`);
            }

            // Mettre à jour l'état local après la modification
            const updatedImages = images.map(image =>
                image.id === imageId ? { ...image, est_principale: newEstPrincipale } : { ...image, est_principale: false }
            );
            setImages(updatedImages);

            // Forcer la mise à jour de la page
            setUpdateFlag(!updateFlag);

            alert('Image mise à jour avec succès!');
        } catch (error) {
            console.error('Erreur lors de la mise à jour de l\'image :', error);
            alert('Erreur lors de la mise à jour de l\'image. Veuillez réessayer.');
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const description = JSON.stringify({ en: descriptionEn, fr: descriptionFr });

        try {
            const response = await fetch(`${t("fetch")}voitures/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    date,
                    description,
                    prix,
                    modele_id: selectedModele,
                    transmission_id: selectedTransmission,
                    motopropulseur_id: selectedMotopropulseur,
                    carburant_id: selectedCarburant,
                    corp_id: selectedCorp
                })
            });

            if (!response.ok) {
                throw new Error(`Erreur HTTP ! statut : ${response.status}`);
            }

            alert('Voiture mise à jour avec succès !');
            navigate('/voitures');
        } catch (error) {
            console.error('Erreur lors de la mise à jour de la voiture :', error);
            alert('Erreur lors de la mise à jour de la voiture. Veuillez réessayer.');
        }
    };


    const handleUploadImage = async () => {
        const files = fileInputRef.current.files;

        
        
        const formData = new FormData();
        for (let i = 0; i < files.length; i++) {
            formData.append('voiture_imgs', files[i]);
        }
        // formData.append('voiture_id', id);

        for (var pair of formData.entries()) {
            console.log(pair[0]+ ', ' + pair[1]); 
        }

        
        try {
            const response = await fetch(`${t("fetch")}images?voiture_id=${id}`, {
                method: 'POST',
                body: formData
            });
    
            if (!response.ok) {
                throw new Error(`Erreur HTTP ! statut : ${response.status}`);
            }
    
            // Forçar a atualização da lista de imagens
            setUpdateFlag(!updateFlag);
    
            alert('Images uploadées avec succès!');
        } catch (error) {
            console.error('Erreur lors de l\'upload des images :', error);
            alert('Erreur lors de l\'upload des images. Veuillez réessayer.');
        }
    };

     

    return (
        <div className="flex">
            <div>
                <MenuDashboardAdmin t={t} />
            </div>

            <div className='flex flex-col w-[40%] mx-[3rem] mt-24 mb-[4rem]'>
                <h2 className="mx-[4rem]">{t("voitureUpdate_titre")}</h2>
                <div className="w-full mx-[4rem] mt-12 bg-[#F96C25] rounded-lg">
                    <form onSubmit={handleSubmit} className="p-3 bg-[#21283B] rounded-lg">
                        <div>
                            <label className="text-[#F5F5F5]">{t("voitureCreate_date_label")}</label>
                            <input
                                type="number"
                                placeholder={t("voitureCreate_date_placeholder")}
                                required={true}
                                onChange={(e) => setDate(e.target.value)}
                                value={date}
                                name="date"
                                className="my-2 mb-6 p-3 block bg-[#f5f5f5] placeholder:text-slate-300 rounded border focus:border-teal-500"
                            />
                        </div>
                        <ChampTextArea
                            label={t("voitureCreate_description_label_en")}
                            content={descriptionEn}
                            whenChanged={setDescriptionEn}
                            required={true}
                            placeholder={t("voitureCreate_description_placeholder_en")}
                        />
                        <ChampTextArea
                            label={t("voitureCreate_description_label_fr")}
                            content={descriptionFr}
                            whenChanged={setDescriptionFr}
                            required={true}
                            placeholder={t("voitureCreate_description_placeholder_fr")}
                        />
                        <ChampText
                            label={t("voitureCreate_prix_label")}
                            type="number"
                            placeholder={t("voitureCreate_prix_placeholder")}
                            required={true}
                            onChange={(e) => setPrix(e.target.value)}
                            value={prix}
                            name="prix"
                        />
                        <div className="mb-3">
                            <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="modele">
                                {t("voitureCreate_modele_label")}
                            </label>
                            <select
                                id="modele"
                                className="block appearance-none w-full bg-white border border-gray-200 text-gray-800 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                value={selectedModele}
                                onChange={(e) => setSelectedModele(e.target.value)}
                            >
                                <option value="">{t("voitureCreate_select_modele")}</option>
                                {modeles.map((modele) => (
                                    <option key={modele.id} value={modele.id}>
                                        {modele.type}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-3">
                            <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="transmission">
                                {t("voitureCreate_transmission_label")}
                            </label>
                            <select
                                id="transmission"
                                className="block appearance-none w-full bg-white border border-gray-200 text-gray-800 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                value={selectedTransmission}
                                onChange={(e) => setSelectedTransmission(e.target.value)}
                            >
                                <option value="">{t("voitureCreate_select_transmission")}</option>
                                {transmissions.map((transmission) => (
                                    <option key={transmission.id} value={transmission.id}>
                                        {transmission.type[language]}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-3">
                            <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="motopropulseur">
                                {t("voitureCreate_motopropulseur_label")}
                            </label>
                            <select
                                id="motopropulseur"
                                className="block appearance-none w-full bg-white border border-gray-200 text-gray-800 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                value={selectedMotopropulseur}
                                onChange={(e) => setSelectedMotopropulseur(e.target.value)}
                            >
                                <option value="">{t("voitureCreate_select_motopropulseur")}</option>
                                {motopropulseurs.map((motopropulseur) => (
                                    <option key={motopropulseur.id} value={motopropulseur.id}>
                                        {motopropulseur.type[language]}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-3">
                            <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="carburant">
                                {t("voitureCreate_carburant_label")}
                            </label>
                            <select
                                id="carburant"
                                className="block appearance-none w-full bg-white border border-gray-200 text-gray-800 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                value={selectedCarburant}
                                onChange={(e) => setSelectedCarburant(e.target.value)}
                            >
                                <option value="">{t("voitureCreate_select_carburant")}</option>
                                {carburants.map((carburant) => (
                                    <option key={carburant.id} value={carburant.id}>
                                        {carburant.type[language]}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-3">
                            <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="corp">
                                {t("voitureCreate_corps_label")}
                            </label>
                            <select
                                id="corp"
                                className="block appearance-none w-full bg-white border border-gray-200 text-gray-800 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                value={selectedCorp}
                                onChange={(e) => setSelectedCorp(e.target.value)}
                            >
                                <option value="">{t("voitureCreate_select_corps")}</option>
                                {corps.map((corp) => (
                                    <option key={corp.id} value={corp.id}>
                                        {corp.type[language]}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <Bouton
                            type="submit"
                            className="inline-block align-middle text-center select-none border font-normal whitespace-no-wrap rounded py-1 px-3 leading-normal no-underline bg-blue-600 text-white hover:bg-blue-600"
                        >
                            {t("btnSubmit")}
                        </Bouton>
                    </form>
                </div>
                <div className="w-full mx-[4rem] mt-12 rounded-lg p-3 bg-[#21283B]">
                    <h3 className="text-[#F5F5F5]">{t("voitureUpdate_images_titre")}</h3>
                    <div className="grid grid-cols-3 gap-4">
                        {images.length > 0 ? (
                            images.map(image => (
                                <div key={image.id} className="relative">
                                    <img src={`/imgs/${image.chemin}`} alt="voiture" className="w-full h-auto" />
                                    <Bouton
                                        onClick={() => handleDeleteImage(image.id)}
                                        className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded"
                                    >
                                        {t("btnDeleter")}
                                    </Bouton>
                                    <Bouton
                                        onClick={() => handleSetEstPrincipale(image.id, !image.est_principale)}
                                        className={`absolute bottom-2 left-2 ${image.est_principale ? 'bg-green-600' : 'bg-gray-600'} text-white p-1 rounded`}
                                    >
                                        {image.est_principale ? t("btnPrincipale") : t("btnNonPrincipale")}
                                    </Bouton>
                                </div>
                            ))
                        ) : (
                            <p className="text-white">{t("voitureUpdate_no_images")}</p>
                        )}
                    </div>

                    <div className="mt-4">
                        <input
                            type="file"
                            multiple
                            ref={fileInputRef}
                            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
                        />
                        <Bouton
                            onClick={handleUploadImage}
                            className="mt-2 inline-block align-middle text-center select-none border font-normal whitespace-no-wrap rounded py-1 px-3 leading-normal no-underline bg-blue-600 text-white hover:bg-blue-600"
                        >
                            {t("btnUpload")}
                        </Bouton>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default VoitureUpdate;
