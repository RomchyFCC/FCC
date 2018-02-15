let timer;
//const timerDisplay = document.querySelector("");
// function to call the place in html and display current timee left

function startTime(seconds) {
  // display seconds left here
  console.log(seconds)
  const timeLeft = Date.now() + seconds*1000;
  
  timer = setInterval (()=> {
    const secondsLeft = Math.round((timeLeft - Date.now()) / 1000);
    
    if (secondsLeft < 0) {
      clearInterval(timer);
      return;
    }
    //display seconds here
    console.log(secondsLeft)
  }, 1000)

}
// someway to display break time
// play a sound when the timer runs out
startTime(20);