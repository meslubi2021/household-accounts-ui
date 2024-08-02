'use client';

import { useState, useEffect } from 'react';
import { useTranslation } from '../../../../i18n/client'
import { isToday,  parseISO } from "date-fns"
import { SlideMenu, Dropdown, LoadingSpinner, AmountInput } from '..';
import { AddTransactionPayload, Category } from '../../../models';
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
        category: Category,
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
     const [dropdownList, setDropdownList] = useState<string[]>([]);

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
            // TODO: need to grab userId
            // const userId ='66a96a212be2b2f74ec10f5e'// local
            const userId = "66a96cac7eda1dc2f62a09c3" // dev
            const categoriesRes = await categoryService.getByUserId(userId); 
            if(categoriesRes) {
                setCategories(categoriesRes)
                setCategory(categoriesRes[0])
                const tempCategories:string[] = [];
                categoriesRes.forEach(category => tempCategories.push(category.name));
                setDropdownList(tempCategories)
            }
        }catch(err){
            console.log(err);
        }
    }

    async function saveNewExpense() {
        try{
            setIsSaving(true);
            const addTransactionPayload:AddTransactionPayload = {
                // TODO: need to grab userId
                // userId: "66a96a212be2b2f74ec10f5e", // local
                userId: "66a96cac7eda1dc2f62a09c3", // dev
                date,
                amount,
                category: category?.name || "",
                note,
                type: "expense",
                paymentMethod: "Credit Card"  // Hardcode for now.                
            }
            if(selectedItem){
                // Update Existing Item
                const {userId, ...updateTransactionPayload } = addTransactionPayload;
                const res = await transactionService.updateTransaction(selectedItem.id, updateTransactionPayload);
            }else{
                // Create new Item
                const res = await transactionService.createTransaction(addTransactionPayload);
            }
            close();
            setTimeout(() => {                
                reset();
                setInput(''); // reset Amount intput -> '0'
                init();
            }, 500);
        }catch(err){

        }finally{
            setIsSaving(false);
        }
    }
    function checkIsAbleToCreate({date, amount, category}: {date:string, amount:number, category?:Category}) {
        if(date === "" || amount === 0 || category == null){
            setIsAbleToSave(false);
        }else{
            setIsAbleToSave(true);
        }
    }
    async function handleDelete(){
        try{
            if(selectedItem){
                setIsSaving(true);
                const res = await transactionService.deleteTransaction(selectedItem.id);
            }
            close();
            setTimeout(() => {                
                reset();
                setInput(''); // reset Amount intput -> '0'
                init();
            }, 500);
        }catch(err){
            console.log(err);
        }finally{
            setIsSaving(false);
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
                            items={dropdownList}
                            onChange={(value:string) => {
                                const selectedCategory = categories.find((category) => category.name === value);
                                selectedCategory && setCategory(selectedCategory);
                                checkIsAbleToCreate({date, amount, category: selectedCategory});
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
            {
                selectedItem &&
                <div className="p-4 flex justify-end">
                    <button
                        onClick={handleDelete}
                        className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700"
                        >
                        Delete
                    </button>
                </div>
            }
        </SlideMenu>
    )
}