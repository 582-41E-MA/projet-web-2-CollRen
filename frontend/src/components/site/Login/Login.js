import Bouton from "../../partialsFormulaire/Bouton/Bouton";
import ChampText from "../../partialsFormulaire/ChampText/ChampText";
import {useState} from "react";



function Login ({t}) {

    const [courriel, setCourriel] = useState("");
    const [mdp, setMdp] = useState("");
   

    function login (e) {
        e.preventDefault();
        console.log(e);

         //Clear form
         e.target.reset();
       
    }

    return (

        <main className="container mx-auto p-4 mt-12 bg-white flex flex-col items-center justify-center text-gray-700">
            <div className="w-10/12 sm:w-8/12 md:w-6/12 lg:w-5/12 xl:w-4/12 mb-4">
                <h1 className="text-4xl font-semibold">{t("login.titre")}</h1>
            </div>
            <form onSubmit={login} className="w-10/12 sm:w-8/12 md:w-6/12 lg:w-5/12 xl:w-4/12 mb-6">

                <div>
                    <ChampText  
                    label={t("login.courriel")} 
                    type="email" 
                    placeholder={t("login.courrielPlaceHolder")}
                    content={courriel}
                    whenChanged = {content => setCourriel(content)}
                    required />
                </div>
      
                <div>
                    <ChampText  
                    label={t("login.mdp")} 
                    type="text" 
                    placeholder={t("login.mdpPlaceHolder")}
                    content={mdp}
                    whenChanged = {content => setMdp(content)}
                    required />
                </div>

                <div className="flex items-center">
                    <Bouton type="submit">{t("login.btn")}</Bouton>
                </div>
            </form>
        </main>
    )
}

export default Login;