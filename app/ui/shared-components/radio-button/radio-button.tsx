import React from 'react';

interface RadioButtonType {
    label:string,
    name:string, 
    value:string, 
    checked:boolean, 
    onChange: (e:any) => void
}
const RadioButton:React.FC<RadioButtonType> = ({ label, name, value, checked, onChange }) => {
  return (
    <label className="flex items-center space-x-2">
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        className="form-radio text-blue-500 h-5 w-5 cursor-pointer"
      />
      <span className="text-gray-700 cursor-pointer"  style={{ paddingTop: '4px' }}>{label}</span>
    </label>
  );
};

export { RadioButton };