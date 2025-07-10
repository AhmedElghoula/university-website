import React, { useEffect } from 'react'
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin  from '@fullcalendar/timegrid';

const TimeTable = () => {
  const courses = [
    {
      id: 1,
      title: 'GL',
      professor: 'salle i-20',
      start: '2024-04-25T10:00:00',
      end: '2024-04-25T12:30:00',
    },
    {
      id: 2,
      title: 'ALGO',
      professor: 'salle i-13',
      start: '2024-04-25T14:00:00',
      end: '2024-04-25T16:30:00',
    },
    {
      id: 3,
      title: 'ALGO',
      professor: 'salle i-13',
      start: '2024-04-26T14:00:00',
      end: '2024-04-26T16:30:00',
    },
    {
      id: 4,
      title: 'ALGO',
      professor: 'salle i-13',
      start: '2024-04-24T14:00:00',
      end: '2024-04-24T16:30:00',
    },
  ];
    const calendarOptions = {
        plugins: [timeGridPlugin , timeGridPlugin],
        allDaySlot: false ,
      
        buttonText: {
            today: "Aujourd'hui" 
          },
          locale:"fr",
          views: {
            timeGridWeek: { // Or 'timeGridDay' for daily view
              visibleRange: {
                start: '08:00:00', // Set start date and time (April 9th, 8:00 AM)
                end:'18:00:00'  // Set end date and time (April 12th, 5:00 PM)
              }
            }
          }
       
      };
  return (
    <div className='overflow-x-auto'>
        <div className='inline-block   w-full  min-w-[600px]'>
        <FullCalendar {...calendarOptions} events={courses.map(course => ({
        id: course.id,
        title: `${course.title} (${course.professor})`,
        start: course.start,
        end: course.end,
      }))} slotDuration={'00:30:00'}  />
        </div>
 
    </div>
  
  )
}

export default TimeTable