import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { PanierContext } from '../Panier/Panier'; 

function DetailProduit({ t }) {
  const { id } = useParams();
  const [voiture, setVoiture] = useState(null);
  const [language, setLanguage] = useState(
    localStorage.getItem("langueChoisie")
  );
  const [imagePrincipale, setImagePrincipale] = useState(null);
  const { ajouterAuPanier } = useContext(PanierContext); 
  const [confirmation, setConfirmation] = useState(false);

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

  const handleAjouterAuPanier = () => {
    ajouterAuPanier(voiture);
    setConfirmation(true); // Afficher le message de confirmation lors de l'ajout au panier
    setTimeout(() => setConfirmation(false), 3000);
  };

  if (!voiture) {
    return <div>Chargement...</div>;
  }

  return (
    
    <div className="container mx-auto px-4 py-8">
      {confirmation && <div className="bg-green-200 text-green-800 p-3 mb-4 rounded">Voiture ajoutée au panier avec succès!</div>}
  <div className="flex flex-col md:flex-row justify-between items-center mb-8">
    <h1 className="text-4xl font-bold text-center mb-4 md:mb-0 text-bleuFonce">
      {voiture.modele.type[language]} {voiture.constructeur.type[language]}
    </h1>
    <div className="text-3xl text-center text-bleuFonce">
      <strong>{t("price")}: {voiture.prix} $</strong>
    </div>
  </div>

  <div className="flex flex-col lg:flex-row gap-8">
    <div className="lg:w-1/3">
      {imagePrincipale && (
        <div className="mb-8">
          <img
            src={`/imgs/${imagePrincipale}`}
            alt={voiture.description[language]}
            className="w-full h-auto rounded-lg shadow-lg object-contain"
            style={{ maxHeight: "300px" }}
          />
        </div>
      )}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
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
                className="w-full h-auto object-contain transform scale-100 hover:scale-105 transition-transform duration-300"
                style={{ maxHeight: "200px" }}
              />
            </div>
          ))}
      </div>
    </div>

    <div className="lg:w-2/3">
      <div className="text-lg text-left p-8 bg-white rounded-lg shadow-lg mb-8">
        <strong>{t("Description")}:</strong> {voiture.description[language]}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 bg-white rounded-lg shadow-lg p-8">
        <div className="text-lg">
          <strong>{t("Carburant")}:</strong> {voiture.carburant.type[language]}
        </div>
        <div className="text-lg">
          <strong>{t("Transmission")}:</strong> {voiture.transmission.type[language]}
        </div>
        <div className="text-lg">
          <strong>{t("Corps")}:</strong> {voiture.corp.type[language]}
        </div>
        <div className="text-lg">
          <strong>{t("Année")}:</strong> {voiture.date}
        </div>
        <div className="text-lg">
          <strong>{t("Motopropulseur")}:</strong> {voiture.motopropulseur.type[language]}
        </div>
      </div>
      <div className="flex justify-end space-x-4">
        <button className="bg-bleuFonce text-white font-bold py-2 px-4 rounded-lg shadow-lg hover:bg-bleuFonce-dark transition-colors duration-300">
          Réserver
        </button>
        <button onClick={handleAjouterAuPanier} className="bg-orange text-white font-bold py-2 px-4 rounded-lg shadow-lg hover:bg-orange-dark transition-colors duration-300">
          Ajouter au panier
        </button>
      </div>
    </div>
  </div>
</div>

  );
}

export default DetailProduit;
