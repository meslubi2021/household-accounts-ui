"use client"

import React, { useState, useRef, MutableRefObject, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import { useTranslation } from '../../../i18n/client'
import { budgetService, transactionService } from '../../api-services';
import { Budget, Transaction, CalendarEvent } from '../../models';
import { formatCurrency } from '../../utils';
import { format } from 'date-fns'

type RefType = {
    [key: string]: HTMLElement | null;
};

export const CalendarPage = ({ lng }: { lng: string }) => {
    const expenseListsRef = useRef<RefType>({}) as MutableRefObject<RefType>;
    const { t } = useTranslation(lng, 'main');
    const [ budget, setBudget ] = useState<Budget>();
    const [ totalAmountOfExpense, setTotalAmountOfExpense ] = useState<number>(0);
    const [ expenses, setExpenses ] = useState<Transaction[]>();
    const [ calendarEvent, setCalendarEvent ] = useState<CalendarEvent[]>([]);

    useEffect(() => {
      init();
      buildEvents();
    }, []);

    useEffect(() => {
      buildEvents();
    }, [expenses])

    async function init() {
      try{
        const bugbetRes = await budgetService.getByUserIdMonth('user-id', 'selectedMonth');
        const transactionRes = await transactionService.getExpenseByUserIdMonth('user-id', 'selectedMonth');
        setBudget(bugbetRes);
        setExpenses(transactionRes);
      }catch(err){
        console.log(err);
      }
    }

    // a custom render function
    function renderEventContent(eventInfo: any) {
        return (
          <>
            <span>{eventInfo.event.title}</span>
          </>
        )
    }

    function buildEvents() {
      if(expenses == null) return;

      const result: { [key: string]: string }[] = [];
      let totalExpenseTemp = 0
      expenses.forEach((expense) => {
        const totalAmount = expense.items.reduce((sum, item) => sum + item.amount, 0);
        totalExpenseTemp += totalAmount;
        result.push({title: `-${formatCurrency(totalAmount)}`, date: expense.dateStr, dataStr: expense.dateStr});
      });

      setTotalAmountOfExpense(totalExpenseTemp);
      setCalendarEvent(result as CalendarEvent[]);
    } 

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

    const handleDatesSet = (arg: any) => {      
      const calendarApi = arg.view.calendar;
      const currentDate = calendarApi.getDate();

      // Selected Month, need to store it globally.
      // format(currentDate, 'yyyy-MM-dd')
    };

    return (<div className="calendar-page-wrapper">
        <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin]}
            dateClick={handleDateClick}
            datesSet={handleDatesSet} // to handle pre / next on headerTool bar event.
            initialView='dayGridMonth'
            weekends={true}
            events={calendarEvent} 
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
                <p className="text-green-500 font-bold">${budget && formatCurrency(budget.totalAmount)}</p>
                </div>
                <div className="text-center">
                <p>{t('calendar.list-of-expenses.expense')}</p>
                <p className="text-red-500 font-bold">${formatCurrency(totalAmountOfExpense)}</p>
                </div>
                <div className="text-center">
                <p>{t('calendar.list-of-expenses.balance')}</p>
                <p className="text-blue-500 font-bold">${budget && formatCurrency(budget.totalAmount - totalAmountOfExpense)}</p>
                </div>
            </div>
            {expenses && expenses.map((expense, index) => (
                <div key={`${expense.date}-${index}`} className="mb-6" data-date-str={expense.dateStr} ref={(element) => { 
                        if(element == null ) return;
                        expenseListsRef.current[expense.dateStr] = element;
                    }}>
                    <div className="bg-gray-200 p-2 rounded-t-md">
                        <p>{expense.date}</p>
                    </div>
                    <div className="bg-white shadow-md rounded-b-md">
                        {expense.items.map((item, index) => (
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