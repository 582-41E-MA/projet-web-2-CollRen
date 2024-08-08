import SelectOption from "./SelectOption"

function SelectOptions(props) {
    let lesOptions = ''
    let classes = "block w-full p-2 border border-gray-300 rounded-md"

    if (props.list.length == 0) {
        classes = "block w-full p-2 border border-gray-300 opacity-15 rounded-md pointer-events-none"
    } else {
        lesOptions = props.list.map((item, index) => {
            return <SelectOption key={index} item={item}/>
        })
    }

    const whenTyping = (event) => {
        props.whenChanged(event);
        // props.whenChanged(event.target.value);
    }

    return (
        <div className='liste-select'>
            <label className="block text-gray-700 font-bold mb-2">
                {props.itemAFiltrer}
            </label>
            <select className={classes} onChange={whenTyping} data-select={props.itemAFiltrer}>
                <option value={props.itemAFiltrer}>{props.itemAFiltrer}</option>
                {lesOptions}
            </select>
        </div>
    )
}
export default SelectOptions