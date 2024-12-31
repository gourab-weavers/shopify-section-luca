let countdownFunctions = [];

// Function to start a countdown
function startCountdown(date, countdownElementId, box_type, show_days, show_hours, show_minutes, show_seconds) {
    // Clear any existing countdown for this target
    clearInterval(countdownFunctions[countdownElementId]);
    
    const targetDate = new Date(date).getTime();
    
    countdownFunctions[countdownElementId] = setInterval(() => {
    const now = new Date().getTime();
    const distance = targetDate - now;

    // Calculate time components
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    if(box_type != "deal2"){
        // Update DOM for each countdown
        if(show_days){
        document.getElementById(`days_${countdownElementId}`).innerText = String(days).padStart(2, '0');
        }
        if(show_hours){
        document.getElementById(`hours_${countdownElementId}`).innerText = String(hours).padStart(2, '0');
        }
        if(show_minutes){
        document.getElementById(`minutes_${countdownElementId}`).innerText = String(minutes).padStart(2, '0');
        }
        if(show_seconds){
        document.getElementById(`seconds_${countdownElementId}`).innerText = String(seconds).padStart(2, '0');
        }
    }else{
        if(show_days){
        document.querySelector(`.days_${countdownElementId}.tens`).textContent = days.toString().padStart(2, '0')[0];
        document.querySelector(`.days_${countdownElementId}.units`).textContent = days.toString().padStart(2, '0')[1];
        }
        if(show_hours){
        document.querySelector(`.hours_${countdownElementId}.tens`).textContent = hours.toString().padStart(2, '0')[0];
        document.querySelector(`.hours_${countdownElementId}.units`).textContent = hours.toString().padStart(2, '0')[1];
        }
        if(show_minutes){
        document.querySelector(`.minutes_${countdownElementId}.tens`).textContent = minutes.toString().padStart(2, '0')[0];
        document.querySelector(`.minutes_${countdownElementId}.units`).textContent = minutes.toString().padStart(2, '0')[1];
        }
        if(show_seconds){
        document.querySelector(`.seconds_${countdownElementId}.tens`).textContent = seconds.toString().padStart(2, '0')[0];
        document.querySelector(`.seconds_${countdownElementId}.units`).textContent = seconds.toString().padStart(2, '0')[1];
        }
    }
    // When the countdown reaches zero
    if (distance < 0) {
        clearInterval(countdownFunctions[countdownElementId]);
        document.getElementById(`countdown-${countdownElementId}`).innerHTML = "<h1>The New Year is here!</h1>";
    }
    }, 1000);
}