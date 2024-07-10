import React from 'react';
import { Link } from 'react-router-dom';

function Tuile({ voiture, language }) {
    const principaleImage = voiture.images.find(image => image.est_principale === 1 && image.voiture_id === voiture.id);

    return (
        <div className="border border-gray-300 rounded-lg overflow-hidden w-72 bg-white shadow-md">
            
                {principaleImage && (
                    <img 
                        src={`/imgs/${principaleImage.chemin}`} 
                        alt={voiture.description[language]} 
                        className="w-full h-48 object-cover"
                    />
                )}
                <div className="p-4 flex flex-col">
                    <div className="flex items-center justify-between py-2">
                        <button className="text-gray-600 focus:outline-none">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" fill="currentColor" width="24px" height="24px" className="mr-2 fill-orange">
                                <path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96zM252 160c0 11 9 20 20 20h44v44c0 11 9 20 20 20s20-9 20-20V180h44c11 0 20-9 20-20s-9-20-20-20H356V96c0-11-9-20-20-20s-20 9-20 20v44H272c-11 0-20 9-20 20z"/>
                            </svg>
                        </button>
                        <button className="text-gray-600 focus:outline-none">
                            <svg className="w-6 h-6 fill-red-400" viewBox="0 0 24 24">
                                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.85 4.5 2.14C13.09 3.85 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                            </svg>
                        </button>
                    </div>
                    <div className='flex justify-between'>
                        <h2 className="text-xl font-bold text-gray-900">{voiture.modele.type}</h2>
                        <p className="font-bold text-gray-700">{voiture.prix} $ </p>
                    </div>
                    {/* <p className="text-gray-700 mt-1">{voiture.description[language]}</p> */}
                    <p className="text-gray-700 mt-2">{voiture.transmission.type[language]}</p>
                    {/* <p className="text-gray-700 mt-1">{voiture.motopropulseur.type[language]}</p> */}
                    <p className="text-gray-700 mt-1">{voiture.carburant.type[language]}</p>
                    {/* <p className="text-gray-700 mt-1">{voiture.corp.type[language]}</p> */}
                </div>
                <div className="flex justify-end mt-1 pr-4 pb-4">
                    <button className="bg-orange text-white font-titre p-2 rounded-lg">Réserver</button>
                    <Link to={`/voitures/${voiture.id}`} className="block"> 
                        <button className="bg-bleuFonce text-white font-titre ml-4 p-2 rounded-lg">+ de détails</button>
                    </Link>
                </div>
        </div>
    );
}

export default Tuile;
