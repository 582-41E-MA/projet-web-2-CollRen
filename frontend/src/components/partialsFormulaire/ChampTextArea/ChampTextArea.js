

function ChampTextArea (props) {

    const handleTyping = (event) => {
        props.whenChanged(event.target.value);
    }

    return (

        <div className="text-field"> 
            <label>
                {props.label}
            </label>
            <textarea value={props.content} onChange={handleTyping} required={props.mandatory} placeholder = {props.placeholder}></textarea>
        </div>

    )
}

export default ChampTextArea;