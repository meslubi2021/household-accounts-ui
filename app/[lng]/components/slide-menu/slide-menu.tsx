'use client'

import React, { useState } from 'react';
import { useTranslation } from '../../../i18n/client'
import { format, isToday,  parseISO } from "date-fns"

interface SlideMenuType {
    isOpen: boolean,
    close: () => void,
    lng: string
}

const SlideMenu: React.FC<SlideMenuType> = ({isOpen, close, lng}) => {
    const { t } = useTranslation(lng, 'main');
    const [activeTab, setActiveTab] = useState('expense');
    const [date, setDate] = useState<string>(format(new Date(), 'yyyy-MM-dd'));
    const [amount, setAmount] = useState<string>('');
    const [category, setCategory] = useState<string>('food');
    const [note, setNote] = useState<string>('');

    const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        // const formattedValue = parseFloat(value).toFixed(2);
        setAmount(isNaN(parseFloat(value)) ? '' : value);
    };

    return (
    <>
      <div
         className={`slide-menu-wrapper fixed inset-0 transition-transform transform z-10 ${
            isOpen ? 'translate-y-0' : 'translate-y-full'
          } bg-white shadow-lg`}
          style={{ transition: 'transform 0.3s ease-in-out' }}
      >
        <div className='header bg-red-300 flex justify-between items-center h-100'>
            <div onClick={() => close()} className="text-white p-2 px-3">
                X
            </div>
            <div>
                <button
                    className={`px-4 py-2 rounded ${activeTab === 'expense' ? 'bg-white text-red-300' : 'text-gray-500'}`}
                    onClick={() => setActiveTab('expense')}
                    >
                    Expense
                </button>
                <button
                    className={`px-4 py-2 rounded ${activeTab === 'income' ? 'bg-white text-red-300' : 'text-gray-500'}`}
                    onClick={() => setActiveTab('income')}
                    >
                    Income
                </button>
            </div>
            <div onClick={() => close()} className="text-white p-2 px-3">
                {t('slide-menu.save')}
            </div>
        </div>
        <div className='main'>
            <div className="max-w-md mx-auto bg-white overflow-hidden">
                <div className="p-4 space-y-4">
                    <div className="flex justify-between items-center border-b">
                        <span className="flex items-center">
                            <span className="mr-2">Date</span>
                            {isToday(parseISO(date)) && (
                                <span className="ml-2 border text-blue text-xs px-2 rounded">Today</span>
                            )}

                        </span>
                        <input
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            className="text-left w-2/3 px-2 py-1"
                        />
                    </div>
                    <div className="flex justify-between items-center border-b">
                        <span>Amount</span>
                        <span className="text-left w-2/3 px-2 py-1">
                            <span className="mr-2">$</span>
                            <input
                                type="number"
                                value={amount}
                                onChange={handleAmountChange}                                
                                placeholder="0.00"
                                min="0"
                            />
                        </span>
                    </div>
                    <div className="flex justify-between items-center border-b">
                        <span>Category</span>
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="text-left w-2/3 px-2 py-1"
                        >
                            <option value="food">🍴 Food</option>
                            <option value="transport">🚗 Transport</option>
                            <option value="shopping">🛍️ Shopping</option>
                            <option value="entertainment">🎉 Entertainment</option>
                        </select>
                    </div>
                    <div className="border-b w-100">
                        <textarea
                            value={note}
                            onChange={(e) => setNote(e.target.value)}
                            className="w-[100%] px-2 py-1"
                            placeholder="Add a note"
                        />
                    </div>
                </div>
            </div>
        </div>
        <div className='footer bg-red-300'></div>
      </div>
    </>
  );
};

export { SlideMenu };
