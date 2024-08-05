'use client';

import { useState, useEffect } from 'react';
import { useTranslation } from '../../../../i18n/client'
import { isToday,  parseISO } from "date-fns"
import { SlideMenu, Dropdown, LoadingSpinner, AmountInput, ToggleButton } from '..';
import { AddTransactionPayload, BaseCategory, Category, TransactionType } from '../../../models';
import { categoryService, transactionService } from '../../../api-services';
import { useHandleItem } from './utils/reducer';
import { FormNewCategory } from './form-new-category';
import { useSelector, useDispatch } from 'react-redux';
import { refreshActions } from '@/app/[lng]/utils/redux';
import { useSessionStorageState } from '../../../utils/custom-hook';
import classNames from 'classnames';


interface HandleItemSlideMenuType {
    isOpen: boolean,
    close: () => void,
    lng: string,
    selectedItem?: {
        id: string,
        amount: string,
        dateStr: string,
        category: Category,
        subcategory: BaseCategory,
        type: TransactionType,
        fixedExpenseMonthly: boolean,
        note: string
    },
    triggerRefresh: () => void
}

export const HandleItemSlideMenu:React.FC<HandleItemSlideMenuType> = ({ isOpen, close, lng, selectedItem, triggerRefresh }) => {
    const { t } = useTranslation(lng, 'main');
    const { isHandleItemSlideRefresh } = useSelector((state:any) => state.refresh);
    const reduxDispatch = useDispatch();
    const { 
        date, amount, categories, category, subcategory, type, note, isSaving, isAbleToSave, fixedExpenseMonthly, 
        setDate, setAmount, setCategories, setCategory, setSubcategory, setType, setFixedExpenseMonthly, setNote, setIsSaving, setIsAbleToSave, reset
     } = useHandleItem();
     const [ input, setInput ] = useState<string>('');
     const [dropdownList, setDropdownList] = useState<{value:string, label:string}[]>([]);
     const [subcategoryDropdownList, setSubcategoryDropdownList] = useState<{value:string, label:string}[]>([]);
     const [newCategory, setNewCategory] = useState<{name: string, type: string}>({name: "", type: "expense"});
     const [ isOpenNewCategory, setIsOpenNewCategory ] = useState(false);
     const [ isSavingNewCategory, setIsSavingNewCategory ] = useState(false);
     const [ userInfo, _ ] = useSessionStorageState("userInfo", "");

  useEffect(() => {
    if(!isHandleItemSlideRefresh) return;

    if(!isOpen) return;
    if(selectedItem){
        init();
        setDate(selectedItem.dateStr);
        setAmount(parseFloat(selectedItem.amount));
        setInput(selectedItem.amount);
        setCategory(selectedItem.category);
        setSubcategory(selectedItem.subcategory);
        setType(selectedItem.type)
        setFixedExpenseMonthly(selectedItem.fixedExpenseMonthly)
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
            setSubcategory(selectedItem.subcategory);
            setType(selectedItem.type)
            setFixedExpenseMonthly(selectedItem.fixedExpenseMonthly)
            setNote(selectedItem.note);
        }else{
            init();
        }
    }, [isOpen])

    useEffect(() => {
        checkIsAbleToCreate({date, amount, category: category as Category});
    }, [amount])

    useEffect(() => {
        if(isOpen){
            init();
        }
    }, [type]);

    useEffect(() => {
        if(isOpen && category){
            const subTempCategories:{value:string, label:string}[] = [];
            category.subcategories?.forEach(category => subTempCategories.push({value: category.name, label: category.name}));                                    
            setSubcategoryDropdownList(subTempCategories);
        }
    }, [category])

    async function init() {
        try{
            if(userInfo === ""){
                throw new Error("Userinfo Not Found")
            }
            const categoriesRes = await categoryService.getByUserId(userInfo._id, type); 
            if(categoriesRes) {
                setCategories(categoriesRes)
                // If there is selectedItem, then we don't need to set category again.
                !selectedItem && setCategory(categoriesRes[0])
                const tempCategories:{value:string, label:string}[] = [];
                categoriesRes.forEach(category => tempCategories.push({value: category.name, label: category.name}));
                setDropdownList(tempCategories)

                // check subcategory
                const selectedCategory = selectedItem 
                    ? categoriesRes.find(categoryRes => categoryRes.name === selectedItem.category.name)
                    : categoriesRes.find(categoryRes => categoryRes.name === categoriesRes[0].name);
                const subTempCategories:{value:string, label:string}[] = [];
                selectedCategory && selectedCategory.subcategories.forEach(category => subTempCategories.push({value: category.name, label: category.name}));
                setSubcategoryDropdownList(subTempCategories);
            }
        }catch(err){
            console.log(err);
        }
    }

    async function saveNewExpense() {
        try{
            setIsSaving(true);
            if(userInfo === ""){
                throw new Error("Userinfo Not Found")
            }
            const addTransactionPayload:AddTransactionPayload = {                
                userId: userInfo._id,
                date,
                amount,
                category: category?.name || "",
                subcategory: subcategory?.name || "",
                fixedExpenseMonthly,
                note: !note || note === ""  ? undefined : note,
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
            console.log(err);
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
                <div className={`px-4 py-2 text-white flex-2 text-center`}>
                    <span className={classNames("pt-2 px-4 hover:cursor-pointer border-b-4 border-white", {'opacity-50 hover:opacity-100 border-b-0': type==="income"})} onClick={() => setType('expense')}>{t('new_input.header.expense')}</span>
                    {!selectedItem && <span className={classNames("pt-2 px-4 hover:cursor-pointer border-b-4 border-white", {'opacity-50 hover:opacity-100 border-b-0': type==="expense"})} onClick={() => setType('income')}>{t('new_input.header.income')}</span> }
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
                        (categories && category) ?
                        <>
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
                                                if(userInfo === ""){
                                                    throw new Error("Userinfo Not Found")
                                                }
                                                await categoryService.create(userInfo._id, newCategory)

                                                reduxDispatch(refreshActions.setIsHandleItemSlideRefresh(true));
                                                reduxDispatch(refreshActions.setIsBudgetPageRefresh(true));
                                                setIsOpenNewCategory(false);
                                            }catch(err){
                                                console.log(err)
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
                        : 
                        <>
                            <Dropdown 
                                lng={lng}
                                className="new-item-dropdown" 
                                defaultValue={""}
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
                                                if(userInfo === ""){
                                                    throw new Error("Userinfo Not Found")
                                                }
                                                await categoryService.create(userInfo._id, newCategory)

                                                reduxDispatch(refreshActions.setIsHandleItemSlideRefresh(true));
                                                setIsOpenNewCategory(false);
                                            }catch(err){
                                                console.log(err);
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
                    category
                    && (<>
                        <div className="flex justify-between items-center border-b py-3">
                            <span>{t('new_input.body.subcategory')}</span>
                            <Dropdown 
                                lng={lng}
                                className="new-item-dropdown" 
                                defaultValue={subcategory?.name || ""}
                                items={subcategoryDropdownList}
                                isAddNewItem={true}
                                newAddItemOnClick={() => setIsOpenNewCategory(true)}                         
                                onChange={({value, label}:{value:string, label: string}) => {                                    
                                    const selectedCategory = categories.find((categoryFind) => categoryFind.name === category.name);                                    
                                    const selectedSubcategory = selectedCategory && selectedCategory.subcategories.find((category) => category.name === value);
                                    selectedSubcategory && setSubcategory(selectedSubcategory);
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
                                                if(userInfo === ""){
                                                    throw new Error("Userinfo Not Found")
                                                }
                                                await categoryService.create(userInfo._id, newCategory)

                                                reduxDispatch(refreshActions.setIsHandleItemSlideRefresh(true));
                                                setIsOpenNewCategory(false);
                                            }catch(err){
                                                console.log(err);
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
                        </div>

                    </>)
                }
                
                {
                    type === "expense" && (
                        <div className="flex justify-between items-center border-b py-3">
                            <span>{t('new_input.body.fixedExpense.name')}({t('general.monthly')})</span> 
                            <ToggleButton initial={fixedExpenseMonthly} onToggle={(v) => setFixedExpenseMonthly(v)} />
                        </div>)
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