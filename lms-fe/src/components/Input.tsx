import { ChangeEvent } from "react";




interface InputProps{
    type?:string,
    placeholder:string,
    label?:string,
    name?:string,
    value:string,
    error?:boolean,
    classname?:string,
    onChange:(e: ChangeEvent<HTMLInputElement>) => void
    required?:boolean
}


export const Input: React.FC<InputProps> = ({
    type,placeholder,label,name,value,error,onChange
}) => {
    return <div className="mb-4 p-2 ">
        <label className="block text-sm  font-extrabold  pl-1 capitalize   mb-1" >{label}</label>
        <input 
            type={type}
            placeholder={placeholder}
            name={name}
            onChange={onChange}
            value={value}
            required={false}
            className={`w-full p-2 border ${error ? 'border-red-200' : 'border-gray-200 '} rounded-md text-black`}
        />
        { error && <span    className="text-red-400 text-sm mt-1" >Error: Invalid input</span>  }
    </div>
}

export default Input;