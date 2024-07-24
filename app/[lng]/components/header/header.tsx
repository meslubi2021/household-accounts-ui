'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useTranslation } from '../../../i18n/client'

export const Header = ({ lng }: { lng: string }) => {
  const pathname = usePathname();
  const { t } = useTranslation(lng, 'main');
  const [ pageName, setPageName ] = useState("calendar");

  useEffect(() => {
    const pathNameArr = pathname.split('/');
    setPageName(pathNameArr[pathNameArr.length - 1]);
  }, [pathname]);

  return (
    <div className="header flex justify-around items-center bg-red-300 text-white">
      {t(`${pageName}.header.title`)}
  </div>)
}