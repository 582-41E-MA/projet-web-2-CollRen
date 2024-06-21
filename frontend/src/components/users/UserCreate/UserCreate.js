import Bouton from '../../composants/Bouton/Bouton';
import {useState} from 'react';
import ChampText from '../../partialsFormulaire/ChampText/ChampText';


const Form = (props) => {

    const [character, setCharacter] = useState('')
    const [role, setRole] = useState('')    
    const [img, setImage] = useState('')
    const [race, setRace] = useState('')
    const [faction, setFaction] = useState('')

    const whenSubmiting = (event) => {
        event.preventDefault();
        props.addedChar({
            character,
            role,
            img,
            race,
            faction
        })
        setCharacter('')
        setRole('')
        setImage('')
        setRace('')
        event.currentTarget.reset()
    }
  
    return (

        <section className='formulaire'>
            <form onSubmit={whenSubmiting}>
                <h2>Inform character, class and race</h2>
                <ChampText
                    mandatory={true} 
                    label="Character" 
                    name="character"
                    placeholder="Character's name"
                    content={character} 
                    whenChanged={ content => setCharacter(content)}/>

        
                <TextField 
                    label="Image" 
                    name="img"
                    placeholder="Place an image's url"
                    content = {img}
                    whenChanged = { content => setImage(content)}
                /> 

                <Dropdown 
                    mandatory={true}
                    label="Race"
                    name="race"
                    list={props.racesList}
                    content = {race}
                    whenChanged = {content => setRace(content)}
                    />

                <Dropdown 
                    mandatory={true}
                    label="Class"
                    name="role"
                    list={props.rolesList}
                    content = {role}
                    whenChanged = {content => setRole(content)}
                    />

                <Dropdown 
                    mandatory={true}
                    label="Faction"
                    name="faction"
                    list={props.factionsList}
                    content = {faction}
                    whenChanged = {content => setFaction(content)}
                    />
                    
                <Bouton>
                    Save
                </Bouton>
            </form>
        </section>
    )
}

export default Form;    	