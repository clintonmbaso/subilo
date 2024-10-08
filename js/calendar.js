function displayCalendar(inputDate) {
  const calendarBody = document.getElementById('calendar-body');
  const monthYearElement = document.getElementById('month-year');

  // Set currentDate to the inputDate or the current date if inputDate is not provided
  const currentDate = inputDate || new Date();
  currentDate.setDate(1); // Set currentDate to the first day of the month

  // Display the month and year in the monthYearElement
  const monthOptions = { month: 'long' };
  const monthName = new Intl.DateTimeFormat('en-US', monthOptions).format(currentDate);
  const year = currentDate.getFullYear();
  monthYearElement.textContent = `${monthName} ${year}`;

  // Clear the calendar body before populating new dates
  calendarBody.innerHTML = '';

  // Calculate necessary values for calendar generation
  const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay(); // Day of the week of the first day
  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate(); // Number of days in the current month
  const daysInPrevMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0).getDate(); // Number of days in the previous month
  const daysInNextMonth = 42 - (daysInMonth + firstDay); // Number of days in the next month needed for layout

  // Array to hold calendar dates with events
  const calendarDates = [];

  // Populate calendarDates array with dates and associated events
  for (let i = 1 - firstDay; i <= daysInMonth; i++) {
        const day = i > 0 ? i : '';
        const events = getEventsForDay(currentDate.getFullYear(), currentDate.getMonth(), day);
        calendarDates.push({ day, events });
      }

  // Generate calendar grid by iterating through calendarDates array
  let row;
  calendarDates.forEach((date, index) => {
    if (index % 7 === 0) {
      row = calendarBody.insertRow();
    }

    const cell = row.insertCell();
    cell.textContent = date.day;

    // Remove the .current-day class from all cells
    cell.classList.remove('current-day');

    // Check if the current date matches the date being iterated and apply .current-day class if true
    if (
      date.day === new Date().getDate() &&
      currentDate.getMonth() === new Date().getMonth() &&
      currentDate.getFullYear() === new Date().getFullYear()
    ) {
      cell.classList.add('current-day');
    }

    // Event handling for clicking on events, if applicable
    if (date.events.length > 0) {
      const dot = document.createElement('div');
      dot.className = 'dot';
      cell.appendChild(dot);

      dot.addEventListener('click', function () {
        openModal(date.events);
      });
    }
  });
}

    function getEventsForDay(year, month, day) {
      
      //January
      if (month === 0 && day === 5) {
        return [`Month 6 begins on ${year}-01-${day}`];
      } 
      
      
      //February
      else if (month === 1 && day === 5) {
        return [`Circle 6 ends on ${year}-02-${day}`,,`All Churches along with their Companies and branches should ensure that they get done with the inductions.`];
      } 
      

      //March
      else if (month === 2 && day === 5) {
        return [`KEMD - Leadership Seminar on ${year}-03-${day}`,,`All leaders should attend this program without fail. The only exception are the Pathfinder directors and their committees for the conference has organized for them a CMT specifically for them. All other members are welcome to attend.`];
      } 
      
      
      //April
      else if (month === 3 && day === 13) {
        return [`KEMD - Music Rotations (Zone B - Zone A) on ${year}-04-${day}`];
      }

      
      //May
      else if (month === 4 && day === 5) {
        return [`MEZC - Ambassador Charity Box in Local Churches on ${year}-05-${day}`,`KEMD - Pathfinder Bible Quiz and Spelling Bee on ${year}-05-${day}`];
      }
      
      
      
      //June
      
      else if (month === 5 && day === 2) {
        return [`KEMD - Young Adult Reunion on ${year}-06-${day}`];
      }

      
      
      //July
      else if (month === 6 && day === 18) {
        return [`Happy Birthday Shaelyn on ${year}-07-${day}`];
      }
      
      
      
      
      //August

      else if (month === 7 && day === 5) {
        return [`Circle 6 begins on ${year}-08-${day}`];
      }
      

      
      //September
      else if (month === 8 && day === 5) {
        return [`Month 2 begins on ${year}-09-${day}`];
      }
      
      
      
      //October
      
        else if (month === 9 && day === 5) {
        return [`Month 3  begins on ${year}-10-${day}`];
      }
        
      
      
      //November
      else if (month === 10 && day === 5) {
        return [`Month 4 begins on ${year}-11-${day}`];
      }
        
      
      
      //December
      else if (month === 11 && day === 5) {
        return [`Month 5 begins on ${year}-12-${day}`];
      }
      
        

        
      return [];
    }

    function openModal(events) {
      const modal = document.getElementById('eventModal');
      const eventList = document.getElementById('eventList');

      eventList.innerHTML = '';

      events.forEach(event => {
        const listItem = document.createElement('p');
        listItem.textContent = event;
        eventList.appendChild(listItem);
      });

      modal.style.display = 'block';
    }

    function closeModal() {
      const modal = document.getElementById('eventModal');
      modal.style.display = 'none';
    }

    function showPreviousMonth() {
  const currentDate = new Date(document.getElementById('month-year').textContent);
  currentDate.setMonth(currentDate.getMonth() - 1);
  displayCalendar(currentDate);
}

function showNextMonth() {
  const currentDate = new Date(document.getElementById('month-year').textContent);
  currentDate.setMonth(currentDate.getMonth() + 1);
  displayCalendar(currentDate);
}


  // Call displayCalendar when the page is fully loaded
  window.onload = function() {
    displayCalendar();
  };