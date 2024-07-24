"use client"

import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import { useTranslation } from '../../../i18n/client'

const events = [
    { title: '-500.00', start: new Date() }
  ]

export const CalendarPage = ({ lng }: { lng: string }) => {
    const { t } = useTranslation(lng, 'main');

    // a custom render function
    function renderEventContent(eventInfo: any) {
        return (
          <>
            <i>{eventInfo.event.title}</i>
          </>
        )
    }
    interface Transaction {
        date: string;
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
          date: 'Jul 23, 2024',
          items: [
            { description: 'Phone & Net', amount: 555.0, type: 'expense', paymentMethod: 'Credit Card' },
          ],
        },
        {
          date: 'Jul 22, 2024',
          items: [
            { description: 'Salary', amount: 5000.0, type: 'income', paymentMethod: 'Cash' },
            { description: 'Food', amount: 25.0, type: 'expense', paymentMethod: 'Credit Card', note: 'Daebak' },
          ],
        },
        {
          date: 'Jul 21, 2024',
          items: [
            { description: 'Food', amount: 90.0, type: 'expense', paymentMethod: 'Cash' },
            { description: 'Food', amount: 55.0, type: 'expense', paymentMethod: 'Credit Card' },
          ],
        },
        {
          date: 'Jul 22, 2024',
          items: [
            { description: 'Salary', amount: 5000.0, type: 'income', paymentMethod: 'Cash' },
            { description: 'Food', amount: 25.0, type: 'expense', paymentMethod: 'Credit Card', note: 'Daebak' },
          ],
        },
      ];

    function handleDateClick(arg:any){
        console.log(arg)
    }

    return (<div className="calendar-page-wrapper">
        <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin]}
            dateClick={handleDateClick}
            initialView='dayGridMonth'
            weekends={false}
            events={events}
            eventContent={renderEventContent}
            headerToolbar={{
                left: 'prev',
                center: 'title today',
                right: 'next'
            }}
            // editable={true}
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
                <div key={`${transaction.date}-${index}`} className="mb-6">
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