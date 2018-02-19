const board = document.querySelectorAll('.number');
const choice = $('.pick');

let game = {
  board: {
    1: "",
    2: "",
    3: "",
    4: "",
    5: "",
    6: "",
    7: "",
    8: "",
    9: ""
  },
  player: "",
  computer: "",
  gameEnd: false
}

// event listeners for player movement
board.forEach(div => div.addEventListener('click', ()=> {
  if (!game.board[div.id]) {
    game.board[div.id] = game.player;
    if (game.player === 'x') {
      div.childNodes[0].classList.add('fa-times')
    } else {
      div.childNodes[0].classList.add('fa-circle-o')
    }
    checkWinner();
    if (game.gameEnd === false) {
      compPlay();
    }
    
  }
}))


function compPlay() {
  let spot = ai();
  game.board[spot] = game.computer;
  if (game.computer === 'x') {
    $('#'+spot).children().addClass('fa-times');
  } else {
    $('#'+spot).children().addClass('fa-circle-o');
  }
  checkWinner();
  // check where clicked
  // counter his move

}

choice.on('click', e=>{
  if(e.target.id === 'x') {
    game.player = 'x';
    game.computer = 'o';
  } else if (e.target.id === 'o'){
    game.player = 'o';
    game.computer = 'x';
  }
  $('.cover').css('display', 'none')
  $('.board').css('visibility', 'visible');
})

function gameReset() {
  for (x in game.board) {
    game.board[x] = "";
  }
  game.gameEnd = false;
  $('.cover').css('display', 'block');
  $('.board').css('visibility', 'hidden');
  $('.number>i').removeClass();
  $('.number>i').addClass('fa fa-5x');
  $('.end').css('display', 'none');
}

function checkWinner() {
  const player = [];
  const computer = [];
  for (x in game.board) {
    if(game.board[x]) {
      if (game.board[x] === game.player) {
        player.push(parseInt(x));
        if ((player.includes(1) && player.includes(2) && player.includes(3)) ||
            (player.includes(4) && player.includes(5) && player.includes(6)) || 
            (player.includes(7) && player.includes(8) && player.includes(9)) || 
            (player.includes(1) && player.includes(4) && player.includes(7)) || 
            (player.includes(1) && player.includes(5) && player.includes(9)) || 
            (player.includes(2) && player.includes(5) && player.includes(8)) || 
            (player.includes(3) && player.includes(6) && player.includes(9)) ||
            (player.includes(3) && player.includes(5) && player.includes(7))) {
              $('.text').text('You won!');
              game.gameEnd = true;
              declareWinner();
              return;
        }
      } else if (game.board[x] === game.computer) {
        computer.push(parseInt(x));
        if ((computer.includes(1) && computer.includes(2) && computer.includes(3)) ||
            (computer.includes(4) && computer.includes(5) && computer.includes(6)) || 
            (computer.includes(7) && computer.includes(8) && computer.includes(9)) || 
            (computer.includes(1) && computer.includes(4) && computer.includes(7)) || 
            (computer.includes(1) && computer.includes(5) && computer.includes(9)) || 
            (computer.includes(2) && computer.includes(5) && computer.includes(8)) || 
            (computer.includes(3) && computer.includes(6) && computer.includes(9)) ||
            (computer.includes(3) && computer.includes(5) && computer.includes(7))) {
              $('.text').text('You lost...');
              game.gameEnd = true;
              declareWinner();
              return;
        }
      } 
    } 
  }
  if (game.board[1] && game.board[2] && game.board[3] && game.board[4] && game.board[5] && game.board[6] && game.board[7] && game.board[8] && game.board[9]){
    $('.text').text('Game is tied!');
    game.gameEnd = true;
    declareWinner();
  }
}

function declareWinner() {
  $('.end').css('display', 'grid');
  
}

function ai() {
  if((game.board[1] === game.computer && game.board[3] === game.computer) || (game.board[5] === game.computer && game.board[8] === game.computer)) {
    if(!game.board[2]) {
      return 2;
    }
  }
  if((game.board[2] === game.computer && game.board[3] === game.computer) || (game.board[5] === game.computer && game.board[9] === game.computer) || (game.board[4] === game.computer && game.board[7] === game.computer)) {
    if(!game.board[1]) {
      return 1;
    }
  }
  if((game.board[1] === game.computer && game.board[2] === game.computer) || (game.board[5] === game.computer && game.board[7] === game.computer) || (game.board[6] === game.computer && game.board[9] === game.computer)) {
    if(!game.board[3]) {
      return 3;
    }
  }
  if((game.board[1] === game.computer && game.board[7] === game.computer) || (game.board[5] === game.computer && game.board[6] === game.computer)) {
    if(!game.board[4]) {
      return 4;
    }
  }
  if((game.board[4] === game.computer && game.board[5] === game.computer) || (game.board[3] === game.computer && game.board[9] === game.computer)) {
    if(!game.board[6]) {
      return 6;
    }
  }
  if((game.board[1] === game.computer && game.board[4] === game.computer) || (game.board[5] === game.computer && game.board[3] === game.computer) || (game.board[8] === game.computer && game.board[9] === game.computer)) {
    if(!game.board[7]) {
      return 7;
    }
  }
  if((game.board[2] === game.computer && game.board[5] === game.computer) || (game.board[7] === game.computer && game.board[9] === game.computer)) {
    if(!game.board[8]) {
      return 8;
    }
  }
  if((game.board[1] === game.computer && game.board[5] === game.computer) || (game.board[7] === game.computer && game.board[8] === game.computer) || (game.board[6] === game.computer && game.board[3] === game.computer)) {
    if(!game.board[9]) {
      return 9;
    }
  }
  
  if((game.board[1] === game.player && game.board[3] === game.player) || (game.board[5] === game.player && game.board[8] === game.player)) {
    if(!game.board[2]) {
      return 2;
    }
  }
  if((game.board[1] === game.player && game.board[7] === game.player) || (game.board[5] === game.player && game.board[6] === game.player)) {
    if(!game.board[4]) {
      return 4;
    }
  }
  if((game.board[7] === game.player && game.board[9] === game.player) || (game.board[2] === game.player && game.board[5] === game.player)) {
    if(!game.board[8]) {
      return 8;
    }
  }
  if((game.board[3] === game.player && game.board[9] === game.player) || (game.board[4] === game.player && game.board[5] === game.player)) {
    if(!game.board[6]) {
      return 6;
    }
  }
  if((game.board[3] === game.player && game.board[6] === game.player) || (game.board[1] === game.player && game.board[5] === game.player) || (game.board[7] === game.player && game.board[8] === game.player)) {
    if(!game.board[9]) {
      return 9;
    }
  }
  if((game.board[1] === game.player && game.board[2] === game.player) || (game.board[7] === game.player && game.board[5] === game.player) || (game.board[6] === game.player && game.board[9] === game.player)) {
    if(!game.board[3]) {
      return 3;
    }
  }
  if((game.board[1] === game.player && game.board[4] === game.player) || (game.board[3] === game.player && game.board[5] === game.player) || (game.board[8] === game.player && game.board[9] === game.player)) {
    if(!game.board[7]) {
      return 7;
    }
  }
  if((game.board[2] === game.player && game.board[3] === game.player) || (game.board[5] === game.player && game.board[9] === game.player) || (game.board[4] === game.player && game.board[7] === game.player)) {
    if(!game.board[1]) {
      return 1;
    }
  }
  if((game.board[7] === game.player && game.board[3] === game.player) || (game.board[1] === game.player && game.board[9] === game.player)) {
    if(!game.board[2]) {
      return 2;
    }
  }
  if (!game.board[5]) {
    return 5;
  }
  if((game.board[6] === game.player || game.board[8] === game.player)) {
    if(!game.board[9]) {
      return 9;
    }
  }
  if (!game.board[1]) {
    return 1;
  }
  if (!game.board[3]) {
    return 3;
  }
  if (!game.board[7]) {
    return 7;
  }
  if (!game.board[9]) {
    return 9;
  }
  if (!game.board[6]) {
    return 6;
  }
  if (!game.board[4]) {
    return 4;
  }
  if (!game.board[8]) {
    return 8;
  }
  if (!game.board[2]) {
    return 2;
  }
}