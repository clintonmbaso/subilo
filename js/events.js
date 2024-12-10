         // Array of events with their respective dates and reminder thresholds
         const events = [

     // Month 1
            { 
               name: "Circle Starts", 
               date: new Date("Aug 5, 2024 08:00:00").getTime(), 
               reminderDays: 2, 
               reminderHours: 12, 
               caption: "Circle Starts", 
               details: "This marks the official beginning of our circle number 6.", 
               imageUrl: "images/SI Logoghr.png" 
            },
     
     // Month 2
             { name: "Month 2 begins", 
               date: new Date("Sep 5, 2024 08:00:00").getTime(), 
               reminderDays: 2, reminderHours: 12,
               caption: "This is the beginning of the second month", 
               details: "All savings, loans and returns should all be brought in.", 
               imageUrl: "images/Logoghr.png" 
             },
     
     // Month 3
             { name: "Month 3 begins", 
               date: new Date("Oct 5, 2024 08:00:00").getTime(), 
               reminderDays: 2, reminderHours: 12,
               caption: "This is the beginning of the third month", 
               details: "All savings, loans and returns should all be brought in.", 
               imageUrl: "images/Logoghr.png" 
             },
     
     // Month 4
             { name: "Month 4 begins", 
               date: new Date("Nov 5, 2024 08:00:00").getTime(), 
               reminderDays: 2, reminderHours: 12,
               caption: "This is the beginning of the fourth month", 
               details: "All savings, loans and returns should all be brought in.", 
               imageUrl: "images/Logoghr.png" 
             },

     // Month 5
             { name: "Month 5 begins", 
               date: new Date("Dec 5, 2024 08:00:00").getTime(), 
               reminderDays: 2, reminderHours: 12,
               caption: "This is the beginning of the fifth month", 
               details: "All savings, loans and returns should all be brought in.", 
               imageUrl: "images/Logoghr.png" 
             },

     // Month 6
             { name: "Month 6 begins", 
               date: new Date("Jan 5, 2025 08:00:00").getTime(), 
               reminderDays: 2, reminderHours: 12,
               caption: "This is the beginning of the sixth month", 
               details: "All savings, loans and returns should all be brought in.", 
               imageUrl: "images/Logoghr.png" 
             },

     // Month 7
             { name: "Share Out", 
               date: new Date("Feb 5, 2025 08:00:00").getTime(), 
               reminderDays: 2, reminderHours: 12,
               caption: "This is the end of the circle", 
               details: "All savings, loans and returns should all be brought in. This is the day for sharing out the funds.", 
               imageUrl: "images/Logoghr.png" 
             }

         ];

         let currentEventIndex = 0;

         function updateCountdown() {
            // Get the current date and time
            const now = new Date().getTime();

            // Get the details of the current event
            const currentEvent = events[currentEventIndex];

            // Calculate the time remaining for the current event
            const distance = currentEvent.date - now;

            // Calculate days, hours, minutes, and seconds
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            // Display the countdown for the current event with the event name as a link
            document.getElementById("countdown").innerHTML =
               "<a href='#' onclick='showPopup(\"" + currentEvent.caption + "\", \"" + currentEvent.details + "\", \"" + currentEvent.imageUrl + "\")' style='text-decoration: none; color:#fff;'><strong>" + currentEvent.name + "</strong></a><br>" +
               days + "d " + hours + "h " + minutes + "m " + seconds + "s ";

            // Check if it's time to show a reminder
            if (distance > 0) {
               if (days === currentEvent.reminderDays && hours === currentEvent.reminderHours) {
                  showReminder(currentEvent.name);
               }
            }

            // If the countdown for the current event is over, move to the next event
            if (distance < 0) {
               currentEventIndex++;
               // If all events are completed, display a message
               if (currentEventIndex >= events.length) {
                  document.getElementById("countdown").innerHTML = "All events completed!";
               } else {
                  // Update the countdown for the next event
                  updateCountdown();
               }
            }
         }

         // Function to show the popup with image, caption, and details
         function showPopup(caption, details, imageUrl) {
            document.getElementById('popupsImage').src = imageUrl;
            document.getElementById('popupsCaption').innerHTML = caption;
            document.getElementById('popupsDetails').innerHTML = details;
            document.getElementById('popupsContainer').style.display = 'block';
            document.getElementById('blurredBackground').style.display = 'block'; // Show blurred background
         }

         // Function to close the popups
         function closePopup() {
            document.getElementById('popupsContainer').style.display = 'none';
            document.getElementById('blurredBackground').style.display = 'none'; // Hide blurred background
         }

         let lastScrollPosition = 0;
         const countdown = document.getElementById('countdown');

         window.addEventListener('scroll', () => {
            const currentScrollPosition = window.scrollY;

            if (currentScrollPosition > lastScrollPosition && currentScrollPosition > 100) {
               countdown.classList.add('hide');
            } else {
               countdown.classList.remove('hide');
            }

            lastScrollPosition = currentScrollPosition;
         });

         // Close the popup and blurred background on page load
         window.onload = function () {
            closePopup();
            updateCountdown(); // Call updateCountdown on page load
            // Update the countdown every 1 second
            setInterval(updateCountdown, 1000);
         };

