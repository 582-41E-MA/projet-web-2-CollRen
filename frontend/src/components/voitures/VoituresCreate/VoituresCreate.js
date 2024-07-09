import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MenuDashboardAdmin from '../../dashboards/MenuDashboardAdmin/MenuDashboardAdmin';
import ChampText from '../../partialsFormulaire/ChampText/ChampText';
import ChampTextArea from '../../partialsFormulaire/ChampTextArea/ChampTextArea';
import Bouton from '../../partialsFormulaire/Bouton/Bouton';

function VoitureCreate({ t }) {
    const navigate = useNavigate();
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
    const language = localStorage.getItem('langueChoisie') || 'en';

    useEffect(() => {
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
                    throw new Error('HTTP error! Some fetch requests failed.');
                }

                const [modelesData, transmissionsData, motopropulseursData, carburantsData, corpsData] = await Promise.all([
                    modelesRes.json(),
                    transmissionsRes.json(),
                    motopropulseursRes.json(),
                    carburantsRes.json(),
                    corpsRes.json()
                ]);

                const parseJSONSafely = (str) => {
                    try {
                        return JSON.parse(str);
                    } catch (e) {
                        console.error('JSON parse error:', e);
                        return { en: str, fr: str };
                    }
                };

                setModeles(modelesData.map(modele => ({
                    ...modele,
                    type: parseJSONSafely(modele.type)
                })));
                setTransmissions(transmissionsData.map(transmission => ({
                    ...transmission,
                    type: parseJSONSafely(transmission.type)
                })));
                setMotopropulseurs(motopropulseursData.map(motopropulseur => ({
                    ...motopropulseur,
                    type: parseJSONSafely(motopropulseur.type)
                })));
                setCarburants(carburantsData.map(carburant => ({
                    ...carburant,
                    type: parseJSONSafely(carburant.type)
                })));
                setCorps(corpsData.map(corp => ({
                    ...corp,
                    type: parseJSONSafely(corp.type)
                })));
            } catch (error) {
                console.error('Error fetching options:', error);
            }
        };

        fetchOptions();
    }, []);

    const handleImageChange = (event) => {
        setImages([...event.target.files]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const description = JSON.stringify({ en: descriptionEn, fr: descriptionFr });

        try {
            // Cria a voiture primeiro
            const voitureResponse = await fetch(`${t("fetch")}api/voitures`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    date,
                    description: description,
                    prix,
                    modele_id: selectedModele,
                    transmission_id: selectedTransmission,
                    motopropulseur_id: selectedMotopropulseur,
                    carburant_id: selectedCarburant,
                    corp_id: selectedCorp
                })
            });

            if (!voitureResponse.ok) {
                throw new Error(`Erreur HTTP ! statut : ${voitureResponse.status}`);
            }

            const voitureData = await voitureResponse.json();

            // Envoye les images
            const formData = new FormData();
            images.forEach((image) => {
                formData.append('voiture_imgs', image);
            });

            const imageResponse = await fetch(`${t("fetch")}images?voiture_id=${voitureData.id}`, {
                method: 'POST',
                body: formData
            });

            if (!imageResponse.ok) {
                throw new Error(`Erreur HTTP lors du téléversement des images ! statut : ${imageResponse.status}`);
            }

            alert('Voiture et images créées avec succès !');
            navigate('/voitures');
        } catch (error) {
            console.error('Erreur lors de la création de la voiture ou du téléversement des images :', error);
            alert('Erreur lors de la création de la voiture ou du téléversement des images. Veuillez réessayer.');
        }
    };

    return (
        <div className="flex">
            <div>
                <MenuDashboardAdmin t={t} />
            </div>

            <div className='flex flex-col w-[40%] mx-[3rem] mt-24 mb-[4rem]'>
                <h2 className="mx-[4rem]">{t("voitureCreate_titre")}</h2>
                <div className="w-full mx-[4rem] mt-12 bg-[#F96C25] rounded-lg">
                    <form onSubmit={handleSubmit} className="p-3 bg-[#21283B] rounded-lg" encType='multipart/form-data'>
                        <div>
                            <label className='text-[#f5f5f5]'>{t("voitureCreate_date_label")}</label>
                            <input
                                type="number"
                                placeholder={t("voitureCreate_date_placeholder")}
                                mandatory={true}
                                onChange={(e) => setDate(e.target.value)}
                                value={date}
                                name="date"
                                className='my-2 mb-6 p-3 block bg-[#f5f5f5]  placeholder:text-slate-300 rounded border focus:border-teal-500'
                            />
                        </div>
                        <ChampTextArea
                            label={t("voitureCreate_description_label_en")}
                            content={descriptionEn}
                            whenChanged={setDescriptionEn}
                            mandatory={true}
                            placeholder={t("voitureCreate_description_placeholder_en")}
                        />
                        <ChampTextArea
                            label={t("voitureCreate_description_label_fr")}
                            content={descriptionFr}
                            whenChanged={setDescriptionFr}
                            mandatory={true}
                            placeholder={t("voitureCreate_description_placeholder_fr")}
                        />
                        <ChampText
                            label={t("voitureCreate_prix_label")}
                            type="number"
                            placeholder={t("voitureCreate_prix_placeholder")}
                            mandatory={true}
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
                                        {modele.type[language]}
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
                        <div className="mb-3">
                            <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="images">
                                {t("voitureCreate_images_label")}
                            </label>
                            <input
                                type="file"
                                id="images"
                                multiple
                                onChange={handleImageChange}
                                className="block appearance-none w-full bg-white border border-gray-200 text-gray-800 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
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
        </div>
    );
}

export default VoitureCreate;