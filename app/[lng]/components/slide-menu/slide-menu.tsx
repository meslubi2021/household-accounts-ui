'use client'

import React, { useState } from 'react';
import { useTranslation } from '../../../i18n/client'

interface SlideMenuType {
    isOpen: boolean,
    close: () => void,
    lng: string
}

const SlideMenu: React.FC<SlideMenuType> = ({isOpen, close, lng}) => {
    const { t } = useTranslation(lng, 'main');
    return (
    <>
      <div
         className={`slide-menu-wrapper fixed inset-0 transition-transform transform z-10 ${
            isOpen ? 'translate-y-0' : 'translate-y-full'
          } bg-white shadow-lg`}
          style={{ transition: 'transform 0.3s ease-in-out' }}
      >
        <div className='header bg-red-300 flex justify-between items-center h-100'>
            <div onClick={() => close()} className="text-white p-2 px-3">
                X
            </div>
            <div onClick={() => close()} className="text-white p-2 px-3">
                {t('slide-menu.save')}
            </div>
        </div>
        <div className='main'>
            <ul>
            <li className="mb-2">
                <a href="#" className="text-blue-500 hover:underline">
                Menu Item 1
                </a>
            </li>
            <li className="mb-2">
                <a href="#" className="text-blue-500 hover:underline">
                Menu Item 2
                </a>
            </li>
            <li className="mb-2">
                <a href="#" className="text-blue-500 hover:underline">
                Menu Item 3
                </a>
            </li>
            </ul>
        </div>
        <div className='footer bg-red-300'>

        </div>
      </div>
    </>
  );
};

export { SlideMenu };
