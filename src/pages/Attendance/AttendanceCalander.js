import React from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import styles from "../../pages/School/sList.module.css";

const AttendanceCalander =()=>  {
    const localizer = momentLocalizer(moment);

    let presentCount = 0;
    let absentCount = 0;
    let halfDayCount = 0;
    let leaveCount = 0;


    const eventData = [
        {
          // id: 
          title: 'present',
          start: new Date(2023, 4, 1),
          end: new Date(2023, 4, 1),
          type: 'present',
          // allDay: true,
        },
        {
          title: 'absent',
          start: new Date(2023, 4, 2),
          end: new Date(2023, 4, 2),
          type: 'absent',
          // allDay: true,
        },
        {
          title: 'half Day',
          start: new Date(2023, 4, 3),
          end: new Date(2023, 4, 3),
          type: 'halfDay',
          // allDay: true,
        },
        {
          title: 'leave',
          start: new Date(2023, 4, 4),
          end: new Date(2023, 4, 4),
          type: 'leave',
        },
        {
          // id: 
          title: 'present',
          start: new Date(2023, 4, 5),
          end: new Date(2023, 4, 5),
          type: 'present',
          // allDay: true,
        },
        {
          // id: 
          title: 'present',
          start: new Date(2023, 4, 8),
          end: new Date(2023, 4, 8),
          type: 'present',
          // allDay: true,
        },
        {
          // id: 
          title: 'present',
          start: new Date(2023, 4, 9),
          end: new Date(2023, 4, 9),
          type: 'present',
          // allDay: true,
        },
        {
          // id: 
          title: 'present',
          start: new Date(2023, 4, 10),
          end: new Date(2023, 4, 10),
          type: 'present',
          // allDay: true,
        },
        {
          title: 'absent',
          start: new Date(2023, 4, 11),
          end: new Date(2023, 4, 11),
          type: 'absent',
          // allDay: true,
        },
        {
          // id: 
          title: 'present',
          start: new Date(2023, 4, 12),
          end: new Date(2023, 4, 12),
          type: 'present',
          // allDay: true,
        },
        {
          // id: 
          title: 'half Day',
          start: new Date(2023, 4, 15),
          end: new Date(2023, 4, 15),
          type: 'halfDay',
          // allDay: true,
        },
        {
          title: 'half Day',
          start: new Date(2023, 4, 16),
          end: new Date(2023, 4, 16),
          type: 'halfDay',
          // allDay: true,
        },
        {
          // id: 
          title: 'half Day',
          start: new Date(2023, 4, 17),
          end: new Date(2023, 4, 17),
          type: 'halfDay',
          // allDay: true,
        },
        {
          title: 'leave',
          start: new Date(2023, 4, 18),
          end: new Date(2023, 4, 18),
          type: 'leave',
        },
        // Add more events as needed
      ];

    const eventStyleGetter = (event, start, end, isSelected) => {
        let eventStyle = {};
        
        if (event.type === 'present') {
          eventStyle.backgroundColor = '#44AF69';
        } else if (event.type === 'absent') {
          eventStyle.backgroundColor = 'red';
        }
        else if (event.type === 'halfDay') {
          eventStyle.backgroundColor = '#6b58d3';
        }
        else if (event.type === 'leave') {
          eventStyle.backgroundColor = '#FF5316';
        }
        // Add more conditions for different event types and colors
        
        return {
          className: '',
          style: eventStyle,
        };
      };
    
      const dayStyleGetter = (date) => {
        const day = date.getDay();
        let dayStyle = {};
      
        if (day === 0) {
          dayStyle.backgroundColor = '#ddd';
        }
      
        return {
          style: dayStyle,
        };
      };
    
      const handleEventSelection = (event) => {
        // Perform the desired action when an event is clicked
        console.log('Event selected:', event);
      };
    
    
    eventData.forEach(event => {
      switch (event.type) {
        case 'present':
          presentCount++;
          break;
        case 'absent':
          absentCount++;
          break;
        case 'halfDay':
          halfDayCount++;
          break;
        case 'leave':
          leaveCount++;
          break;
        default:
          break;
      }
    });
  return (
    <div className={styles.ulList}>
       <ol>
        <li className={styles.presents}>Present : {presentCount}</li>
        <li className={styles.absents}>Absent : {absentCount}</li>
        <li className={styles.halfDay}>Half Day : {halfDayCount}</li>
        <li className={styles.leaves}>Leave : {leaveCount}</li>
      </ol>
         <Calendar
        localizer={localizer}
        events={eventData}
        startAccessor="start"
        // endAccessor="end"
        eventPropGetter={eventStyleGetter}
        style={{ height: 500 }}
        dayPropGetter={dayStyleGetter}
        views={['month']} // Specify the views to display
        onSelectEvent={handleEventSelection} 
        className="calendarDiv"
        eventTimeRangeFormat={{
          hour: 'numeric',
          minute: '2-digit',
          meridiem: false,
        }}
      />
        
    </div>
  )
}

export default AttendanceCalander