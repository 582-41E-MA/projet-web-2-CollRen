import React from 'react';


    function Tuile(){

    
    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <img className="w-full h-48 object-cover" src="" alt='' />
            <div className="p-4">
                <h2 className="text-xl font-bold">Mazda 3</h2>
                <p className="text-gray-700">Prix: 9000$</p>
                <div className="mt-2">
                    <p className="text-gray-500">Essence</p>
                    <p className="text-gray-500">Automatique</p>
                </div>
            </div>
        </div>
    );
}

export default Tuile;
