import { useTranslation } from '../../../i18n'
import Link from 'next/link'
import { CalendarDaysIcon, ChartPieIcon, PlusCircleIcon, CurrencyDollarIcon, Cog6ToothIcon } from '@heroicons/react/24/outline'

export const Footer = async ({ lng }: { lng: string }) => {
    const { t } = await useTranslation(lng, 'footer')    
    return (
      <footer className="h-1/6 flex justify-around items-center">
        <Link href="/calendar" className="flex flex-col items-center">
          <CalendarDaysIcon />
          <span className="text-gray-500">Calendar</span>
        </Link>
        <Link href="/analysis" className="flex flex-col items-center">
          <ChartPieIcon />
          <span className="text-gray-500">Analysis</span>
        </Link>
        {/* Need to open slide menu to add new item */}
        <Link href="" className="flex flex-col items-center">
          <PlusCircleIcon />
          <span className="text-gray-500">New Input</span>
        </Link>
        <Link href="/asset" className="flex flex-col items-center">
          <CurrencyDollarIcon />
          <span className="text-gray-500">Asset</span>
        </Link>
        <Link href="/settings" className="flex flex-col items-center">
          <Cog6ToothIcon />
          <span className="text-gray-500">Settings</span>
        </Link>
    </footer>)
}