import React, { useState, useEffect } from 'react';
import axios from 'axios';

function VoituresIndex({ t }) {
    const [voitures, setVoitures] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/api/voitures')
            .then(response => {
                setVoitures(response.data);
            })
            .catch(error => {
                console.error('Erreur lors du chargement des voitures :', error);
            });
    }, []);

    return (
        <main>
            <div className="bg-white">
                <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                    <h2 className="sr-only">Voitures</h2>

                    <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                        {voitures.map(voiture => (
                            <a key={voiture.id} href={voiture.href} className="group">
                                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                                    <img
                                        src={voiture.imagemUrl}
                                        className="h-full w-full object-cover object-center group-hover:opacity-75"
                                        alt={`${voiture.name}`}
                                    />
                                </div>
                                <h3 className="mt-4 text-sm text-gray-700">{voiture.name}</h3>
                                <p className="mt-1 text-lg font-medium text-gray-900">{voiture.price}</p>
                                <p className="mt-1 text-sm text-gray-500">{voiture.model.type}</p>
                                <p className="mt-1 text-sm text-gray-500">{voiture.carburant.type}</p>
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </main>
    );
}

export default VoituresIndex;
