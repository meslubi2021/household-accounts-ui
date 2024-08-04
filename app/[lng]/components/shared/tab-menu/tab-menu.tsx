"use client";

import React from 'react';

interface TabsType {
    children: React.ReactNode
    activeTab: number,
    setActiveTab: React.Dispatch<React.SetStateAction<number>>
}
export const Tabs:React.FC<TabsType> = ({children, activeTab = 0, setActiveTab}) => {
  return (
    <div className="w-full max-w-md mx-auto mt-1">
        <div className="relative border-b border-gray-300">
            <div className="flex">
                {React.Children.map(children, (child, index) => {
                    return (
                    <>
                            <button
                                className={`py-2 transition-colors duration-300 flex-1 ${
                                    activeTab === index
                                    ? 'text-black font-bold'
                                    : 'text-gray-500 hover:text-black'
                                }
                                    `
                                }
                                onClick={() => setActiveTab(index)}
                            >
                                {(child as React.ReactPortal).props.label}
                            </button>
                        <div
                            className="absolute bottom-0 left-0 h-1 bg-red-300 transition-transform duration-300"
                            style={{
                            width: `${100 / React.Children.count(children)}%`,
                            transform: `translateX(${activeTab * 100}%)`,
                            }}
                        ></div>
                    </>)
                })}</div>
            </div>
        <div className="mt-4">
            {React.Children.toArray(children)[activeTab]}
        </div>
  </div>
  );
};

interface TabType {
    label: string
    children: React.ReactNode
}
export const Tab:React.FC<TabType> = ({label, children}) => {
    return(<>
        <div className="mt-4">
            {children}
        </div>
    </>)
}
