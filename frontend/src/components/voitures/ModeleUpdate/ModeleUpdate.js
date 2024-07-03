import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import MenuDashboardAdmin from '../../dashboards/MenuDashboardAdmin/MenuDashboardAdmin';
import ChampText from '../../partialsFormulaire/ChampText/ChampText';
import Bouton from '../../partialsFormulaire/Bouton/Bouton';

function ModeleUpdate({ t }) {
    const { id } = useParams(); 
    const [type, setType] = useState('');

    useEffect(() => {
        const fetchModel = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/models/${id}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setType(data.type || '');
            } catch (error) {
                console.error('Error fetching model:', error);
            }
        };

        fetchModel();
    }, [id]);

    // Função para lidar com a alteração nos campos do formulário
    const handleChange = (event) => {
        const { value } = event.target;
        setType(value);
    };

    // Função para lidar com o envio do formulário de atualização
    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch(`http://localhost:5000/api/models/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ type })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            // Para demonstração, alerta de sucesso
            alert('Model updated successfully!');
        } catch (error) {
            console.error('Error updating model:', error);
            alert('Error updating model. Please try again.');
        }
    };

    // Renderização do componente
    return (
        <div className="flex">
            <div>
                <MenuDashboardAdmin t={t} />
            </div>

            <div className='flex flex-col '> 
                <h2 className="mx-[4rem] mt-24">{t("modeleUpdate_titre")}</h2>
                <div className="w-[120%] mx-[4rem] mt-12 bg-[#F96C25] rounded-lg">
                    <form onSubmit={handleSubmit} className="p-3 bg-[#21283B] rounded-lg">
                        <div className="mb-3">
                            <ChampText
                                label={t("modeleType_label")}
                                type="text"
                                className="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded"
                                value={type}
                                onChange={handleChange}
                            />
                        </div>
                        <Bouton
                            type="submit"
                            className="inline-block align-middle text-center select-none border font-normal whitespace-no-wrap rounded py-1 px-3 leading-normal no-underline bg-blue-600 text-white hover:bg-blue-600"
                        >
                            {t("CreateUser.btnSubmit")}
                        </Bouton>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ModeleUpdate;
