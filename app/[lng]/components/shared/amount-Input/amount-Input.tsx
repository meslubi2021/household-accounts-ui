'use client'

import React, { useState, useEffect } from 'react';
import { SlideMenu } from '..'
import { formatCurrency, formatNumber } from '../../../utils';

interface AmountInputProps {
  setAmount:  (amount: number) => void,
  input: string 
  setInput: React.Dispatch<React.SetStateAction<string>>
}

export const AmountInput: React.FC<AmountInputProps> = ({ setAmount, input, setInput }) => {
  const [ formattedInput, setFormattedInput ] = useState<string | undefined>(undefined);
  const [ isOpen, setIsOpen ] = useState(false);

  useEffect(() => {
    if(input === ''){
      setAmount(0);
    }else{
      setAmount(parseFloat(input));
    }
  }, [input])

  useEffect(() => {
    if(!isOpen) setFormattedInput(formatCurrency(input));
    else setFormattedInput(undefined);
  }, [isOpen])

  return (<>
    <div className="flex items-center mb-4 w-full" onClick={() => setIsOpen((pre) => !pre)}>
      <span className="me-2">$</span>
      <input
        type="text"
        value={formattedInput ? formattedInput : formatNumber(input)}
        readOnly
        className="w-full p-2 border border-gray-300 rounded"        
      />
      </div>
    <CalculatorPad input={input} setInput={setInput} isOpen={isOpen} close={() => setIsOpen(false)}/>
  </>
  );
};

interface CalculatorPadType {
  input: string
  setInput: React.Dispatch<React.SetStateAction<string>>
  isOpen: boolean
  close: () => void
}

const CalculatorPad: React.FC<CalculatorPadType> = ({input, setInput, isOpen, close}) => {


  const handleButtonClick = (value: string) => {
    setInput((prev) => prev + value);
  };

  const handleClear = () => {
    setInput('');
  };

  const handleCalculate = () => {
    try {
      const result = eval(input); // Note: eval is used here for simplicity; consider using a safer alternative
      setInput(result.toString());
    } catch (error) {
      setInput('ErroCLOSE');
    }
  };
  const handleBack = () => {
    setInput(input.substring(0, input.length - 1));
  };
  return(<>
    <SlideMenu isOpen={isOpen} close={close} height={48} position={"bottom"}>
      <div className="bg-white p-2 rounded w-full">
        <div className="grid grid-cols-4 gap-2">
          <button onClick={() => close()} className="bg-red-300 p-4 rounded text-white text-2xl">CLOSE</button>
          <button onClick={handleClear} className="bg-gray-500 p-4 rounded text-white text-2xl">AC</button>
          <button onClick={handleBack} className="bg-gray-500 p-4 rounded text-white text-2xl">BACK</button>
          <button onClick={() => handleButtonClick('/')} className="bg-orange-500 p-3 rounded text-white text-2xl">÷</button>

          <button onClick={() => handleButtonClick('7')} className="bg-gray-700 p-4 rounded text-white text-2xl">7</button>
          <button onClick={() => handleButtonClick('8')} className="bg-gray-700 p-4 rounded text-white text-2xl">8</button>
          <button onClick={() => handleButtonClick('9')} className="bg-gray-700 p-4 rounded text-white text-2xl">9</button>
          <button onClick={() => handleButtonClick('*')} className="bg-orange-500 p-4 rounded text-white text-2xl">×</button>

          <button onClick={() => handleButtonClick('4')} className="bg-gray-700 p-4 rounded text-white text-2xl">4</button>
          <button onClick={() => handleButtonClick('5')} className="bg-gray-700 p-4 rounded text-white text-2xl">5</button>
          <button onClick={() => handleButtonClick('6')} className="bg-gray-700 p-4 rounded text-white text-2xl">6</button>
          <button onClick={() => handleButtonClick('-')} className="bg-orange-500 p-4 rounded text-white text-2xl">-</button>

          <button onClick={() => handleButtonClick('1')} className="bg-gray-700 p-4 rounded text-white text-2xl">1</button>
          <button onClick={() => handleButtonClick('2')} className="bg-gray-700 p-4 rounded text-white text-2xl">2</button>
          <button onClick={() => handleButtonClick('3')} className="bg-gray-700 p-4 rounded text-white text-2xl">3</button>
          <button onClick={() => handleButtonClick('+')} className="bg-orange-500 p-4 rounded text-white text-2xl">+</button>

          <button onClick={() => handleButtonClick('00')} className="bg-gray-700 p-4 rounded text-white text-2xl">00</button>
          <button onClick={() => handleButtonClick('0')} className="bg-gray-700 p-4 rounded text-white text-2xl">0</button>
          <button onClick={() => handleButtonClick('.')} className="bg-gray-700 p-4 rounded text-white text-2xl">.</button>
          <button onClick={handleCalculate} className="bg-orange-500 p-4 rounded text-white text-2xl">=</button>
        </div>
      </div>
    </SlideMenu>
  </>)
} 
