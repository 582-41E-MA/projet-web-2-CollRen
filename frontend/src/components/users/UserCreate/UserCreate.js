import Bouton from '../../partialsFormulaire/Bouton/Bouton';
import { useState } from 'react';
import ChampText from '../../partialsFormulaire/ChampText/ChampText';

function UserCreate({ t }) {
    const [prenom, setPrenom] = useState('');
    const [nom, setNom] = useState('');
    const [courriel, setCourriel] = useState('');    
    const [mdp, setMdp] = useState('');
    const [privilegeId, setPrivilegeId] = useState('3');
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'prenom') setPrenom(value);
        if (name === 'nom') setNom(value);
        if (name === 'courriel') setCourriel(value);
        if (name === 'mdp') setMdp(value);
       
    }

    function createUser(e) {
        e.preventDefault();
        console.log("create user");

        const newUser = {
            prenom: prenom,
            nom: nom,
            courriel: courriel,
            mdp: mdp,
            privilege_id: privilegeId
        };

        console.log(newUser);

        fetch('http://localhost:5000/api/utilisateurs', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newUser)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Success:', data);
            setPrenom('');
            setNom('');
            setCourriel('');
            setMdp('');
            setPrivilegeId('3');
            setError('');
        })
        .catch((error) => {
            console.error('Error:', error);
            setError('Some error occurred while creating the user.');
        });

        // Clear form
        e.target.reset();
    }

    return (
        <main className="container mx-auto p-4 mt-12 bg-white flex flex-col items-center justify-center text-gray-700">
            <div className="w-10/12 sm:w-8/12 md:w-6/12 lg:w-5/12 xl:w-4/12 mb-4">
                <h2 className="py-6">{t("CreateUser.soustitre")}</h2>
            </div>

            <form onSubmit={createUser} className="w-10/12 sm:w-8/12 md:w-6/12 lg:w-5/12 xl:w-4/12 mb-6">
                <ChampText
                    mandatory={true} 
                    label={t("CreateUser.prenomLabel")}
                    type="text"
                    name="prenom"
                    placeholder={t("CreateUser.prenomPlaceHolder")}
                    value={prenom} 
                    onChange={handleChange}
                />

                <ChampText
                    mandatory={true} 
                    label={t("CreateUser.nomLabel")}
                    type="text"
                    name="nom"
                    placeholder={t("CreateUser.nomPlaceHolder")}
                    value={nom} 
                    onChange={handleChange}
                />

                <ChampText
                    mandatory={true} 
                    label={t("CreateUser.courrielLabel")}
                    type="email"
                    name="courriel"
                    placeholder={t("CreateUser.courrielPlaceHolder")}
                    value={courriel} 
                    onChange={handleChange}
                />
                        
                <ChampText
                    mandatory={true} 
                    label={t("CreateUser.mdpLabel")}
                    type="password"
                    name="mdp"
                    placeholder={t("CreateUser.mdpPlaceHolder")}
                    value={mdp} 
                    onChange={handleChange}
                />

            

                {error && <p className="text-red-500">{error}</p>}

                <Bouton type="submit">{t("CreateUser.btnSubmit")} </Bouton>
            </form>
        </main>
    );
}

export default UserCreate;
