import  { InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes <HTMLInputElement>{
    label: string;
    name: string;
}

export const InputForm = ({label, name, ...rest}: InputProps) => {
    return (
        <>
            <div className="flex flex-col pt-4">
                <label htmlFor={name} className="text-lg">
                    {label}
                </label>
                <input
                    type="text"
                    id={name}
                    {...rest}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline "
                />
            </div>
        </>
    )
}
