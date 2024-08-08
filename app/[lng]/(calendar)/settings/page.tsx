'use client'

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'
import { languages } from '../../../i18n/settings'
import { useTranslation } from '../../../i18n/client';
import { Dropdown } from '../../components/shared';
import { useCookies } from 'react-cookie';
import { LoadingSpinner } from '../../components/shared'

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
                <button className="flex justify-between items-center border py-2 px-3 rounded hover:text-white hover:bg-red-300"
                    onClick={logoutClick}
                >
                    {t('auth.logout')}
                    {isLoading && <span className="ml-2"><LoadingSpinner /></span>}
                </button>
            </div>
        </div>  
    </div>
    );
}