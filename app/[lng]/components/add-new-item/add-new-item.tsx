'use client';

import { useState, useEffect } from 'react';
import { useTranslation } from '../../../i18n/client'
import { format, isToday,  parseISO } from "date-fns"
import { SlideMenu, Dropdown, LoadingSpinner } from '../shared';
import { AddExpensePayload } from '../../models';
import { categoryService } from '../../api-services/category.service';

interface AddNewItemSlideMenuType {
    isOpen: boolean,
    close: () => void,
    lng: string
}

export const AddNewItemSlideMenu:React.FC<AddNewItemSlideMenuType> = ({ isOpen, close, lng }) => {
    const { t } = useTranslation(lng, 'main');
    const [date, setDate] = useState<string>(format(new Date(), 'yyyy-MM-dd'));
    const [amount, setAmount] = useState<string>("");
    const [categories, setCategories] = useState<string[]>();
    const [category, setCategory] = useState<string>('dine-in');
    const [note, setNote] = useState<string>('');
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        if(!isOpen) return;
        init();
    }, [isOpen])

    async function init() {
        try{
            const categoriesRes = await categoryService.getByUserId('user-id');
            categoriesRes && setCategories(categoriesRes)
        }catch(err){
            console.log(err);
        }
    }

    const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setAmount(isNaN(parseFloat(value)) ? '' : value);
    };

    function saveNewExpense() {
        setIsSaving(true);
        const amountNum = parseFloat(amount);
        const addExpensePayload:AddExpensePayload = {
            dateStr: date,
            item: {
              category,
              note,
              amount: amountNum,
              paymentMethod: "Credit Card"  // Hardcode for now.
            }
        }
        console.log(addExpensePayload);
        // TODO: Need to delete timeout later
        setTimeout(() => {        
            setIsSaving(false);
        }, 1000);
    }
    return (
        <SlideMenu isOpen={isOpen} close={close} position={'bottom'} width={100} height={100}
            header={<>
                <div className={`px-4 py-2 text-white flex-1 text-center`}>
                    Expense
                </div>
                {   
                    isSaving
                    ?                    
                    <div className="text-white p-2 px-3 flex-1 flex justify-end">                    
                        <LoadingSpinner />
                    </div>
                    :
                    <div onClick={saveNewExpense} className="text-white p-2 px-3 cursor-pointer flex-1 text-right">
                        {t('slide-menu.save')}
                    </div>
                }
            </>}
        >
            <div className="p-4 bg-white">
                <div className="flex justify-between items-center border-b py-3">
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
                <div className="flex justify-between items-center border-b py-3">
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
                <div className="flex justify-between items-center border-b py-3">
                    <span>Category</span>
                    {
                        categories &&
                        <Dropdown 
                            className="new-item-category-dropdown" 
                            defaultValue='Dine-out' 
                            items={categories}
                            onChange={(value:string) => setCategory(value)}
                        />
                    }
                </div>
                <div className="border-b w-100 py-3">
                    <textarea
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        className="w-[100%] px-2 py-1"
                        placeholder="Add a note"
                    />
                </div>
            </div>
        </SlideMenu>
    )
}