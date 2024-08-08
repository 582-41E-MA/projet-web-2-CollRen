// ConstructeurIndex.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import MenuDashboardAdmin from '../../dashboards/MenuDashboardAdmin/MenuDashboardAdmin';
import Bouton from '../../partialsFormulaire/Bouton/Bouton';

function ConstructeurIndex({ t }) {
    const [constructeurs, setConstructeurs] = useState([]);

    useEffect(() => {
        const fetchConstructeurs = async () => {
            try {
                const response = await fetch(`${t("fetch")}constructeurs`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setConstructeurs(data);
            } catch (error) {
                console.error('Error fetching constructeurs:', error);
            }
        };

        fetchConstructeurs();
    }, []);

    const handleDeleteConstructeur = async (id) => {
        try {
            const response = await fetch(`${t("fetch")}constructeurs/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const updatedConstructeurs = constructeurs.filter(constructeur => constructeur.id !== id);
            setConstructeurs(updatedConstructeurs);

            alert('Constructeur deleted successfully!');
        } catch (error) {
            console.error('Error deleting constructeur:', error);
            alert('Error deleting constructeur. Please try again.');
        }
    };

    return (
        <main className="flex flex-wrap sm:flex-nowrap">
    <div className="w-full sm:w-[25%] sm:pr-4">
        <MenuDashboardAdmin t={t} />
    </div>

    <div className="w-full sm:w-[75%] mx-4 pr-3 sm:mx-0 mt-24 mb-16 sm:mb-24 ">
        <h1 className="text-bleuFonce text-xl sm:text-2xl">{t("constructeurIndex_titre")}</h1>

        <Link to={"/constructeur-create"}>
            <p className="my-4 sm:my-6 text-orange-600 font-semibold">+ {t("constructeurIndex_create")}</p>
        </Link>

        <div className="overflow-x-auto">
            <table className="w-full divide-y divide-gray-200 bg-[#21283B] my-4 sm:my-6 rounded-lg">
                <thead>
                    <tr>
                        <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                        <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                    </tr>
                </thead>
                <tbody className="bg-[#21283B] divide-y divide-gray-200">
                    {constructeurs.map(constructeur => (
                        <tr key={constructeur.id}>
                            <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-white">{constructeur.type}</td>
                            <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                                <Link to={`/constructeur-edit/${constructeur.id}`} className="bg-[#F96C25] hover:bg-[#868E9B] text-white font-bold py-2 px-4 rounded-full mx-2 sm:mx-[1rem]">
                                    {t("btnEditer")}
                                </Link>
                                <Bouton 
                                    onClick={() => handleDeleteConstructeur(constructeur.id)}
                                    className="bg-red-600 hover:bg-red-500 text-white font-semibold py-2 px-4 rounded-full"
                                >
                                    {t("btnDeleter")}
                                </Bouton>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

    </div>
</main>


    );
}

export default ConstructeurIndex;
