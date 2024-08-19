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
      if (month === 0 && day === 1) {
        return [`New Year on ${year}-01-${day}`];
      } 
      
      else if (month === 0 && day === 21) {
        return [`MEZC - Youth Council at University Church on ${year}-01-${day}`];
      } 
      
      else if (month === 0 && day === 27) {
        return [`Rockside Induction Ceremony on ${year}-01-${day}`];
      } 
      
      
      //February
      else if (month === 1 && day === 3) {
        return [`KEMD - Closing date for all Inductions on ${year}-02-${day}`,,`All Churches along with their Companies and branches should ensure that they get done with the inductions.`];
      } 
      
      
      
      else if (month === 1 && day === 25) {
        return [`KEMD - Adventurer Bible Quiz on ${year}-02-${day}`];
      } 
      
      
      //March
      else if (month === 2 && day === 3) {
        return [`KEMD - Leadership Seminar on ${year}-03-${day}`,,`All leaders should attend this program without fail. The only exception are the Pathfinder directors and their committees for the conference has organized for them a CMT specifically for them. All other members are welcome to attend.`];
      } 
      
      else if (month === 2 && day === 7) {
        return [`MEZC - Leadership Seminar on ${year}-03-${day}`,,`All district leaders should attend this program without fail.`];
      } 
      
      else if (month === 2 && day === 10) {
        return [`MEZC - Town Cleaning on ${year}-03-${day}`];
      }
      
      else if (month === 2 && day === 16) {
        return [`MEZC - Global Youth Day on ${year}-03-${day}`,`Adventurer Community Service on ${year}-03-${day}`];
      }

      else if (month === 2 && day === 17) {
        return [`MEZC - Youth Week of Prayer starting on ${year}-03-${day}`,,`All leaders should attend this program without fail. The only exception are the Pathfinder directors and their committees for the conference has organized for them a CMT specifically for them. All other members are welcome to attend.`];
      } 
      
      else if (month === 2 && day === 30) {
        return [`KEMD - Big Sabbath / Uniform Launch on ${year}-03-${day}`];
      }
      
      else if (month === 2 && day === 31) {
        return [`MEZC - I Love My Neighbor by the Young Adults in Local Churches on ${year}-03-${day}`,`KEMD - Pathfinder Fair on ${year}-03-${day}`];
      }
      
      
      
      
      //April
      else if (month === 3 && day === 13) {
        return [`KEMD - Music Rotations (Zone B - Zone A) on ${year}-04-${day}`];
      }

      else if (month === 3 && day === 28) {
        return [`KEMD - Honor Assessments on ${year}-04-${day}`];
      }
      
    /*  else if (month === 3 && day === 14) {
        return [`KEMD - Music Fellowship on ${year}-04-${day}`];
      }*/
      
      else if (month === 3 && day === 14) {
        return [`MEZC - Youth Council at Kabwe Central Church on ${year}-04-${day}`,`KEMD - Music Fellowship on ${year}-04-${day}`];
      }
      
      else if (month === 3 && day === 21) {
        return [`NZUC - Mpika Pathfinder Camporee on ${year}-04-${day}`];
      }
      
      else if (month === 3 && day === 26) {
        return [`KEMD - Expedition (Silver/Gold Award) on ${year}-04-${day}`];
      }
      
      
      
      //May
      else if (month === 4 && day === 5) {
        return [`MEZC - Ambassador Charity Box in Local Churches on ${year}-05-${day}`,`KEMD - Pathfinder Bible Quiz and Spelling Bee on ${year}-05-${day}`];
      }
      
      else if (month === 4 && day === 18) {
        return [`GC - Global Adventurer Day on ${year}-05-${day}`];
      }
        
      else if (month === 4 && day === 19) {
        return [`MEZC - Youth Council on ${year}-05-${day}`];
      }
      
      else if (month === 4 && day === 25) {
        return [`MEZC - Fundraising Music Fellowship on ${year}-05-${day}`];
      }
      
      else if (month === 4 && day === 26) {
        return [`KEMD - Adventurer Arts and Skills Day on ${year}-05-${day}`,`KEMD - Pathfinder Bible Quiz and Spelling Bee on ${year}-05-${day}`,`KEMD - Ambassador Community Service on ${year}-05-${day}`];
      }
      
      else if (month === 4 && day === 19) {
        return [`KEMD - Album Promotion on ${year}-05-${day}`];
      }
      
     /* else if (month === 4 && day === 71) {
        return [`KEMD - Ambassador Community Service on ${year}-05-${day}`];
      }*/
      
      else if (month === 4 && day === 12) {
        return [`KEMD - Church Heritage Exams on ${year}-05-${day}`];
      }

      
      
      //June
      
      else if (month === 5 && day === 2) {
        return [`KEMD - Young Adult Reunion on ${year}-06-${day}`];
      }

      else if (month === 5 && day === 9) {
        return [`KEMD - Education Church Heritage on ${year}-06-${day}`];
      }          

      else if (month === 5 && day === 16) {
        return [`KEMD - Pathfinder Bible Quiz on ${year}-06-${day}`];
      }                 
      
      else if (month === 5 && day === 28) {
        return [`KEMD - Silver Award Expedition on ${year}-06-${day}`];
      }
        
      else if (month === 5 && day === 58) {
        return [`KEMD - Ambassador Education tour on ${year}-06-${day}`];
      }
      
      else if (month === 5 && day === 30) {
        return [`MEZC - I Love My Neighbor by the Young Adults in Local Churches on ${year}-06-${day}`];
      }
      
      
      
      
      //July
      else if (month === 6 && day === 18) {
        return [`Happy Birthday Shaelyn on ${year}-07-${day}`];
      }
      
      else if (month === 6 && day === 19) {
        return [`School Tour on ${year}-07-${day}`];
      }
      
      else if (month === 6 && day === 22) {
        return [`Revisions Begin on ${year}-07-${day}`];
      }
      
      else if (month === 6 && day === 29) {
        return [`End of Term 2 Assessments begin on ${year}-06-${day}`];
      }

      
      
      //August

      else if (month === 7 && day === 7) {
        return [`End of Assessments on ${year}-08-${day}`];
      }
      
      else if (month === 7 && day === 8) {
        return [`Compilling Results on ${year}-08-${day}`];
      }
      
      else if (month === 7 && day === 9) {
        return [`School Closes on ${year}-08-${day}`];
      }
      
      
      
      //September
      else if (month === 8 && day === 1) {
        return [`Anniversary on ${year}-09-${day}`];
      }
      
      else if (month === 8 && day === 2) {
        return [`School opens on ${year}-09-${day}`];
      }
      
      else if (month === 8 && day === 13) {
        return [`All requirents should be brought in on ${year}-09-${day}`];
      }
      
      else if (month === 8 && day === 20) {
        return [`All September Payments should be cleared on ${year}-09-${day}`];
      }
      
 /*     else if (month === 8 && day === 21) {
        return [`GC - Pathfinder Day in Local Churches on ${year}-09-${day}`];
      }
      
      else if (month === 8 && day === 22) {
        return [`KEMD - Pathfinder Back to School Community Service on ${year}-09-${day}`];
      }
      
      else if (month === 8 && day === 29) {
        return [`MEZC - I Love My Neighbor by the Young Adults in Local Churches on ${year}-09-${day}`];
      }*/
      
      
      
      
      //October
      
        else if (month === 9 && day === 5) {
        return [`Teachers Day on ${year}-10-${day}`];
      }
        
      else if (month === 9 && day === 6) {
        return [`Teachers Day Out on ${year}-10-${day}`];
      }
        
      else if (month === 9 && day === 7) {
        return [`Mid-Term 3 Assessments Begin on ${year}-10-${day}`];
      }
        
      else if (month === 9 && day === 13) {
        return [`Happy Birthday Bridget on ${year}-10-${day}`];
      }
      
      else if (month === 9 && day === 18) {
        return [`National Prayers and Fasting Day on ${year}-10-${day}`];
      }
      
      else if (month === 9 && day === 24) {
        return [`Independence Day on ${year}-10-${day}`];
      }

      
      
      
      
      
      //November
      else if (month === 10 && day === 25) {
        return [`End-Term Assessments Begin on ${year}-11-${day}`];
      }
        
      
      
      //December
      else if (month === 11 && day === 4) {
        return [`End of Assessments on ${year}-12-${day}`];
      }
      
      else if (month === 11 && day === 5) {
        return [`Graduation Day on ${year}-12-${day}`];
      }
      
      else if (month === 11 && day === 6) {
        return [`Open Day on ${year}-12-${day}`];
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