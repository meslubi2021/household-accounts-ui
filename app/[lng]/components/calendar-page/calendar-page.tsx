"use client"

import React, { useRef, MutableRefObject } from 'react';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import { useTranslation } from '../../../i18n/client'

type RefType = {
    [key: string]: HTMLElement | null;
};

export const CalendarPage = ({ lng }: { lng: string }) => {
    const expenseListsRef = useRef<RefType>({}) as MutableRefObject<RefType>;
    const { t } = useTranslation(lng, 'main');

    // a custom render function
    function renderEventContent(eventInfo: any) {
        return (
          <>
            <span>{eventInfo.event.title}</span>
          </>
        )
    }

    // Add into calendar
    const events = [
        { title: '-25.00', date: '2024-07-10', dateStr: '2024-07-10' },
        { title: '-145.00', date: '2024-07-21', dateStr: '2024-07-21'  },
        { title: '-25.00', date: '2024-07-22', dateStr: '2024-07-22'  },
        { title: '-755.00', date: '2024-07-23', dateStr: '2024-07-23' },
    ]

    // Add on expense list
    interface Transaction {
        date: string;
        dateStr: string;
        items: {
          category: string;
          amount: number;
          type: 'income' | 'expense';
          paymentMethod: string;
          note?: string;
        }[];
      }

    const transactions: Transaction[] = [
        {
          date: 'Jul 10, 2024',
          dateStr: '2024-07-10',
          items: [
            { category: 'Dine out', note: '대박 왕 만두' , amount: 25.0, type: 'expense', paymentMethod: 'Credit Card'},
          ],
        },
        {
          date: 'Jul 15, 2024',
          dateStr: '2024-07-15',
          items: [
            { category: 'Grocery', note: 'H-mart', amount: 25.0, type: 'expense', paymentMethod: 'Credit Card' },
          ],
        },
        {
          date: 'Jul 21, 2024',
          dateStr: '2024-07-21',
          items: [
            { category: 'Dine out', note: '해남', amount: 90.0, type: 'expense', paymentMethod: 'Credit Card' },
            { category: 'Dine out', note: '이산', amount: 55.0, type: 'expense', paymentMethod: 'Credit Card' },
          ],
        },
        {
          date: 'Jul 22, 2024',
          dateStr: '2024-07-22',
          items: [
            { category: 'Dine out', note: 'Daebak', amount: 25.0, type: 'expense', paymentMethod: 'Credit Card' },
          ],
        },
        {
          date: 'Jul 23, 2024',
          dateStr: '2024-07-23',
          items: [
            { category: 'Utilities', note: "Phone", amount: 555.0, type: 'expense', paymentMethod: 'Credit Card' },
            { category: 'Dine out', note: "Burgerking", amount: 200.0, type: 'expense', paymentMethod: 'Credit Card' },
          ],
        },
      ];

    function handleDateClick(arg:any){
        if(expenseListsRef.current && expenseListsRef.current[arg.dateStr]){
            expenseListsRef.current[arg.dateStr]?.scrollIntoView({behavior:"smooth", block: "start", inline: "start"});
        }
    }
    function handleEventClick(arg:any){
        if(expenseListsRef.current && expenseListsRef.current[arg.event._def.extendedProps.dateStr]){
            expenseListsRef.current[arg.event._def.extendedProps.dateStr]?.scrollIntoView({behavior:"smooth", block: "start", inline: "start"});
        }
    }

    return (<div className="calendar-page-wrapper">
        <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin]}
            dateClick={handleDateClick}
            initialView='dayGridMonth'
            weekends={true}
            events={events} 
            eventClick={handleEventClick}
            eventContent={renderEventContent}
            headerToolbar={{
                left: 'prev',
                center: 'title today',
                right: 'next'
            }}
            height={"41vh"}
            selectable={true}
            dayMaxEvents={true}
            fixedWeekCount={false}
        />
         <div className="flex flex-col list-of-expenses p-4 h-[41vh]">
            <div className="flex justify-between mb-4">
                <div className="text-center">
                <p>{t('calendar.list-of-expenses.budget')}</p>
                <p className="text-green-500 font-bold">$5,000.00</p>
                </div>
                <div className="text-center">
                <p>{t('calendar.list-of-expenses.expense')}</p>
                <p className="text-red-500 font-bold">$925.00</p>
                </div>
                <div className="text-center">
                <p>{t('calendar.list-of-expenses.balance')}</p>
                <p className="text-blue-500 font-bold">$4,075.00</p>
                </div>
            </div>
            {transactions.map((transaction, index) => (
                <div key={`${transaction.date}-${index}`} className="mb-6" data-date-str={transaction.dateStr} ref={(element) => { 
                        if(element == null ) return;
                        expenseListsRef.current[transaction.dateStr] = element;
                    }}>
                    <div className="bg-gray-200 p-2 rounded-t-md">
                        <p>{transaction.date}</p>
                    </div>
                    <div className="bg-white shadow-md rounded-b-md">
                        {transaction.items.map((item, index) => (
                        <div key={index} className="flex justify-between p-2 border-b last:border-none">
                            <div className="flex">
                              <p className="font-medium">{item.category}</p>
                              {item.note && <p className="ml-2 font-medium text-gray-500">{item.note}</p>}
                            </div>
                            <p className={item.type === 'income' ? 'text-blue-500 font-bold' : 'text-red-500 font-bold'}>
                            {item.type === 'income' ? `+${item.amount.toFixed(2)}` : `-${item.amount.toFixed(2)}`}
                            </p>
                        </div>
                        ))}
                    </div>
                </div>
            ))}
            </div>      
    </div>)
}