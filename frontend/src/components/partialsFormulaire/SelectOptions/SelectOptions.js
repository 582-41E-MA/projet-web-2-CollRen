

function SelectOptions(props) {
    console.log(props)



    

    const whenTyping = (event) => {
     
        props.whenChanged(event.target.value);
    }

    return (
        <div className='liste-select'>
            <label className="block text-gray-700 font-bold mb-2">
                {props.label}
            </label>
            <select className="block w-full p-2 border border-gray-300 rounded-md" onChange={whenTyping}>
                <option value='vide'></option>
                {props.list.map(item => <option key={item.id} value={item.id}> {item.type}</option> )}
            </select>
        </div>
    )
}

export default SelectOptions