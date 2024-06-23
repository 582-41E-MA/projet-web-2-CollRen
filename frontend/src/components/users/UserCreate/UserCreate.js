import Bouton from '../../composants/Bouton/Bouton';
import {useState} from 'react';
import ChampText from '../../partialsFormulaire/ChampText/ChampText';


function UserCreate () {

    const [nom, setNom] = useState('')
    const [courriel, setCourriel] = useState('')    
    const [mdp, setMDP] = useState('')
    const [utilisateur, setUtilisateurs] = useState("")

  const addUser = () => {
    console.log("function AddUser");
  }

   function createUser (event) {
       console.log("createUser");
    }
  
    return (

        <section className='UserCreate'>
            <form onSubmit={createUser}>
                <h2> {t("CreateUser.soustitre")}</h2>

                <ChampText
                    mandatory={true} 
                    label="Character" 
                    name="character"
                    placeholder="Character's name"
                    content={character} 
                    whenChanged={ content => setCharacter(content)}/>

                <ChampText
                    mandatory={true} 
                    label="Character" 
                    name="character"
                    placeholder="Character's name"
                    content={character} 
                    whenChanged={ content => setCharacter(content)}/>
                        
                    <ChampText
                    mandatory={true} 
                    label="Character" 
                    name="character"
                    placeholder="Character's name"
                    content={character} 
                    whenChanged={ content => setCharacter(content)}/>
                          

                    
                <Bouton>
                    {t("CreateUser.btnSubmit")}
                </Bouton>
            </form>
        </section>
    )
}

export default UserCreate ;    	