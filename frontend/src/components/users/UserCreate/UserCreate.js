import Bouton from '../../partialsFormulaire/Bouton/Bouton';
import {useState} from 'react';
import ChampText from '../../partialsFormulaire/ChampText/ChampText';


function UserCreate ({t}) {

    const [nom, setNom] = useState('')
    const [courriel, setCourriel] = useState('')    
    const [mdp, setMdp] = useState('')
    const [utilisateur, setUtilisateurs] = useState("")


   function createUser (e) {
    e.preventDefault();
    console.log("create user");

     //Clear form
     e.target.reset();
    }
  
    return (

        <main className="container mx-auto p-4 mt-12 bg-white flex flex-col items-center justify-center text-gray-700">
            <div className="w-10/12 sm:w-8/12 md:w-6/12 lg:w-5/12 xl:w-4/12 mb-4">
                <h2 className="py-6"> {t("CreateUser.soustitre")}</h2>
            </div>

            <form onSubmit={createUser} className="w-10/12 sm:w-8/12 md:w-6/12 lg:w-5/12 xl:w-4/12 mb-6">
                

                <ChampText
                    mandatory={true} 
                    label={t("CreateUser.nomLabel")}
                    name="nom"
                    placeholder={t("CreateUser.nomPlaceHolder")}
                    content={nom} 
                    whenChanged={nom => setNom(nom)}/>

                <ChampText
                    mandatory={true} 
                    label={t("CreateUser.courrielLabel")}
                    name="courriel"
                    placeholder={t("CreateUser.courrielPlaceHolder")}
                    content={courriel} 
                    whenChanged={ content => setCourriel(content)}/>
                        
                    <ChampText
                    mandatory={true} 
                    label={t("CreateUser.mdpLabel")}
                    name="mdp"
                    placeholder={t("CreateUser.mdpLabel")}
                    content={mdp} 
                    whenChanged={ content => setMdp(content)}/>
                          

                    
                <Bouton type="submit">
                    {t("CreateUser.btnSubmit")}
                </Bouton>
            </form>
        </main>
    )
}

export default UserCreate ;    	