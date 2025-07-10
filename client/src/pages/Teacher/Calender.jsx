import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import listPlugin from '@fullcalendar/list';
import interactionPlugin from "@fullcalendar/interaction";
    
const Calender = () => {

  const [selectedDate, setSelectedDate] = useState(null);
  const handleDateClick = (arg) => {
    arg.dayEl.style.backgroundColor = "#EBF8FB";
    setSelectedDate(arg.dateStr); 
    console.log(selectedDate);
  };

  const events = [
    {
      id: 1,
      title: "Meeting dqsdk  qsldjl qss qdslj lkqssdqjl ",
      start: new Date("2024-04-10T11:00:00Z"), 
      end: new Date("2024-04-10T11:   :00Z"),
      bg: "red",
      location: "Conference Room A", // Additional data property
      attendees: ["Alice", "Bob"], 

    },
    {
        id: 3,
        title: "Mesqdeting",
        start: new Date("2024-04-10T15:00:00Z"), 
        end: new Date("2024-04-10T11:00:00Z"),
        bg: "red",
        location: "Conference Room A", // Additional data property
      attendees: ["Alice", "Bob"], 
  
      },
    {
      id: 2,
      title: "Meeting",
      start: new Date("2024-04-07T12:00:00Z"), 
      end: new Date("2024-04-07T15:00:00Z"),
      bg: "#00FFFF",
      location: "Conference Room A", // Additional data property
      attendees: ["Alice", "Bob"], 

    }, // Ensure end time is in UTC
  ];

  const eventSources = [
    {
      events: events.map((event) => ({
        
        ...event, 
        backgroundColor: event.bg,
        borderColor: event.bg, 
        textColor:event.bg
      
      })),
      eventContent: (eventInfo) => {
        const title = eventInfo.event.title;
        const location = eventInfo.event.extendedProps.location; // Access data from extendedProps
        const attendees = eventInfo.event.extendedProps.attendees.join(", "); // Format attendees
  
        return {
          // Default event properties
          ...eventInfo.event,
          title: `${title} - ${location}`, // Combine title and location
          content: attendees ? `Attendees: ${attendees}` : "", // Display attendees if available
        };},
      color: (eventInfo) => eventInfo.event.backgroundColor, 
    },
  ];
  const calendarOptions = {
    // ... other calendar options
  
    buttonText: {
      today: "Aujourd'hui" // Change "today" text to "Go to Today"
    }
  };
  return (
    <>
    <div className=" hidden md:block lg:block ">
         <FullCalendar
      plugins={[dayGridPlugin, interactionPlugin]}
      timeZone="Africa/Tunis"
      initialView="dayGridMonth"
      locale="fr"
      {...calendarOptions} 
      dateClick={handleDateClick}
     eventSources={eventSources}
    /></div>

    <div className=" block md:hidden lg:hidden  overflow-x-auto ">
    <FullCalendar

      plugins={[ listPlugin , interactionPlugin]}
      {...calendarOptions} 
      timeZone="Africa/Tunis"
      initialView="listWeek"
      locale="fr"
     eventSources={eventSources}
    />
    </div>
   
    </>
  );
};

export default Calender;
