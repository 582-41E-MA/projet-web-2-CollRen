import { useNavigate } from 'react-router-dom';
import Bouton from '../../partialsFormulaire/Bouton/Bouton';
import ChampText from '../../partialsFormulaire/ChampText/ChampText';
import './Login.css'

function Login({ t, handleLogin }) {
    const navigate = useNavigate();

    async function handleLoginWithRedirect(e) {
        const result = await handleLogin(e);

        if (result.success) {
            const privId = result.privId;
            
            if (privId === 3) {
                navigate(`/client`);
            } else {
                navigate(`/admin`);
            }
        }

    }
   
    return (

        <main className="main-background">
            <div className="form-container">
                <h1 className="text-4xl font-titre font-bold">{t("login.titre")}</h1>
                <form className='form-inner' onSubmit={handleLoginWithRedirect}>
                    <ChampText type="text" name="nomUtilisateur" placeholder={t("login.nomUtilisateur")} />
                    <ChampText type="password" name="mdp" placeholder={t("login.mdp")} />
                    <div className="flex justify-center">
                        <Bouton>Login</Bouton>
                    </div>
                    </form>
            </div>
  
        </main>
    );
}

export default Login;