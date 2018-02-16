// didn't find any good and free online sources for audio so the audio doesn't work on codepen

let timer;
const timerDisplay = document.querySelector('#displayTime');
const modifiers = document.querySelectorAll('i');
const breakTime = document.querySelector('#breakTime');
const pomodoroTime = document.querySelector('#mainTime');
const displayTime = document.querySelector('#display');
const name = document.querySelector('#name');
let isBreak = false;
let runTimer = false;
let pause = false;
let globalSec;

function display(sec) {
  const mins = Math.floor(sec/60);
  const secRemainder = sec%60;
  const hours = Math.floor(sec/3600);

  if (!isBreak) {
    name.innerHTML = 'Session!';
  }

  let display = `${mins < 10 ? "0" : ""}${mins}:${secRemainder < 10 ? "0" : ""}${secRemainder}`;
  if (mins >= 60) {
    display = `${hours < 10 ? "0" : ""}${hours}:${mins%60 < 10 ? "0" : ""}${mins%60}:${secRemainder < 10 ? "0" : ""}${secRemainder}`;
  }
	
	document.title = display;
	timerDisplay.textContent = display;
}

function startTime(seconds) {
  
  clearInterval(timer);
  display(seconds);
  const timeLeft = Date.now() + seconds*1000;
  
  timer = setInterval (()=> {
    
    const secondsLeft = Math.round((timeLeft - Date.now()) / 1000);
    globalSec = secondsLeft;
    
    if (secondsLeft < 1) {
      play();
      isBreak = !isBreak;
      if (isBreak === true) {
        name.innerHTML = 'Break!';
        startTimer(breakTime.placeholder * 60);
      } else {
        name.innerHTML = 'Session!';
        startTimer(pomodoroTime.placeholder * 60);
      }
    }
    display(secondsLeft);
  }, 1000);
}

function startTimer(time) {
	const seconds = parseInt(time);
	startTime(seconds);
}

modifiers.forEach(modifier => modifier.addEventListener('click', e=>{
  if (e.target.className === 'fa fa-plus-square-o' && e.target.parentElement.className === 'pomodoro') {
    if (pomodoroTime.placeholder < 1439) {
      pomodoroTime.placeholder++;
      if (runTimer === false) {
        pause = false;
        isBreak = false;
        display(pomodoroTime.placeholder * 60);
      }
    }

  } else if (e.target.className === 'fa fa-minus-square-o' && e.target.parentElement.className === 'pomodoro') {
    if (pomodoroTime.placeholder > 1) {
      pomodoroTime.placeholder--;
      if (runTimer === false) {
        pause = false;
        isBreak = false;
        display(pomodoroTime.placeholder * 60);
      }
    }

  } else if (e.target.className === 'fa fa-plus-square-o' && e.target.parentElement.className === 'break') {
    if (breakTime.placeholder < 1439) {
      breakTime.placeholder++;
    }

  } else if (e.target.className === 'fa fa-minus-square-o' && e.target.parentElement.className === 'break') {
    if (breakTime.placeholder > 1) {
      breakTime.placeholder--;
    }
  }

}));

displayTime.addEventListener('click', ()=> {
  if (runTimer === false && pause === false) {
    startTimer(pomodoroTime.placeholder * 60);
    runTimer = true;
  } else if (runTimer === true && pause === false) {
    clearInterval(timer);
    pause = true;
    runTimer = false;
  } else {
    startTimer(globalSec);
    pause = false;
    runTimer = true;
  }
});

function play() {
  const audio = document.querySelector('#audio')
  if(!audio) return;
  audio.currentTime = 0;
  audio.play();
}

display(pomodoroTime.placeholder * 60);