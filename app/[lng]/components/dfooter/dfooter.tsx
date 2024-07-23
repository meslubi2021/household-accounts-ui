'use client';

import { useTranslation } from '../../../i18n/client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'; 
import { CalendarDaysIcon, ChartPieIcon, PlusCircleIcon, CurrencyDollarIcon, Cog6ToothIcon } from '@heroicons/react/24/outline'

export const Footer = ({ lng }: { lng: string }) => {
  const pathname = usePathname();
    const { t } = useTranslation(lng, 'main');
    return (
      <footer className="flex justify-around items-center">
        <Link href={`/${lng}/calendar`} className={`flex flex-col items-center ${pathname === `/${lng}/calendar` && 'text-red-3'}`}>
          <CalendarDaysIcon />
          <span className="text-gray-500">{t(`calendar.title`)}</span>
        </Link>
        <Link href={`/${lng}/analysis`} className={`flex flex-col items-center ${pathname === `/${lng}/analysis` && 'text-red-3'}`}>
          <ChartPieIcon />
          <span className="text-gray-500">{t(`analysis.title`)}</span>
        </Link>
        {/* Need to open slide menu to add new item */}
        <Link href="" className={`flex flex-col items-center`}>
          <PlusCircleIcon />
          <span className="text-gray-500">{t(`new_input.title`)}</span>
        </Link>
        <Link href={`/${lng}/asset`} className={`flex flex-col items-center ${pathname === `/${lng}/asset` && 'text-red-3'}`}>
          <CurrencyDollarIcon />
          <span className="text-gray-500">{t(`asset.title`)}</span>
        </Link>
        <Link href={`/${lng}/settings`} className={`flex flex-col items-center ${pathname === `/${lng}/settings` && 'text-red-3'}`}>
          <Cog6ToothIcon />
          <span className="text-gray-500">{t(`settings.title`)}</span>
        </Link>
    </footer>)
}