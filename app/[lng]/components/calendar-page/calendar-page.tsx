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
            <i>{eventInfo.event.title}</i>
          </>
        )
    }

    // Add into calendar
    const events = [
        { title: '-25.00', start: new Date('2024-7-10'), dateStr: '2024-7-10' },
        { title: '-145.00', start: new Date('2024-7-21'), dateStr: '2024-7-21'  },
        { title: '-25.00', start: new Date('2024-7-22'), dateStr: '2024-7-22'  },
        { title: '-755.00', start: new Date('2024-7-23'), dateStr: '2024-7-23' },
    ]

    // Add on expense list
    interface Transaction {
        date: string;
        dateStr: string;
        items: {
          description: string;
          amount: number;
          type: 'income' | 'expense';
          paymentMethod: string;
          note?: string;
        }[];
      }

    const transactions: Transaction[] = [
        {
          date: 'Jul 10, 2024',
          dateStr: '2024-7-10',
          items: [
            { description: 'Food', amount: 25.0, type: 'expense', paymentMethod: 'Credit Card', note: 'Daebak' },
          ],
        },
        {
          date: 'Jul 21, 2024',
          dateStr: '2024-7-21',
          items: [
            { description: 'Food', amount: 90.0, type: 'expense', paymentMethod: 'Cash' },
            { description: 'Food', amount: 55.0, type: 'expense', paymentMethod: 'Credit Card' },
          ],
        },
        {
          date: 'Jul 22, 2024',
          dateStr: '2024-7-22',
          items: [
            { description: 'Food', amount: 25.0, type: 'expense', paymentMethod: 'Credit Card', note: 'Daebak' },
          ],
        },
        {
          date: 'Jul 23, 2024',
          dateStr: '2024-7-23',
          items: [
            { description: 'Phone & Net', amount: 555.0, type: 'expense', paymentMethod: 'Credit Card' },
            { description: '밥', amount: 200.0, type: 'expense', paymentMethod: 'Credit Card' },
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
            editable={true}
            // selectable={true}
            // selectMirror={true}
            dayMaxEvents={true}
            // dayMaxEventRows={false} // Ensure this is set to false
            // moreLinkClick="popover" // Option to manage event overflow behavior
            fixedWeekCount={false} // Ensure this is set to false
        />
         <div className="flex flex-col list-of-expenses p-4">
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
                            <div>
                            <p className="font-medium">{item.description}, {item.paymentMethod}</p>
                            {item.note && <p className="text-sm text-gray-500">{item.note}</p>}
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