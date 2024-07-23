'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useTranslation } from '../../../i18n/client'

export const Header = ({ lng }: { lng: string }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { t } = useTranslation(lng, 'main');
  const [ pageName, setPageName ] = useState("calendar");

  useEffect(() => {
    console.log(router);
    const params = searchParams.toString();
    const fullUrl = `${window.location.origin}${pathname}${params ? `?${params}` : ''}`;
    const pathNameArr = pathname.split('/');
    setPageName(pathNameArr[pathNameArr.length - 1]);
  }, [pathname, searchParams]);

  return (
    <div className="header flex justify-around items-center">
      {t(`${pageName}.header.title`)}
  </div>)
}