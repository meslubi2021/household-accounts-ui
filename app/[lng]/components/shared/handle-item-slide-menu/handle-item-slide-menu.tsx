'use client';

import { useState, useEffect } from 'react';
import { useTranslation } from '../../../../i18n/client'
import { isToday,  parseISO } from "date-fns"
import { SlideMenu, Dropdown, LoadingSpinner, AmountInput } from '..';
import { AddTransactionPayload, Category, TransactionType, FixedExpenseType } from '../../../models';
import { categoryService, transactionService } from '../../../api-services';
import { useHandleItem } from './utils/reducer';
import { FormNewCategory } from './form-new-category';
import { useSelector, useDispatch } from 'react-redux';
import { refreshActions } from '@/app/[lng]/utils/redux';

interface HandleItemSlideMenuType {
    isOpen: boolean,
    close: () => void,
    lng: string,
    selectedItem?: {
        id: string,
        amount: string,
        dateStr: string,
        category: Category,
        type: TransactionType,
        fixedExpense: FixedExpenseType,
        note: string
    },
    triggerRefresh: () => void
}

export const HandleItemSlideMenu:React.FC<HandleItemSlideMenuType> = ({ isOpen, close, lng, selectedItem, triggerRefresh }) => {
    const { t } = useTranslation(lng, 'main');
    const { isHandleItemSlideRefresh } = useSelector((state:any) => state.refresh);
    const reduxDispatch = useDispatch();
    const { 
        date, amount, categories, category, type, note, isSaving, isAbleToSave, fixedExpense, 
        setDate, setAmount, setCategories, setCategory, setType, setFixedExpense, setNote, setIsSaving, setIsAbleToSave, reset
     } = useHandleItem();
     const [ input, setInput ] = useState<string>('');
     const [dropdownList, setDropdownList] = useState<{value:string, label:string}[]>([]);
     const [newCategory, setNewCategory] = useState<{name: string, type: string}>({name: "", type: "expense"});
     const [ isOpenNewCategory, setIsOpenNewCategory ] = useState(false);
     const [ isSavingNewCategory, setIsSavingNewCategory ] = useState(false);

  useEffect(() => {
    if(!isHandleItemSlideRefresh) return;

    if(!isOpen) return;
    if(selectedItem){
        init();
        setDate(selectedItem.dateStr);
        setAmount(parseFloat(selectedItem.amount));
        setInput(selectedItem.amount);
        setCategory(selectedItem.category);
        setType(selectedItem.type)
        setFixedExpense(selectedItem.fixedExpense)
        setNote(selectedItem.note);
    }else{
        init();
    }

    reduxDispatch(refreshActions.setIsHandleItemSlideRefresh(false));
  }, [isHandleItemSlideRefresh]);

    useEffect(() => {
        if(!isOpen) return;
        if(selectedItem){
            init();
            setDate(selectedItem.dateStr);
            setAmount(parseFloat(selectedItem.amount));
            setInput(selectedItem.amount);
            setCategory(selectedItem.category);
            setType(selectedItem.type)
            setFixedExpense(selectedItem.fixedExpense)
            setNote(selectedItem.note);
        }else{
            init();
        }
    }, [isOpen])

    useEffect(() => {
        checkIsAbleToCreate({date, amount, category: category as Category});
    }, [amount])

    async function init() {
        try{
            // TODO: need to grab userId
            const userId ='66a96a212be2b2f74ec10f5e'// local
            // const userId = "66a96cac7eda1dc2f62a09c3" // dev
            const categoriesRes = await categoryService.getByUserId(userId); 
            if(categoriesRes) {
                setCategories(categoriesRes)
                // If there is selectedItem, then we don't need to set category again.
                !selectedItem && setCategory(categoriesRes[0])
                const tempCategories:{value:string, label:string}[] = [];
                categoriesRes.forEach(category => tempCategories.push({value: category.name, label: category.name}));
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
                userId: "66a96a212be2b2f74ec10f5e", // local
                // userId: "66a96cac7eda1dc2f62a09c3", // dev
                date,
                amount,
                category: category?.name || "",
                fixedExpense,
                note,
                type,
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
            triggerRefresh(); 
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
            triggerRefresh();
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
                    {
                        type === "expense"
                        ? t('new_input.header.expense')
                        : t('new_input.header.income')
                    }
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
                            checkIsAbleToCreate({date:e.target.value, amount, category: category as Category});
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
                        (categories && category) &&<>
                        <Dropdown 
                            lng={lng}
                            className="new-item-dropdown" 
                            defaultValue={category.name}
                            items={dropdownList}
                            isAddNewItem={true}
                            newAddItemOnClick={() => setIsOpenNewCategory(true)}                         
                            onChange={({value, label}:{value:string, label: string}) => {
                                const selectedCategory = categories.find((category) => category.name === value);
                                selectedCategory && setCategory(selectedCategory);
                                checkIsAbleToCreate({date, amount, category: selectedCategory as Category});
                            }}
                        />                        
                            <SlideMenu isOpen={isOpenNewCategory} close={() => setIsOpenNewCategory(false)} position={'bottom'} width={100} height={100}
                            header={<>
                                    <div className={`px-4 py-2 text-white flex-1 text-center`}>
                                        {`${t('general.new')} ${t(`new_input.body.category`)}`}
                                    </div>
                                    {   
                                        isSavingNewCategory
                                        ?                    
                                        <div className="text-white p-2 px-3 flex-1 flex justify-end">                    
                                            <LoadingSpinner />
                                        </div>
                                        :
                                        <div onClick={async () => {
                                            try{
                                                setIsSavingNewCategory(true);
                                                // TODO: need to grab real user ID
                                                const userId ='66a96a212be2b2f74ec10f5e'// local
                                                // const userId = "66a96cac7eda1dc2f62a09c3" // dev
                                                await categoryService.create(userId, newCategory)

                                                reduxDispatch(refreshActions.setIsHandleItemSlideRefresh(true));
                                                setIsOpenNewCategory(false);
                                            }catch(err){

                                            }finally{
                                                setIsSavingNewCategory(false);
                                            }
                                        }} className={`text-white p-2 px-3 cursor-pointer flex-1 text-right`}>
                                            {t('general.save')}
                                        </div>
                                    }
                                </>}
                            ><>
                             <FormNewCategory lng={lng} onChange={({value, type}) => {
                                if(type === 'name'){
                                    setNewCategory({...newCategory, name: value})
                                }else{
                                    setNewCategory({...newCategory, type: value})
                                }
                                }} />
                            </>
                            </SlideMenu>
                        </>
                    }
                </div>
                {
                    <div className="flex justify-between items-center border-b py-3">
                        <span>{t('new_input.body.fixedExpense.name')}</span> 
                        <Dropdown 
                            lng={lng}
                            className="new-item-dropdown" 
                            defaultValue={t(`new_input.body.fixedExpense.options.${fixedExpense}`)}
                            items={[
                                {value:"does_not_repeat" ,label: t('new_input.body.fixedExpense.options.does_not_repeat')}, 
                                {value:"every_day" ,label: t('new_input.body.fixedExpense.options.every_day')}, 
                                {value:"every_week" ,label: t('new_input.body.fixedExpense.options.every_week')}, 
                                {value:"every_month" ,label: t('new_input.body.fixedExpense.options.every_month')}, 
                                {value:"every_year" ,label: t('new_input.body.fixedExpense.options.every_year')}, 
                            ]}
                            onChange={({value, label}:{value:FixedExpenseType, label: string}) => {
                                setFixedExpense(value);
                            }}
                        />
                    </div>
                }
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