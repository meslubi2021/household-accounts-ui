'use client'

import React, { useState, useEffect } from 'react';
import { SlideMenu } from '..'
import { formatCurrency, formatNumber } from '@/app/lib/utils';

interface AmountInputProps {
  setAmount:  (amount: number) => void,
  input: string 
  setInput: React.Dispatch<React.SetStateAction<string>>
}

export const AmountInput: React.FC<AmountInputProps> = ({ setAmount, input, setInput }) => {
  const [ formattedInput, setFormattedInput ] = useState<string | undefined>(undefined);
  const [ isOpen, setIsOpen ] = useState(false);

  useEffect(() => {
    if(!isOpen) {
        if(input === ''){
          setAmount(0);
        }else{
          setAmount(parseFloat(input));
        }
      setFormattedInput(formatCurrency(input))
    }else setFormattedInput(undefined);
  }, [isOpen, input])

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
  const [ operator, setOperator ] = useState('');
  const [ isOperatoring, setIsOperatoring ] = useState(false);
  const [ previousValue, setPreviousValue ] = useState('');

  const handleButtonClick = (value: string) => {
    if(isOperatoring){
      setIsOperatoring(false);
      setPreviousValue(input);
      setInput(value);
    }else{
      setInput((prev) => {
        if(prev.includes(".") && value === '.') {
          return prev;
        }
        if(prev === '' && value === '0'){
          return prev;
        }
        if(prev === '' && value === '00'){
          return prev;
        }
        return prev + value
      });
    }
  };

  const handleClear = () => {
    setInput('');
    setIsOperatoring(false);
    setOperator('');
    setPreviousValue('');
  };

  const roundToPrecision = (value: number, precision: number = 10): number => {
    const factor = Math.pow(10, precision);
    return Math.round(value * factor) / factor;
  };
  const evaluateExpression = (expression: string): number => {
    try {
      // Replace the unsafe eval with a safer function evaluation
      const sanitizedExpression = expression.replace(/[^-()\d/*+.]/g, '');
      const result = Function('"use strict";return (' + sanitizedExpression + ')')();
      return roundToPrecision(result);
    } catch (e) {
      throw new Error('Invalid expression');
    }
  };
  const handleCalculate = () => {
    try {
      if(previousValue === "" || isOperatoring) return;
      const result = evaluateExpression(`${previousValue}${operator}${input}`);
      setInput(result.toString());
      setPreviousValue('');
    } catch (error) {
      setInput('ErroCLOSE');
    }
  };
  const handleBack = () => {
    setInput(input.substring(0, input.length - 1));
  };
  return(<>
    <SlideMenu isOpen={isOpen} close={close} heightPx={"407px"} position={"bottom"}>
      <div className="bg-white p-2 rounded w-full">
        <div className="grid grid-cols-4 gap-2">
          <button onClick={() => close()} className="bg-red-300 p-4 rounded text-white text-2xl active:bg-red-200">CLOSE</button>
          <button onClick={handleClear} className="bg-gray-500 p-4 rounded text-white text-2xl active:bg-gray-400">AC</button>
          <button onClick={handleBack} className="bg-gray-500 p-4 rounded text-white text-2xl active:bg-gray-400">BACK</button>
          <button onClick={() => {setOperator('/'); setIsOperatoring(true)}} className="bg-orange-500 p-3 rounded text-white text-2xl active:bg-orange-300">÷</button>

          <button onClick={() => handleButtonClick('7')} className="bg-gray-700 p-4 rounded text-white text-2xl active:bg-gray-500">7</button>
          <button onClick={() => handleButtonClick('8')} className="bg-gray-700 p-4 rounded text-white text-2xl active:bg-gray-500">8</button>
          <button onClick={() => handleButtonClick('9')} className="bg-gray-700 p-4 rounded text-white text-2xl active:bg-gray-500">9</button>
          <button onClick={() => {setOperator('*'); setIsOperatoring(true)}} className="bg-orange-500 p-4 rounded text-white text-2xl active:bg-orange-300">×</button>

          <button onClick={() => handleButtonClick('4')} className="bg-gray-700 p-4 rounded text-white text-2xl active:bg-gray-500">4</button>
          <button onClick={() => handleButtonClick('5')} className="bg-gray-700 p-4 rounded text-white text-2xl active:bg-gray-500">5</button>
          <button onClick={() => handleButtonClick('6')} className="bg-gray-700 p-4 rounded text-white text-2xl active:bg-gray-500">6</button>
          <button onClick={() => {setOperator('-'); setIsOperatoring(true)}} className="bg-orange-500 p-4 rounded text-white text-2xl active:bg-orange-300">-</button>

          <button onClick={() => handleButtonClick('1')} className="bg-gray-700 p-4 rounded text-white text-2xl active:bg-gray-500">1</button>
          <button onClick={() => handleButtonClick('2')} className="bg-gray-700 p-4 rounded text-white text-2xl active:bg-gray-500">2</button>
          <button onClick={() => handleButtonClick('3')} className="bg-gray-700 p-4 rounded text-white text-2xl active:bg-gray-500">3</button>
          <button onClick={() => {setOperator('+'); setIsOperatoring(true)}} className="bg-orange-500 p-4 rounded text-white text-2xl active:bg-orange-300">+</button>

          <button onClick={() => handleButtonClick('00')} className="bg-gray-700 p-4 rounded text-white text-2xl active:bg-gray-500">00</button>
          <button onClick={() => handleButtonClick('0')} className="bg-gray-700 p-4 rounded text-white text-2xl active:bg-gray-500">0</button>
          <button onClick={() => handleButtonClick('.')} className="bg-gray-700 p-4 rounded text-white text-2xl active:bg-gray-500">.</button>
          <button onClick={handleCalculate} className="bg-orange-500 p-4 rounded text-white text-2xl active:bg-orange-300">=</button>
        </div>
      </div>
    </SlideMenu>
  </>)
} 
