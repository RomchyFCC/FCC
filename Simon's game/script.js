const sections = document.querySelectorAll('.section');
let generatedSequence = [];
let playerSequence = [];
let time = 1250;
let game = false;
let strict = false;

function playGame() {
  if (game === true) {
    generateSequence();
    display();
    playSequence();
  }
}

// function that generates a random number between 1-4 and puts it in the generatedSequence array
function generateSequence() {
    generatedSequence.push(Math.floor(Math.random() * 4) + 1)
}

// function that when called plays the sequence stored in the generatedSequence array
function playSequence() {
  if(generatedSequence.length > 5 && generatedSequence.length <= 9) {
    time = 1000;
  } else if (generatedSequence.length > 9 && generatedSequence.length <= 13) {
    time = 750;
  } else if (generatedSequence.length > 13) {
    time = 500;
  }
  display();
  for (let i = 0; i < generatedSequence.length; i++) {
    setTimeout(()=>{
      $('.stopper').css('visibility', 'visible');
      if($('.section').hasClass('flash')) {
        $('.section').removeClass('flash');
      }
      if (generatedSequence[i] === 1) {
        $('#one').addClass('flash');
        $('#one').on('transitionend', ()=>{
          $('#one').removeClass('flash');
        })
      }
      if (generatedSequence[i] === 2) {
        $('#two').addClass('flash');
        $('#two').on('transitionend', ()=>{
          $('#two').removeClass('flash');
        })
      }
      if (generatedSequence[i] === 3) {
        $('#three').addClass('flash');
        $('#three').on('transitionend', ()=>{
          $('#three').removeClass('flash');
        })
      }
      if (generatedSequence[i] === 4) {
        $('#four').addClass('flash');
        $('#four').on('transitionend', ()=>{
          $('#four').removeClass('flash');
        })
      }
      const audio = document.querySelector(`audio[data-key="${generatedSequence[i]}"]`)
      audio.currentTime = 0;
      audio.play();
      if (i === generatedSequence.length - 1) {
        $('.stopper').css('visibility', 'hidden');
      }
    }, i*time);
  }
}

// start sequence event listener
$('#start').on('click', ()=>{
  if (game === true) {
    playerSequence = [];
    generatedSequence = [];
    playGame();
  }
})

// strict event listener, toggles on/off
$('#strict').on('click', ()=>{
  if (game === true) {
    strict = !strict;
    if (strict === true) {
      $('.light').css('background-color', 'rgba(250,100,50,0.7)')
    } else {
      $('.light').css('background-color', 'black')
    }
  }
})

// event listeners for clicks
sections.forEach(color => color.addEventListener('click', (e)=>{
  display()
  if (game === true) {
    if($('.section').hasClass('flash')) {
      $('.section').removeClass('flash');
    }
    let num = 0;
    if (e.target.id === 'one') {
      $('#one').addClass('flash');
      $('#one').on('transitionend', ()=>{
        $('#one').removeClass('flash');
      })
      playerSequence.push(1);
      num = 1;
    }
    if (e.target.id === 'two') {
      $('#two').addClass('flash');
      $('#two').on('transitionend', ()=>{
        $('#two').removeClass('flash');
      })
      playerSequence.push(2);
      num = 2;
    }
    if (e.target.id === 'three') {
      $('#three').addClass('flash');
      $('#three').on('transitionend', ()=>{
        $('#three').removeClass('flash');
      })
      playerSequence.push(3);
      num = 3;
    }
    if (e.target.id === 'four') {
      $('#four').addClass('flash');
      $('#four').on('transitionend', ()=>{
        $('#four').removeClass('flash');
      })
      playerSequence.push(4);
      num = 4;
    }
    const audio = document.querySelector(`audio[data-key="${num}"]`)
    audio.currentTime = 0;
    audio.play();
    check();
  }
}))

// function that checks the users success wtih repeating the generated sequence
function check() {
  let genArr = generatedSequence.join('');
  let playArr = playerSequence.join('')
  
  if (playerSequence.length === generatedSequence.length) {
    if(genArr === playArr) {
      if (generatedSequence.length >= 20) {
        $('#result').attr('placeholder', 'WIN!!!')
        generatedSequence = [];
      }
      playerSequence = [];
      $('.stopper').css('visibility', 'visible');
      setTimeout(()=> {
        playGame();
      }, 1500)
    } else {
      if (strict === true) {
        $('#result').attr('placeholder', 'Error')
        playerSequence = [];
        $('.stopper').css('visibility', 'visible');
        setTimeout(()=> {
          generatedSequence = [];
          playGame();
        }, 1000)
      } else {
        $('#result').attr('placeholder', 'Error')
        $('.stopper').css('visibility', 'visible');
        playerSequence = [];
        setTimeout(()=> {
          playSequence();
        }, 1000)
      }
    }
  } else if(genArr.includes(playArr) === false){
    if (strict === true) {
      playerSequence = [];
      $('#result').attr('placeholder', 'Error')
      $('.stopper').css('visibility', 'visible');
      setTimeout(()=> {
        generatedSequence = [];
        playGame();
      }, 1000)
    } else {
      playerSequence = [];
      $('#result').attr('placeholder', 'Error')
      $('.stopper').css('visibility', 'visible');
      setTimeout(()=> {
        playSequence();
      }, 1000)
    }
  }
}

// function that displays current number of steps
function display() {
  $('#result').attr('placeholder', generatedSequence.length < 10 ? '0'+generatedSequence.length : generatedSequence.length);
}

// event listener for turning the game on and off
$('.slide').on('click', (e)=>{
  game = !game;
  if (game === true) {
    $('.slide').css('grid-column', '1/2');
  } else {
    $('.slide').css('grid-column', '2/3');
    $('.light').css('background-color', 'black')
    generatedSequence = [];
    playerSequence = [];
    strict = false;
    $('#result').attr('placeholder', '');
  }
})