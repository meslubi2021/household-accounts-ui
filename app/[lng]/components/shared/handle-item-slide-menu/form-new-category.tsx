"use client";

import React, { useState } from 'react';
import { useTranslation } from '@/app/lib/i18n/client'
import { Dropdown } from '../dropdown/dropdown';

interface FormNewCategoryType {
    lng:string
    onChange?: ({type,value}:{type:string, value:string}) => void
    isSubCate?: boolean
}

export const FormNewCategory:React.FC<FormNewCategoryType> = ({ lng, onChange, isSubCate }) => {
    const { t } = useTranslation(lng, 'main');
    const [ value, setValue ] = useState("")
    return(<>
    <div className="flex justify-between items-center border-b p-3">
        <span>{t('general.name')}</span>
        <span className="text-left w-2/3 px-2 py-1 flex items-center">
            <div className="flex items-center w-full">
            <input
                type="text"
                placeholder={t(`new_input.${isSubCate ? 'subcategory' : 'category'}.placeholder`)}
                value={value}
                onChange={(event) => {
                    setValue(event.target.value);
                    onChange && onChange({type: "name", value: event.target.value})
                }}
                className="w-full p-2 border border-gray-300 rounded"        
            />
            </div>
        </span>
    </div>
    {
    !isSubCate &&
        <div className="flex justify-between items-center border-b p-3">
            <span>{t('general.type')}</span>
            <span className="text-left w-2/3 px-2 py-1 flex items-center">
                <div className="flex items-center w-full">        
                    <Dropdown 
                        lng={lng}
                        className="new-item-dropdown" 
                        defaultValue={t("general.expense")}
                        items={[{value:"expense", label: t('general.expense')},{value:"income", label: t('general.income')}]}                            
                        onChange={({value, label}:{value:string, label: string}) => {
                            onChange && onChange({type: "type", value})
                        }}
                    />
                </div>
            </span>
        </div>
    }
    </>)
}