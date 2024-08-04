"use client";

import React, { useState } from 'react';
import { EyeIcon, EyeSlashIcon, XCircleIcon } from '@heroicons/react/24/outline';
import classNames from 'classnames';
import "./style.scss";

interface CustomInputType {
    type?: "email" | "password" | "text" | 'number'
    placeholder?: string
    onChange: (value: string, type: string) => void
}

export const CustomInput:React.FC<CustomInputType> = ({type = 'text', placeholder = '', onChange}) => {
    const [value, setValue] = useState('');
    const [focused, setFocused] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const handleFocus = () => setFocused(true);
    const handleBlur = () => setFocused(value.length > 0);
    const handleChange = (e:any) => {
        setValue(e.target.value);
        onChange(e.target.value, e.target.type);
    };
    const handleClear = () => {
        setValue('')
        setFocused(false);
    };
    const togglePasswordVisibility = () => setShowPassword(!showPassword);

    return (
        <div         
            className={classNames("relative w-full px-[15px] pt-[27px] pb-[8px] h-[60px] border rounded-md shadow-sm", 
                {"ring ring-red-300 ring-opacity-50": focused === true})
        }>
          <input
            type={type === "password" && showPassword ? 'text' : type}
            value={value}
            onBlur={handleBlur}
            onChange={handleChange}  
            onFocus={handleFocus}
            className="relative block w-[100%] h-[22] focus-visible:outline-none hover:cursor-pointer -internal-autofill-selected:none"
          />
          <label
            className={`absolute left-3 transition-all duration-300 text-gray-400 ${
              focused || value.length ? 'top-2 left-4 text-[12px]' : 'top-5 text-[16px]'
            } pointer-events-none`}
          >
            {placeholder}
          </label>
            {value && type === "password" && (
                <button
                type="button"
                onClick={togglePasswordVisibility}
                className={classNames("absolute right-10 top-2/4 transform -translate-y-2/4 text-gray-400 hover:text-gray-700", 
                    {"right-3": type !== 'password'}
                )}>
                    {showPassword ? <EyeIcon width="18px" /> : <EyeSlashIcon width="18px" />}
                </button>)
            }
            {value && (
                <button
                type="button"
                onClick={handleClear}
                className="absolute right-3 top-2/4 transform -translate-y-2/4 text-gray-400 hover:text-gray-700"
                >
                <XCircleIcon width="18px" />
                </button>
            )}
        </div>)
}