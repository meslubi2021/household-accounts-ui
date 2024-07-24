'use client';

import { useTranslation } from '../../../i18n/client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'; 
import { CalendarDaysIcon, ChartPieIcon, CurrencyDollarIcon, Cog6ToothIcon } from '@heroicons/react/24/outline'
import { PlusCircleIcon } from '@heroicons/react/24/solid';

export const Footer = ({ lng }: { lng: string }) => {
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
        <Link href="" onClick={() => {console.log("open add new item panel")}} className={`flex flex-col items-center text-red-300`}>
          <PlusCircleIcon />
          <span>{t(`new_input.title`)}</span>
        </Link>
        <Link href={`/${lng}/asset`} className={`flex flex-col items-center ${pathname === `/${lng}/asset` ? 'text-red-300' : 'text-gray-500'}`}>
          <CurrencyDollarIcon />
          <span>{t(`asset.title`)}</span>
        </Link>
        <Link href={`/${lng}/settings`} className={`flex flex-col items-center ${pathname === `/${lng}/settings` ? 'text-red-300' : 'text-gray-500'}`}>
          <Cog6ToothIcon />
          <span>{t(`settings.title`)}</span>
        </Link>
    </footer>)
}