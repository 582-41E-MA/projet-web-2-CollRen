

function ChampText (props) {

    const handleTyping = (event) => {
        props.whenChanged(event.target.value);
    }

    return (

        <div className="text-field"> 
            <label>
                {props.label}
            </label>
            <input value={props.content} onChange={handleTyping} required={props.mandatory} placeholder = {props.placeholder}/>
        </div>

    )
}

export default ChampText;