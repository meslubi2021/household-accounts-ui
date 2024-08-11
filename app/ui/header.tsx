'use client';

import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useTranslation } from '@/app/lib/i18n/client'
import { useSessionStorageState } from '@/app/lib/custom-hook';
import { useCookies } from 'react-cookie';

export const Header = ({ lng }: { lng: string }) => {
  const pathname = usePathname();
  const router = useRouter()
  const { t } = useTranslation(lng, 'main');
  const [ pageName, setPageName ] = useState("calendar");
  const [ userInfo, _ ] = useSessionStorageState("userInfo");
  const [ __, setCookie, removeCookie] = useCookies(["userInfo"])

  useEffect(() => {
    const pathNameArr = pathname.split('/');
    setPageName(pathNameArr[pathNameArr.length - 1]);

    // Check userInfo in session storage
    if(!userInfo || userInfo === ""){
      removeCookie("userInfo");
      setTimeout(() => {
        router.push(`/${lng}/login`);
      }, 300)
    }
  }, [pathname]);

  return (
    <div className="header flex justify-around items-center bg-red-300 text-white">
      {t(`${pageName}.header.title`)}
  </div>)
}