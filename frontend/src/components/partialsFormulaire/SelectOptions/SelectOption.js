function SelectOption(props){
    const index = props.index || ''
    const type = props.item.type || props.item
    return (
        <option key={index} value={type} > {type}</option>
    )
}
export default SelectOption