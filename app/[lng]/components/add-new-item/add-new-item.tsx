'use client';

import { useState } from 'react';
import { useTranslation } from '../../../i18n/client'
import { format, isToday,  parseISO } from "date-fns"
import { SlideMenu } from '../slide-menu/slide-menu';

interface AddNewItemSlideMenuType {
    isOpen: boolean,
    close: () => void,
    lng: string
}

export const AddNewItemSlideMenu:React.FC<AddNewItemSlideMenuType> = ({ isOpen, close, lng }) => {
    const { t } = useTranslation(lng, 'main');
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
        <SlideMenu isOpen={isOpen} close={close} position={'bottom'} width={100} height={100}
            header={<>
                <div className={`px-4 py-2 text-white flex-1 text-center`}>
                    Expense
                </div>
                <div onClick={() => close()} className="text-white p-2 px-3 cursor-pointer flex-1 text-right">
                    {t('slide-menu.save')}
                </div>
            </>}
        >
            <div className="max-w-md mx-auto bg-white overflow-hidden">
                <div className="p-4 space-y-4">
                    <div className="flex justify-between items-center border-b">
                        <span className="flex items-center">
                            <span className="mr-2">Date</span>
                            {isToday(parseISO(date)) && (
                                <span className="ml-2 border text-blue text-sm px-2 rounded">Today</span>
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
        </SlideMenu>
    )
}