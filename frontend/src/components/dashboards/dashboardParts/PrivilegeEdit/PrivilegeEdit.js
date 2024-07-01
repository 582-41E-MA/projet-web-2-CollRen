import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import MenuDashboardAdmin from '../../MenuDashboardAdmin/MenuDashboardAdmin';
import ChampText from '../../../partialsFormulaire/ChampText/ChampText';
import Bouton from '../../../partialsFormulaire/Bouton/Bouton';

function PrivilegeEdit({ t, changeLanguage }) {
    const { id } = useParams(); 
    const [formData, setFormData] = useState({
        privilege_en: '',
        privilege_fr: ''
    });

    useEffect(() => {
        const fetchPrivilege = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/privileges/${id}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();

                // Verifica se data.type é definido e converte para objeto JavaScript
                const privilegeData = {
                    privilege_en: '',
                    privilege_fr: ''
                };

                if (data.type) {
                    const parsedType = JSON.parse(data.type);
                    privilegeData.privilege_en = parsedType.en;
                    privilegeData.privilege_fr = parsedType.fr;
                }

                setFormData(privilegeData);
            } catch (error) {
                console.error('Error fetching privilege:', error);
            }
        };

        // Chama a função para carregar os detalhes do privilégio apenas se id estiver definido
        if (id) {
            fetchPrivilege();
        }
    }, [id]);

    // Função para lidar com a alteração nos campos do formulário
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    // Função para lidar com o envio do formulário de atualização
    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch(`http://localhost:5000/api/privileges/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    privilege_en: formData.privilege_en,
                    privilege_fr: formData.privilege_fr,
                    // Se necessário, converta novamente para o formato esperado pela API
                    type: JSON.stringify({
                        en: formData.privilege_en,
                        fr: formData.privilege_fr
                    })
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            // Para demonstração, alerta de sucesso
            alert('Privilege updated successfully!');
        } catch (error) {
            console.error('Error updating privilege:', error);
            alert('Error updating privilege. Please try again.');
        }
    };

    // Renderização do componente
    return (
        <div className="flex">
            <div>
                <MenuDashboardAdmin t={t} />
            </div>

            <div className="w-[30%] mx-[4rem] mt-24">
                <h2 className="p-3">{t("privilegeEdit.titre")}</h2>

                <form onSubmit={handleSubmit} className="p-3">
                    <div className="mb-3">
                        <ChampText
                            label={"Privilege in English"}
                            type="text"
                            className="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded"
                            id="privilege_en"
                            name="privilege_en"
                            value={formData.privilege_en}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-3">
                        <ChampText
                        label={"Privilege in French"}
                            type="text"
                            className="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded"
                            id="privilege_fr"
                            name="privilege_fr"
                            value={formData.privilege_fr}
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
    );
}

export default PrivilegeEdit;
