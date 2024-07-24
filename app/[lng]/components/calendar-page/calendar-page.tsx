"use client"

import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import { useTranslation } from '../../../i18n/client'

const events = [
    { title: '500', start: new Date() }
  ]

export const CalendarPage = ({ lng }: { lng: string }) => {
    const { t } = useTranslation(lng, 'calendar')    

    // a custom render function
    function renderEventContent(eventInfo: any) {
        return (
          <>
            <i>{eventInfo.event.title}</i>
          </>
        )
      }

    return (<div className="calendar-page-wrapper">
        <FullCalendar
            plugins={[dayGridPlugin]}
            initialView='dayGridMonth'
            weekends={false}
            events={events}
            eventContent={renderEventContent}
            headerToolbar={{
                left: 'prev',
                center: 'title today',
                right: 'next'
            }}
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            dayMaxEventRows={false} // Ensure this is set to false
            moreLinkClick="popover" // Option to manage event overflow behavior
            fixedWeekCount={false} // Ensure this is set to false
        />        
    </div>)
}