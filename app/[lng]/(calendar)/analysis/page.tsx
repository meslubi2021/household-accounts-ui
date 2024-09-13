"use client";

import { useTranslation } from '@/app/lib/i18n/client';
import { useDispatch, useSelector } from 'react-redux';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import { calendarActions, refreshActions } from '@/app/lib/redux';
import { format } from 'date-fns'

import React, { useState } from 'react';

export default function Index({ params: { lng }} : any) {
    const { t } = useTranslation(lng, 'main');
    const dispatch = useDispatch();
    const { selectedDateStr } = useSelector((state:any) => state.calendar);


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
       Coming soon
    </>
    );
}