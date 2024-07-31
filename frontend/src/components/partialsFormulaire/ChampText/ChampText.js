function ChampText({ label, type, placeholder, mandatory, onChange, value, name }) {
    return (
        <div className="text-field font-soustitre"> 
            <label className="text-gray-400">
                {label}
            </label>
            <input 
                onChange={onChange} 
                required={mandatory} 
                placeholder={placeholder}
                type={type}
                value={value}
                name={name}
                className="text-bleuFonce my-2 mb-6 p-3 appearance-none block w-full bg-[#f5f5f5]  placeholder:text-bleuFonce rounded border focus:border-teal-500" 
            />
        </div>
    );
}

export default ChampText;
