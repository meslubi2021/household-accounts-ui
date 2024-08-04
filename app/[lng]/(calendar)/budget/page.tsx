"use client"

import { useTranslation } from '../../../i18n/client';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { transactionService } from '../../api-services';
import { useSessionStorageState } from '../../utils/custom-hook';
import { calendarActions, refreshActions } from '../../utils/redux';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import { format } from 'date-fns'

export default function Index({ params: { lng }} : any) {
    const { t } = useTranslation(lng, 'main');
    const dispatch = useDispatch();
    const { selectedDateStr } = useSelector((state:any) => state.calendar);
    const { isBudgetPageRefresh } = useSelector((state:any) => state.refresh);
    const [ userInfo, _ ] = useSessionStorageState("userInfo", "");
    const [ totalIncome, setTotalIncome ] = useState(0);

    useEffect(() => {
        if(!isBudgetPageRefresh) return;
        if(selectedDateStr === "") return;
        init(selectedDateStr);
        dispatch(refreshActions.setIsBudgetPageRefresh(false));
      }, [isBudgetPageRefresh]);

    useEffect(() => {
        if(selectedDateStr === "") return;
        init(selectedDateStr);
    }, [selectedDateStr])

    async function init(selectedDateStr:string) {
        try{
            if(userInfo === ""){
              throw new Error("Userinfo is not correct.")
            }
            const [year, month] = selectedDateStr.split('-'); // ["2024", "08"]
            const prevMonth = parseInt(month) - 1;
            const transactionRes = await transactionService.getIncomeByUserId(userInfo._id, year, prevMonth.toString());
            let totalAmount = 0;
            transactionRes?.forEach(transaction => totalAmount += transaction.totalAmount);
            setTotalIncome(totalAmount);
        }catch(err){
            console.log(err);
        }
    }
    const handleDatesSet = (arg: any) => {      
      const calendarApi = arg.view.calendar;
      const currentDate = calendarApi.getDate();
  
      // Selected Month, need to store it globally.
      dispatch(calendarActions.setSelectedDateStr(format(currentDate, 'yyyy-MM-dd')));
    };

    return (<>
    <div className="budget-page-wrapper">
        <FullCalendar 
            plugins={[dayGridPlugin]}
            datesSet={handleDatesSet} // to handle pre / next on headerTool bar event.
            headerToolbar={{
                left: 'prev',
                center: 'title today',
                right: 'next'
            }}
         />
    </div>
    <div>
       Total incomes: {totalIncome}
    </div>
    </>
    );
}