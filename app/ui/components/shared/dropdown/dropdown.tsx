'use client';

import { useEffect, useState } from 'react';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { useTranslation } from '@/app/lib/i18n/client'

interface Dropdown{
  lng: string,
  className?: string,
  defaultValue: string,
  items: {value: string, label: string}[],
  onChange: (e: any) => void
  isAddNewItem?: boolean
  newAddItemOnClick?: () => void
}
export const Dropdown:React.FC<Dropdown> = ( {lng, className, defaultValue, items, onChange, isAddNewItem, newAddItemOnClick} ) => {
  const { t } = useTranslation(lng, 'main');
  const [ selectedValue, setSelectedValue ] = useState(() => defaultValue)
  useEffect(() => {
    setSelectedValue(defaultValue);
  }, [defaultValue])

  return (
    <Menu as="div" className={`relative inline-block text-left${className ? ` ${className}` : ""}`}>
      <MenuButton className="trigger-btn inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-2xl font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
          {selectedValue}
        <ChevronDownIcon aria-hidden="true" className="-mr-1 h-5 w-5 text-gray-400" />
      </MenuButton>

      <MenuItems
        transition
        className={`dropdown-list-box absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in`}
      >
        <div className="py-1">
          {
            items.map((item:{value:string, label:string}, index:number) => 
              <MenuItem key={`${item.value}-${index}`}>
                <div className="block px-4 py-2 text-2xl text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 hover:cursor-pointer"
                  onClick={(e) => {
                    if(e.currentTarget.textContent != null){
                      const selectedItem = items.find((item) => item.label === e.currentTarget.textContent);
                      setSelectedValue(e.currentTarget.textContent)
                      onChange(selectedItem)
                    }
                  }}
                >
                  {item.label}
                </div>
              </MenuItem>)
          }
          {
            isAddNewItem &&   
            <MenuItem>
              <div className={`block px-4 py-2 pt-3 text-2xl text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 hover:cursor-pointer 
                ${items.length > 0 ? "border-t-2" : ""}`}
                onClick={() => {newAddItemOnClick && newAddItemOnClick()}}
                >
                +{" "}{t('general.add')}
              </div>
            </MenuItem>          
          }
        </div>
      </MenuItems>
    </Menu>
  )
}