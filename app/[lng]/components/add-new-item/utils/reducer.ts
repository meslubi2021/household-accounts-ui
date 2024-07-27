import { useReducer } from "react";
import { HandleItemAction } from "./action";
import { format } from "date-fns";

interface HandleItemType {
    date: string,
    amount: number,
    categories: string[],
    category: string,
    note: string,
    isSaving: boolean,
    isAbleToSave: boolean
}

interface HandleItemActionType {
    type: string
    payload?: {
        date?: string,
        amount?: number,
        categories?: string[],
        category?: string,
        note?: string,
        isSaving?: boolean,
        isAbleToSave?: boolean
    }
}

const handleitemInit = {
    date: format(new Date(), "yyyy-MM-dd"),
    amount: 0.00,
    categories: [],
    category: "",
    note: "",
    isSaving: false,
    isAbleToSave: false
}

function HandleItemReducer(state: HandleItemType, action:HandleItemActionType): HandleItemType {
    switch(action.type){
        case HandleItemAction.DATE:{
            return {
                ...state, 
                date: action.payload!.date!
            }
        }
        case HandleItemAction.AMOUNT:{
            return {
                ...state, 
                amount: action.payload!.amount!
            }
        }
        case HandleItemAction.CATEGORIES:{
            return {
                ...state, 
                categories: action.payload!.categories!
            }
        }
        case HandleItemAction.CATEGORY:{
            return {
                ...state, 
                category: action.payload!.category!
            }
        }
        case HandleItemAction.NOTE:{
            return {
                ...state, 
                note: action.payload!.note!
            }
        }
        case HandleItemAction.IS_SAVING:{
            return {
                ...state, 
                isSaving: action.payload!.isSaving!
            }
        }
        case HandleItemAction.IS_ABLE_TO_SAVE:{
            return {
                ...state, 
                isAbleToSave: action.payload!.isAbleToSave!
            }
        }
        case HandleItemAction.RESET:{
            return {...handleitemInit}
        }
        default: {
            throw new Error(`Unsupported type: ${action.type}`)
        }
    }
}

export function useHandleItem() {
    const [ state, dispatch ] = useReducer(HandleItemReducer, handleitemInit);

    function setDate(date: string) {
        dispatch({
            type: HandleItemAction.DATE,
            payload: { date }
        })
    }
    function setAmount(amount: number) {
        dispatch({
            type: HandleItemAction.AMOUNT,
            payload: { amount }
        })
    }
    function setCategories(categories: string[]) {
        dispatch({
            type: HandleItemAction.CATEGORIES,
            payload: { categories }
        })
    }
    function setCategory(category: string) {
        dispatch({
            type: HandleItemAction.CATEGORY,
            payload: { category }
        })
    }
    function setNote(note: string) {
        dispatch({
            type: HandleItemAction.NOTE,
            payload: { note }
        })
    }
    function setIsSaving(isSaving: boolean) {
        dispatch({
            type: HandleItemAction.IS_SAVING,
            payload: {isSaving}
        })
    }
    function setIsAbleToSave(isAbleToSave: boolean) {
        dispatch({
            type: HandleItemAction.IS_ABLE_TO_SAVE,
            payload: {isAbleToSave}
        })
    }
    function reset() {
        dispatch({type: HandleItemAction.RESET})
    }
    return {
        ...state,
        setDate, setAmount, setCategories, setCategory, setNote,
        setIsSaving, setIsAbleToSave,
        reset
    }
}