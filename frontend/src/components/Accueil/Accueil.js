import React from "react";
import "./Accueil.css";
import BarreRecherche from "../site/BarreRecherche/BarreRecherche";
import { Link } from "react-router-dom";

function Accueil({ t }) {
  const language = localStorage.getItem("langueChoisie") || "en";

  return (
    <div>
      <div className="accueil-container">
        <div className="main-content">
          <section className="background-section bg-neutral-100 relative">
            <video autoPlay muted loop className="video-background">
              <source src="/gifs/compteur-gif.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <div className="content grid lg:grid-cols-2 items-center justify-items-center gap-5 absolute inset-0">
              <div className="order-2 lg:order-1 flex flex-col justify-center items-center">
                <p className="text-4xl font-titre font-bold md:text-7xl text-orange text-left">
                  {t("accueil.titre1")}
                </p>
                <p className="text-left text-4xl text-white font-bold md:text-7xl">
                  {t("accueil.titre2")}
                </p>
                <p className="text-left mt-2 text-white text-sm md:text-lg">
                  {t("accueil.titre3")}
                </p>
               <Link to="/catalogue" >
                  <button className="text-lg md:text-2xl bg-orange rounded-xl border-solid border-bleuFonce text-white py-2 px-5 mt-10 hover:bg-zinc-800">
                    {t("accueil.btnCta")}
                  </button>
                </Link> 
              </div>
            </div>
          </section>
          <section className="other-section bg-gray-200 py-10">
            <div className="container mx-auto">
              <div className="flex flex-col lg:flex-row">
                <div className="lg:w-1/2 p-8">
                  <BarreRecherche t={t} language={language} />
                </div>
                <div className="lg:w-1/2 p-8">
                  <h2 className="text-3xl font-bold text-center text-gray-800">
                    Vos préférences pour le véhicule ?
                  </h2>
                  <div className="mt-8 flex justify-center">
                    <form className="grid grid-cols-1 gap-4 w-full">
                      <div>
                        <label htmlFor="marque" className="block text-gray-700">
                          Marque :
                        </label>
                        <select
                          id="marque"
                          name="marque"
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        >
                          <option value="">Sélectionnez une marque</option>
                        </select>
                      </div>
                      <div>
                        <label htmlFor="modele" className="block text-gray-700">
                          Modèle :
                        </label>
                        <select
                          id="modele"
                          name="modele"
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        >
                          <option value="">Sélectionnez un modèle</option>
                        </select>
                      </div>
                      <div>
                        <label htmlFor="annee" className="block text-gray-700">
                          Année :
                        </label>
                        <select
                          id="annee"
                          name="annee"
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        >
                          <option value="">Sélectionnez une année</option>
                        </select>
                      </div>
                      <div className="flex justify-center mt-4">
                        <button
                          type="submit"
                          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange hover:bg-bleuFonce focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-bleuFonce"
                        >
                          Chercher
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="py-2 ">
            <h2 className="text-3xl my-8 font-bold text-center text-gray-800">
              Vos préférences pour le véhicule ?
            </h2>
            <div className="container mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="col-span-1">
                  <div className="bg-white rounded-lg shadow-md mb-4">
                    <div
                      className="h-64 bg-cover bg-center"
                      style={{ backgroundImage: "url('/imgs/tucson.jpg')" }}
                    >
                      <div className="p-4 bg-black bg-opacity-50 h-full flex items-end">
                        <p className="text-white text-lg font-bold">
                          Voiture à moins de 12000$
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white rounded-lg shadow-md">
                    <div
                      className="h-64 bg-cover bg-center"
                      style={{ backgroundImage: "url('/imgs/tucson.jpg')" }}
                    >
                      <div className="p-4 bg-black bg-opacity-50 h-full flex items-end">
                        <p className="text-white text-lg font-bold">
                          Voiture à moins de 15000$
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-span-1 flex flex-col">
                    <div className="bg-white rounded-lg shadow-md  flex-1">
                        <div
                        className="h-full bg-cover bg-center rounded-lg"
                        style={{ 
                            backgroundImage: "url('/imgs/legende.jpg')",
                            height: "100%", // Ajustez la hauteur selon vos besoins
                        }}
                        >
                        <div className="p-4 bg-black bg-opacity-50 h-full flex flex-col justify-end rounded-lg">
                            <p className="text-white text-lg font-bold">
                            Voitures iconiques
                            </p>
                        </div>
                        </div>
                    </div>
                    </div>

                <div className="col-span-1">
                  <div className="bg-white rounded-lg shadow-md mb-4">
                    <div
                      className="h-64 bg-cover bg-center"
                      style={{ backgroundImage: "url('/imgs/tucson.jpg')" }}
                    >
                      <div className="p-4 bg-black bg-opacity-50 h-full flex items-end">
                        <p className="text-white text-lg font-bold">
                          Voiture à moins de 20000$
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white rounded-lg shadow-md">
                    <div
                      className="h-64 bg-cover bg-center"
                      style={{ backgroundImage: "url('/imgs/tucson.jpg')" }}
                    >
                      <div className="p-4 bg-black bg-opacity-50 h-full flex items-end">
                        <p className="text-white text-lg font-bold">
                          Voiture à moins de 25000$
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default Accueil;
