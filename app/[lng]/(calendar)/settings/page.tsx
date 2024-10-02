'use client'

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'
import { languages } from '@/app/lib/i18n/settings'
import { useTranslation } from '@/app/lib/i18n/client';
import { Dropdown } from '@/app/ui/shared-components';
import { Button } from 'react-component-tailwindcss';
import { useCookies } from 'react-cookie';

export default function Index({ params: { lng }} : any) {
    const { t } = useTranslation(lng, 'main')
    const router = useRouter()
    const [ isLoading, setIsLoading ] = useState(false);
    const [ dropDownData, setDropDownData ]= useState<any[]>([]);
    const [ _, __, removeCookie] = useCookies(['userInfo'])

    useEffect(() => {
        buildDropdownData();
    }, [])
    const buildDropdownData = () => {
        const tempData = languages.map(l => {
            return {value: l, label: t(`settings.${l}`)}        
        })
        setDropDownData(tempData);
    }

    function logoutClick() {
        setIsLoading(true);
        
        removeCookie("userInfo", { path: '/' });
        sessionStorage.removeItem("userInfo");
        
        setTimeout(() => {
            router.push(`/${lng}/login`);
        }, 300)
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
        <div className="flex justify-between items-center border-b py-3">
            <span className="flex items-center px-3">
            </span>
            <div className="px-3">
                <Button className="text-2xl" size="lg" variant='secondary' color='pink' loading={isLoading} onClick={logoutClick}>
                    {t('auth.logout')}
                </Button>
            </div>
        </div>  
    </div>
    );
}