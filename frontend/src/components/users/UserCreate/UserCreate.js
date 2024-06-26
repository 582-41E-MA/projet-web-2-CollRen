import Bouton from '../../partialsFormulaire/Bouton/Bouton';
import {useState} from 'react';
import ChampText from '../../partialsFormulaire/ChampText/ChampText';

function UserCreate ({t}) {

    const [prenom, setPrenom] = useState('');
    const [nom, setNom] = useState('');
    const [courriel, setCourriel] = useState('');    
    const [mdp, setMdp] = useState('');
    const [privilegeId, setPrivilegeId] = useState('3');

    function createUser (e) {
        e.preventDefault();
        console.log("create user");

        const newUser = {
            prenom: prenom,
            nom: nom,
            courriel: courriel,
            mdp: mdp,
            privilege_id: privilegeId
        };

        fetch('http://localhost:5000/api/utilisateurs', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newUser)
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            setNom('');
            setCourriel('');
            setMdp('');
            setPrivilegeId('');
        })
        .catch((error) => {
            console.error('Error:', error);
        });

        //Clear form
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
                    content={prenom} 
                    whenChanged={setPrenom}/>

                <ChampText
                    mandatory={true} 
                    label={t("CreateUser.nomLabel")}
                    type="text"
                    name="nom"
                    placeholder={t("CreateUser.nomPlaceHolder")}
                    content={nom} 
                    whenChanged={setNom}/>

                <ChampText
                    mandatory={true} 
                    label={t("CreateUser.courrielLabel")}
                    type="email"
                    name="courriel"
                    placeholder={t("CreateUser.courrielPlaceHolder")}
                    content={courriel} 
                    whenChanged={setCourriel}/>
                        
                <ChampText
                    mandatory={true} 
                    label={t("CreateUser.mdpLabel")}
                    type="password"
                    name="mdp"
                    placeholder={t("CreateUser.mdpLabel")}
                    content={mdp} 
                    whenChanged={setMdp}/>
                   

                <Bouton type="submit">
                    {t("CreateUser.btnSubmit")}
                </Bouton>
            </form>
        </main>
    )
}

export default UserCreate;
