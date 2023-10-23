import React, { InputHTMLAttributes } from 'react'

interface InputRadioProps extends InputHTMLAttributes <HTMLInputElement>{
    label: string;
    // htmlFor: string;
}

export const InputRadio = ({label, ...rest}: InputRadioProps) => {
    return (
        <>
            <div className="flex">
                <div className="flex items-center mr-4">
                    <label  className="ml-2 mr-2 text-sm font-medium text-gray-900 ">{label}</label>
                    <input type="radio" {...rest} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                </div>
                

            </div>
        </>
    )
}
