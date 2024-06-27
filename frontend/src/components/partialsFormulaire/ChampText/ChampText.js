function ChampText({ label, type, placeholder, mandatory, onChange, value, name }) {
    return (
        <div className="text-field"> 
            <label>
                {label}
            </label>
            <input 
                onChange={onChange} 
                required={mandatory} 
                placeholder={placeholder}
                type={type}
                value={value}
                name={name}
                className="mb-4 p-2 appearance-none block w-full bg-gray-200 placeholder-gray-900 rounded border focus:border-teal-500" 
            />
        </div>
    );
}

export default ChampText;
