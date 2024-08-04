'use client';

import { useState } from 'react';
import { useTranslation } from '../../../i18n/client'
import Link from 'next/link'
import { useDispatch } from 'react-redux';
import { refreshActions } from '../../utils/redux';
import { usePathname } from 'next/navigation'; 
import { CalendarDaysIcon, ChartPieIcon, CurrencyDollarIcon, Cog6ToothIcon } from '@heroicons/react/24/outline'
import { PlusCircleIcon } from '@heroicons/react/24/solid';
import { HandleItemSlideMenu } from '../shared'

export const Footer = ({ lng }: { lng: string }) => {
  const [ isOpen, setIsOpen ] = useState(false);
  const reduxDispatch = useDispatch();

  const pathname = usePathname();
    const { t } = useTranslation(lng, 'main');
    return (
      <footer className="flex justify-around items-center bg-white">
        <Link href={`/${lng}/calendar`} className={`flex flex-col items-center ${pathname === `/${lng}/calendar` ? 'text-red-300' : 'text-gray-500'}`}>
          <CalendarDaysIcon />
          <span>{t(`calendar.title`)}</span>
        </Link>
        <Link href={`/${lng}/analysis`} className={`flex flex-col items-center ${pathname === `/${lng}/analysis` ? 'text-red-300' : 'text-gray-500'}`}>
          <ChartPieIcon />
          <span>{t(`analysis.title`)}</span>
        </Link>
        {/* Need to open slide menu to add new item */}
        <Link href="" onClick={() => setIsOpen(true)} className={`flex flex-col items-center text-red-300`}>
          <PlusCircleIcon />
          <span>{t(`new_input.title`)}</span>
        </Link>
        <Link href={`/${lng}/budget`} className={`flex flex-col items-center ${pathname === `/${lng}/budget` ? 'text-red-300' : 'text-gray-500'}`}>
          <CurrencyDollarIcon />
          <span>{t(`budget.title`)}</span>
        </Link>
        <Link href={`/${lng}/settings`} className={`flex flex-col items-center ${pathname === `/${lng}/settings` ? 'text-red-300' : 'text-gray-500'}`}>
          <Cog6ToothIcon />
          <span>{t(`settings.title`)}</span>
        </Link>
        <HandleItemSlideMenu isOpen={isOpen} close={() => setIsOpen(false)} lng={lng} triggerRefresh={() => {
          reduxDispatch(refreshActions.setIsCalenderPageRefresh(true))
          reduxDispatch(refreshActions.setIsBudgetPageRefresh(true));
          }} />
    </footer>)
}