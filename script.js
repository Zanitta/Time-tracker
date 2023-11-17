document.addEventListener("DOMContentLoaded", function() { 
 
 
  const dailyBtn = document.getElementById("daily-btn"); 
  const weeklyBtn = document.getElementById("weekly-btn"); 
  const monthlyBtn = document.getElementById("monthly-btn"); 
  const activityDisplay = document.querySelector(".firstcard"); 

  let selectedTimeframe = "daily"; // Default to daily timeframe 

  dailyBtn.addEventListener("click", () => { 
      selectedTimeframe = "daily"; 
      displayData(); 
      setActiveButton(dailyBtn); 
  }); 

  weeklyBtn.addEventListener("click", () => { 
      selectedTimeframe = "weekly"; 
      displayData(); 
      setActiveButton(weeklyBtn); 
  }); 

  monthlyBtn.addEventListener("click", () => { 
      selectedTimeframe = "monthly"; 
      displayData(); 
      setActiveButton(monthlyBtn); 

  }); 

  function displayData() { 
      fetch("data.json") // Replace "data.json" with the actual path to your JSON file 
          .then(response => response.json()) 
          .then(data => { 
              activityDisplay.innerHTML = ""; 
              const dataToShow = data.map(activity => { 
                 const displayElement = document.createElement('div') 
                 displayElement.classList.add('card'); 
                  
      
                 displayElement.innerHTML=` 
                 <div class="biggerWork">
                 <img class="image2" src="${activity.image}" alt="Background for work">
               </div>
         
               <div class="workbox">
                 <div class="workContainer">
                   <p class="workDay">${activity.title}</p>
                   <img src="images/Combined Shape.svg" alt="3dots" class="dots">
                 </div>
                 <p class="workTime">${activity.timeframes[selectedTimeframe].current}</p>
                 <p class="workWeek">Last Week - ${activity.timeframes[selectedTimeframe].previous}</p>
               </div>
                             
              ` 
              activityDisplay.appendChild(displayElement) 
              }); 
          }) 
          .catch(error => { 
              console.error("Error fetching data:", error); 
          }); 
  } 

   
  function setActiveButton(btn) { 
      // Remove 'active' class from all buttons 
      [dailyBtn, weeklyBtn, monthlyBtn].forEach(button => { 
          button.classList.remove('active'); 
          button.style.color='';
      }); 

      // Set 'active' class and white background for the clicked button 
      btn.classList.add('active'); 
      btn.style.color = 'white'; 
  } 

   
  displayData(); // Initially display the data with the default timeframe 
});