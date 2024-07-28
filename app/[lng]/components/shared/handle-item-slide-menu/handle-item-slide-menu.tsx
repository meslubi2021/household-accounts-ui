'use client';

import { useState, useEffect } from 'react';
import { useTranslation } from '../../../../i18n/client'
import { isToday,  parseISO } from "date-fns"
import { SlideMenu, Dropdown, LoadingSpinner, AmountInput } from '..';
import { AddExpensePayload } from '../../../models';
import { categoryService, transactionService } from '../../../api-services';
import { useHandleItem } from './utils/reducer';

interface HandleItemSlideMenuType {
    isOpen: boolean,
    close: () => void,
    lng: string,
    selectedItem?: {
        id: string,
        amount: string,
        dateStr: string,
        category: string,
        note: string
    }
}

export const HandleItemSlideMenu:React.FC<HandleItemSlideMenuType> = ({ isOpen, close, lng, selectedItem }) => {
    const { t } = useTranslation(lng, 'main');
    const { 
        date, amount, categories, category, note, isSaving, isAbleToSave,
        setDate, setAmount, setCategories, setCategory, setNote, setIsSaving, setIsAbleToSave, reset
     } = useHandleItem();
     const [ input, setInput ] = useState<string>('');

    useEffect(() => {
        if(!isOpen) return;
        if(selectedItem){
            init();
            setDate(selectedItem.dateStr);
            setAmount(parseFloat(selectedItem.amount));
            setInput(selectedItem.amount);
            setCategory(selectedItem.category);
            setNote(selectedItem.note);
        }else{
            init();
        }
    }, [isOpen])

    useEffect(() => {
        checkIsAbleToCreate({date, amount, category});
    }, [amount])

    async function init() {
        try{
            const categoriesRes = await categoryService.getByUserId('user-id');
            if(categoriesRes) {
                setCategories(categoriesRes)
                setCategory(categoriesRes[0])
            }
        }catch(err){
            console.log(err);
        }
    }

    async function saveNewExpense() {
        try{
            setIsSaving(true);
            const addExpensePayload:AddExpensePayload = {
                dateStr: date,
                item: {
                  category,
                  note,
                  amount,
                  paymentMethod: "Credit Card"  // Hardcode for now.
                }
            }
            if(selectedItem){
                // Update Existing Item
                console.log(selectedItem.id);
                console.log(addExpensePayload);
                const res = await transactionService.updateExpense(selectedItem.id, addExpensePayload.item);
            }else{
                // Create new Item
                console.log(addExpensePayload);
                const res = await transactionService.createExpense("user-id", addExpensePayload);
            }
            close();
            setTimeout(() => {                
                reset();
                setInput(''); // reset Amount intput -> '0'
                init();
            }, 500);
        }catch(err){

        }finally{
            // TODO: Need to delete timeout later            
            setTimeout(() => {        
                setIsSaving(false);
            }, 1000);
        }
    }
    function checkIsAbleToCreate({date, amount, category}: {date:string, amount:number, category:string}) {
        if(date === "" || amount === 0 || category === ""){
            setIsAbleToSave(false);
        }else{
            setIsAbleToSave(true);
        }
    }
    return (
        <SlideMenu isOpen={isOpen} close={close} position={'bottom'} width={100} height={100}
            header={<>
                <div className={`px-4 py-2 text-white flex-1 text-center`}>
                    {t('new_input.header.expense')}
                </div>
                {   
                    isSaving
                    ?                    
                    <div className="text-white p-2 px-3 flex-1 flex justify-end">                    
                        <LoadingSpinner />
                    </div>
                    :
                    <div onClick={() => isAbleToSave && saveNewExpense()} className={`text-white p-2 px-3 cursor-pointer flex-1 text-right ${!isAbleToSave && 'opacity-50 cursor-not-allowed'}`}>
                        {t('slide-menu.save')}
                    </div>
                }
            </>}
        >   
            <div className="p-4 bg-white">  
                <div className="flex justify-between items-center border-b py-3">
                    <span className="flex items-center">
                        <span className="mr-2">{t('new_input.body.date')}</span>
                        {isToday(parseISO(date)) && (
                            <span className="ml-2 border text-blue text-sm px-2 rounded">{t('new_input.body.today')}</span>
                        )}
                    </span>
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => {
                            setDate(e.target.value);
                            checkIsAbleToCreate({date:e.target.value, amount, category});
                        }}
                        className="text-left w-2/3 px-2 py-1"
                    />
                </div>
                <div className="flex justify-between items-center border-b py-3">
                    <span>{t('new_input.body.amount')}</span>
                    <span className="text-left w-2/3 px-2 py-1 flex items-center">
                        {isOpen && <AmountInput setAmount={setAmount} input={input} setInput={setInput} />}
                    </span>
                </div>
                <div className="flex justify-between items-center border-b py-3">
                    <span>{t('new_input.body.category')}</span>
                    {
                        categories &&
                        <Dropdown 
                            className="new-item-category-dropdown" 
                            defaultValue='Dine-out' 
                            items={categories}
                            onChange={(value:string) => {
                                setCategory(value)
                                checkIsAbleToCreate({date, amount, category: value});
                            }}
                        />
                    }
                </div>
                <div className="border-b w-100 py-3">
                    <textarea
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        className="w-[100%] px-2 py-1"
                        placeholder={t('new_input.body.add_a_note')}
                    />
                </div>
            </div>
        </SlideMenu>
    )
}