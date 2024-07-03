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
                const response = await fetch('http://localhost:5000/api/constructeurs');
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
            const response = await fetch(`http://localhost:5000/api/constructeurs/${id}`, {
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
        <main className="flex">
            <div>
                <MenuDashboardAdmin t={t} />
            </div>

            <div className="w-[30%] mx-[4rem] mt-24">
                <h1>{t("constructeurIndex_titre")}</h1>

                <Link to={"/constructeur-create"}><p className='my-[1rem]'>+ {t("constructeurIndex_create")}</p></Link>

                <table className="w-[60%] divide-y divide-gray-200 bg-[#21283B] my-[2rem] rounded-lg">
                    <thead>
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-large text-gray-500 uppercase tracking-wider">Type</th>
                            <th className="px-6 py-3 text-left text-xs font-large text-gray-500 uppercase tracking-wider">Action</th>
                        </tr>
                    </thead>
                    <tbody className="bg-[#21283B] divide-y divide-gray-200">
                        {constructeurs.map(constructeur => (
                            <tr key={constructeur.id}>
                                <td className="px-6 py-4 whitespace-nowrap text-white">{constructeur.type}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <Link to={`/constructeur-edit/${constructeur.id}`} className="gap-x-[1rem] bg-[#F96C25] hover:bg-[#868E9B] text-white font-bold py-2 px-4 rounded-full">
                                        {t("btnEditer")}
                                    </Link>
                                    <Bouton onClick={() => handleDeleteConstructeur(constructeur.id)}>
                                        {t("btnDeleter")}
                                    </Bouton>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </main>
    );
}

export default ConstructeurIndex;
