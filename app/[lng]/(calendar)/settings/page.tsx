'use client'

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'
import { languages } from '../../../i18n/settings'
import { useTranslation } from '../../../i18n/client';
import { Dropdown } from '../../components/shared';

export default function Index({ params: { lng }} : any) {
    const { t } = useTranslation(lng, 'main')
    const router = useRouter()
    const [ dropDownData, setDropDownData ]= useState<any[]>([]);

    useEffect(() => {
        buildDropdownData();
    }, [])
    const buildDropdownData = () => {
        const tempData = languages.map(l => {
            return {value: l, label: t(`settings.${l}`)}        
        })
        setDropDownData(tempData);
    }
    return (
    <div className="p-4 bg-white text-2xl">
        <div className="flex justify-between items-center border-b py-3">
            <span className="flex items-center px-3">
                <span className="mr-2"> {t('settings.language')}</span>
            </span>
            <div className="px-3">
                <Dropdown 
                    lng={lng}  
                    defaultValue={t(`settings.${lng}`)}
                    items={dropDownData} 
                    onChange={(data: any) => {
                        router.push(`/${data.value}/settings`);
                    }}
                />
            </div>
        </div>  
    </div>
    );
}