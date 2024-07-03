// ConstructeurUpdate.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import MenuDashboardAdmin from '../../dashboards/MenuDashboardAdmin/MenuDashboardAdmin';
import ChampText from '../../partialsFormulaire/ChampText/ChampText';
import Bouton from '../../partialsFormulaire/Bouton/Bouton';

function ConstructeurUpdate({ t }) {
    const { id } = useParams();
    const [constructeurType, setConstructeurType] = useState('');

    useEffect(() => {
        const fetchConstructeur = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/constructeurs/${id}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setConstructeurType(data.type);
            } catch (error) {
                console.error('Error fetching constructeur:', error);
            }
        };

        fetchConstructeur();
    }, [id]);

    const handleChange = (event) => {
        const { value } = event.target;
        setConstructeurType(value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch(`http://localhost:5000/api/constructeurs/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ type: constructeurType })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            alert('Constructeur updated successfully!');
        } catch (error) {
            console.error('Error updating constructeur:', error);
            alert('Error updating constructeur. Please try again.');
        }
    };

    return (
        <div className="flex">
            <div>
                <MenuDashboardAdmin t={t} />
            </div>

            <div className='flex flex-col '> 
                <h2 className="mx-[4rem] mt-24">{t("constructeurUpdate_titre")}</h2>
                <div className="w-[120%] mx-[4rem] mt-12 bg-[#F96C25] rounded-lg">
                    <form onSubmit={handleSubmit} className="p-3 bg-[#21283B] rounded-lg">
                        <div className="mb-3">
                            <ChampText
                                label={t("constructeurType_label")}
                                type="text"
                                className="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded"
                                value={constructeurType}
                                onChange={handleChange}
                            />
                        </div>
                        <Bouton
                            type="submit"
                            className="inline-block align-middle text-center select-none border font-normal whitespace-no-wrap rounded py-1 px-3 leading-normal no-underline bg-blue-600 text-white hover:bg-blue-600"
                        >
                            {t("btnSubmit")}
                        </Bouton>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ConstructeurUpdate;
