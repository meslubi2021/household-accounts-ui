'use client'

import React from 'react';
import classNames from 'classnames';


type Enumerate<N extends number, Acc extends number[] = []> = Acc['length'] extends N
  ? Acc[number]
  : Enumerate<N, [...Acc, Acc['length']]>

type IntRange<F extends number, T extends number> = Exclude<Enumerate<T>, Enumerate<F>>

type T = IntRange<0, 101> // 0 ~ 100

interface SlideMenuType {
    isOpen: boolean,
    close: () => void,
    position?: 'top' | 'bottom' | 'left' | 'right',
    width: T // percentage
    height: T // percentage
    children: React.ReactNode,
    header?: React.ReactNode | string
}

const SlideMenu: React.FC<SlideMenuType> = ({isOpen, close, position = 'left', width=100, height=100, header = 'Header', children}) => {

  const getTransformClass = () => {
    switch (position) {
      case 'left':
        return isOpen ? 'translate-x-0' : '-translate-x-full';
      case 'right':
        return isOpen ? 'translate-x-0' : 'translate-x-full';
      case 'top':
        return isOpen ? 'translate-y-0' : '-translate-y-full';
      case 'bottom':
      default:
        return isOpen ? 'translate-y-0' : 'translate-y-full';
    }
  };
  const sizeStyle = position === 'left' || position === 'right' ? {width: `${width}%`}  : {height: `${height}%`};
    return (
    <>
      <div
           className={classNames(
            'slide-menu-wrapper fixed transition-transform transform z-10',
            {
              'inset-y-0 left-0': position === 'left',
              'inset-y-0 right-0': position === 'right',
              'inset-x-0 top-0': position === 'top',
              'inset-x-0 bottom-0': position === 'bottom',
            },
            getTransformClass(),
            'bg-white'
          )}
          style={{ transition: 'transform 0.3s ease-in-out', ...sizeStyle }}
      >
        <div className='header bg-red-300 flex justify-between items-center h-100'>
            <div onClick={() => close()} className="text-white p-2 px-3 cursor-pointer flex-1 text-left">
                X
            </div>
            {header}
        </div>
        <div className='main'>
            {children}
        </div>
        <div className='footer bg-red-300'></div>
      </div>
    </>
  );
};

export { SlideMenu };
