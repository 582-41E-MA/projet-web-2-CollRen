import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function DetailProduit({ t }) {
  const { id } = useParams();
  const [voiture, setVoiture] = useState(null);
  const [language, setLanguage] = useState(
    localStorage.getItem("langueChoisie")
  );
  const [imagePrincipale, setImagePrincipale] = useState(null);

  useEffect(() => {
    const fetchVoiture = async () => {
      try {
        // Fetch voiture details
        const responseVoiture = await fetch(`${t("fetch")}voitures/${id}`);
        if (!responseVoiture.ok) {
          throw new Error(`HTTP error! status: ${responseVoiture.status}`);
        }
        const voitureData = await responseVoiture.json();

        // Parse JSON safely function
        const parseJSONSafely = (str) => {
            try {
                // Check if str is valid JSON
                if (typeof str === 'string' && str.trim().startsWith('{') && str.trim().endsWith('}')) {
                    return JSON.parse(str);
                } else {
                    // Return as an object with language keys
                    return { en: str, fr: str };
                }
            } catch (e) {
                console.error('JSON parse error:', e);
                // Return as an object with language keys
                return { en: str, fr: str };
            }
        };

        // Fetch details for carburant, transmission, corp, motopropulseur
        const carburantResponse = await fetch(
          `${t("fetch")}carburants/${voitureData.carburant_id}`
        );
        const transmissionResponse = await fetch(
          `${t("fetch")}transmissions/${voitureData.transmission_id}`
        );
        const corpResponse = await fetch(
          `${t("fetch")}corps/${voitureData.corp_id}`
        );
        const motopropulseurResponse = await fetch(
          `${t("fetch")}motopropulseurs/${voitureData.motopropulseur_id}`
        );
        const modeleResponse = await fetch(
          `${t("fetch")}modeles/${voitureData.modele_id}`
        );
        const constructeurResponse = await fetch(
            `${t("fetch")}constructeurs/${voitureData.modele_id}`
          );
        

        // Handle errors if any
        if (
          !carburantResponse.ok ||
          !transmissionResponse.ok ||
          !corpResponse.ok ||
          !motopropulseurResponse.ok ||
          !modeleResponse.ok ||
          !constructeurResponse.ok
        ) {
          throw new Error(
            "Failed to fetch details for carburant, transmission, corp, motopropulseur, modele"
          );
        }

        const carburantData = await carburantResponse.json();
        const transmissionData = await transmissionResponse.json();
        const corpData = await corpResponse.json();
        const motopropulseurData = await motopropulseurResponse.json();
        const modeleData = await modeleResponse.json();
        const constructeurData = await constructeurResponse.json();
        // Mettre à jour les données avec la traduction si nécessaire
        const updatedData = {
          ...voitureData,
          description: parseJSONSafely(voitureData.description || "{}"),
          carburant: {
            type: parseJSONSafely(carburantData.type || "{}"),
          },
          corp: {
            type: parseJSONSafely(corpData.type || "{}"),
          },
          transmission: {
            type: parseJSONSafely(transmissionData.type || "{}"),
          },
          motopropulseur: {
            type: parseJSONSafely(motopropulseurData.type || "{}"),
          },
          modele: {
            type: parseJSONSafely(modeleData.type || "{}"),
          },
          constructeur: {
            type: parseJSONSafely(constructeurData.type || "{}"),
          },
        };

        // Récupérer les images associées à la voiture
        const responseImages = await fetch(
          `${t("fetch")}images?voiture_id=${id}`
        );
        if (!responseImages.ok) {
          throw new Error(`Erreur HTTP! Statut: ${responseImages.status}`);
        }
        const images = await responseImages.json();

        // Filtrer les images pour celles associées à la voiture actuelle
        const filteredImages = images.filter(
          (image) => image.voiture_id === parseInt(id)
        );

        // Trouver l'image principale
        const principaleImage = filteredImages.find(
          (image) => image.est_principale === 1
        );

        // Mettre à jour l'état de la voiture avec les données récupérées
        setVoiture({ ...updatedData, images: filteredImages, principaleImage });
      } catch (error) {
        console.error("Erreur lors de la récupération de la voiture:", error);
      }
    };

    fetchVoiture();
  }, [id, t]);

  useEffect(() => {
    // Mettre à jour l'image principale affichée lorsque les données de la voiture changent
    if (voiture && voiture.images && voiture.images.length > 0) {
      setImagePrincipale(
        voiture.principaleImage
          ? voiture.principaleImage.chemin
          : voiture.images[0].chemin
      );
    }
  }, [voiture]);

  const handleClickImage = (chemin) => {
    // Mettre à jour l'image principale affichée lors du clic sur une miniature
    setImagePrincipale(chemin);
  };

  if (!voiture) {
    return <div>Chargement...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
    <div className="flex justify-between">
        <div >
            <h1 className="text-4xl font-bold text-center mb-8 text-bleuFonce">
            {voiture.modele.type[language]}  {voiture.constructeur.type[language]}
            </h1>
        </div>
        <div className="text-3xl text-center mt-2 text-bleuFonce">
            <strong>{t("price")}: {voiture.prix} $</strong>
        </div>
    </div>

      {imagePrincipale && (
        <div className="mb-8">
          <img
            src={`/imgs/${imagePrincipale}`}
            alt={voiture.description[language]}
            className="w-full h-auto rounded-lg shadow-lg object-contain"
            style={{ maxHeight: "600px" }}
          />
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
        {voiture.images &&
          voiture.images.map((image) => (
            <div
              key={image.id}
              className="overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer"
              onClick={() => handleClickImage(image.chemin)}
            >
              <img
                src={`/imgs/${image.chemin}`}
                alt={voiture.description[language]}
                className="w-full h-auto object-cover transform scale-100 hover:scale-105 transition-transform duration-300"
                style={{ maxHeight: "200px" }}
              />
            </div>
          ))}
      </div>
    <div className="text-lg text-center">
        <strong>{t("description")}:</strong> {voiture.description[language]}
    </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 rounded-lg shadow-lg p-12">
        <div className="text-lg text-center">
          <strong>{t("carburant")}:</strong> {voiture.carburant.type[language]}
        </div>
        <div className="text-lg text-center">
          <strong>{t("transmission")}:</strong>{" "}
          {voiture.transmission.type[language]}
        </div>
        <div className="text-lg text-center">
          <strong>{t("corp")}:</strong> {voiture.corp.type[language]}
        </div>
        <div className="text-lg text-center">
          <strong>{t("motopropulseur")}:</strong>{" "}
          {voiture.motopropulseur.type[language]}
        </div>
      </div>
      <div className="text-center">
        <button className="bg-bleuFonce text-white font-titre p-2 rounded-lg">Réserver</button>
        <button className="bg-orange text-white py-2 px-4  ml-4 rounded-lg shadow-lg hover:bg-orange-dark transition-colors duration-300">
          Ajouter au panier
        </button>
      </div>
    </div>
  );
}

export default DetailProduit;
