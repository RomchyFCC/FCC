//const board = $('.board');
const board = document.querySelectorAll('.number');

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
  player: "x"
}

board.forEach(div => div.addEventListener('click', ()=> {
  game.board[div.id] = game.player;
  // add animation to the clicked item
  // check for winning position
  // play computer turn
  console.log(game.board);
}))

//console.log(board[0].children);

function compPlay() {
  // check where the palyer clicked
  // put the opposite sign of player where it counters his move
  // add animation to the placed item
  // check for winning position...

}