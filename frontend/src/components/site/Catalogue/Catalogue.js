import React, { useState } from 'react';
import Tuile from '../Tuile/Tuile';
import Filtres from '../Filtres/Filtres';

function Catalogue() {
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    const toggleFilter = () => {
        setIsFilterOpen(!isFilterOpen);
    };

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
                <Filtres />
            </div>

            <div className="container mx-auto px-4 py-8">
                <h1 className="text-4xl font-bold text-center mb-8 text-bleuFonce">Catalogue de voitures</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {[...Array(8)].map((_, index) => (
                        <Tuile key={index} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Catalogue;
