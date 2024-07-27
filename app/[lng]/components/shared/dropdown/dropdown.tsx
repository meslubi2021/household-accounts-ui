'use client';

import { useState } from 'react';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'

interface Dropdown{
  className?: string,
  defaultValue: string,
  items: string[],
  eventItems?: string[],
  onChange: (e: any) => void
}
export const Dropdown:React.FC<Dropdown> = ( {className, defaultValue, items, onChange, eventItems} ) => {
  const [ selectedValue, setSelectedValue ] = useState(defaultValue)

  return (
    <Menu as="div" className={`relative inline-block text-left${className ? ` ${className}` : ""}`}>
      <MenuButton className="trigger-btn inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
          {selectedValue}
        <ChevronDownIcon aria-hidden="true" className="-mr-1 h-5 w-5 text-gray-400" />
      </MenuButton>

      <MenuItems
        transition
        className={`dropdown-list-box absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in`}
      >
        <div className="py-1">
          {
            items.map((item:string, index:number) => 
              <MenuItem key={`${item}-${index}`} >
                <div className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                  onClick={(e) => {
                    if(e.currentTarget.textContent != null){
                      setSelectedValue(e.currentTarget.textContent)
                      onChange(e.currentTarget.textContent)
                    }
                  }}
                >
                  {item}
                </div>
              </MenuItem>)
          }
        </div>
      </MenuItems>
    </Menu>
  )
}