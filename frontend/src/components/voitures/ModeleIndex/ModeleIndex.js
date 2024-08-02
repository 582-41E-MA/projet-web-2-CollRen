import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import MenuDashboardAdmin from '../../dashboards/MenuDashboardAdmin/MenuDashboardAdmin';
import Bouton from '../../partialsFormulaire/Bouton/Bouton';

function ModeleIndex({ t }) {
    const [models, setModels] = useState([]);
    const [language, setLanguage] = useState(localStorage.getItem('langueChoisie'));

    useEffect(() => {
        const fetchModels = async () => {
            try {

                const response = await fetch(`${t("fetch")}modeles`);

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setModels(data);
            } catch (error) {
                console.error('Error fetching models:', error);
            }
        };

        fetchModels();
    }, [language]);



    const handleDeleteModel = async (id) => {
        try {
            const response = await fetch(`${t("fetch")}modeles/${id}`, {

                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const updatedModels = models.filter(model => model.id !== id);
            setModels(updatedModels);

            alert('Model deleted successfully!');
        } catch (error) {
            console.error('Error deleting model:', error);
            alert('Error deleting model. Please try again.');
        }
    };

    return (
        <main className="flex flex-wrap">
    <div className="w-full sm:w-auto">
        <MenuDashboardAdmin t={t} />
    </div>

    <div className="w-full sm:w-[80%] mx-4 sm:mx-[4rem] mt-24 mb-16 sm:mb-[4rem]">
        <h1 className="text-2xl sm:text-3xl text-[#21283B] mb-4">{t("modeleIndex_titre")}</h1>

        <Link to={"/model-create"}>
            <p className="text-sm sm:text-base my-2 sm:my-[1rem]">+ {t("modelIndex_create")}</p>
        </Link>

        <div className="overflow-x-auto">
            <table className="w-full divide-y divide-gray-200 bg-[#21283B] rounded-lg">
                <thead>
                    <tr>
                        <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Type</th>
                        <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Constructeur Type</th>
                        <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {models.map(model => (
                        <tr key={model.id}>
                            <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-white">{model.type}</td>
                            <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-white">{model.constructeur ? model.constructeur.type : '-'}</td>
                            <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                                <Link to={`/model-edit/${model.id}`}
                                    className="bg-[#F96C25] hover:bg-[#868E9B] text-white font-bold py-2 px-3 sm:px-4 rounded-full">
                                    {t("btnEditer")}
                                </Link>
                                <Bouton onClick={() => handleDeleteModel(model.id)}
                                    className="ml-2 px-4 py-2 font-medium text-white bg-red-600 rounded-md hover:bg-red-500 focus:outline-none focus:shadow-outline-red active:bg-red-600 transition duration-150 ease-in-out">
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

export default ModeleIndex;
