class Row extends React.Component {
  row() {
    const row = [];
    this.props.rowArr.forEach((cell, j) => {
      row.push(<Point key={`point${this.props.i}${j}`} i={this.props.i} j={j} >{cell}</Point>);
    });
    return row;
  }
  render() {
    return (
      <div className="row">{this.row()}</div>
    );
  }
}

class Display extends React.Component {
  grid() {
    const grid = [];
    this.props.gridArr.forEach((row, i) => {
      grid.push(<Row key={`row${i}`} rowArr={row} i={i} />);
    });
    return grid;
  }
  render() {
    return (
      <div className="grid">{this.grid()}</div>
    );
  }
}

class Point extends React.Component {
  
  getClass(child) {
    switch(child) {
      case 0:
        return 'dead';
        break;
      case 1:
        return 'alive';
        break;
      case 2:
        return 'health';
        break;
      case 3:
        return 'enemy';
        break;
      case 4:
        return 'portal';
        break;
      case 5:
        return 'player';
        break;
      case 6:
        return 'weapon';
        break;
      case 7:
        return 'boss';
        break;
      default:
        return '';
        break;
    }
  }
  render() {
    return (
      <div className={`cell ${this.getClass(this.props.children)}`}></div>
    )
  }
}

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      gridArr: this.getEmptyGrid(),
      player: {
        x: null,
        y: null,
      }
    };
  }

  getEmptyGrid() {
    const grid = [
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [0,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [0,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
      [0,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0],
      [0,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0],
      [0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0],
      [0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0],
      [0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,1,1,0],
      [0,0,0,0,0,1,1,0,0,0,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0],
      [0,0,0,0,1,1,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,1,1,1,1,1,1,1,1,1,0],
      [0,0,0,1,1,0,0,0,0,0,1,1,1,1,1,1,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
      [0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,1,1,0],
      [0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,1,1,0],
      [0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0],
      [0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,1,1,0],
      [0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,1,1,0],
      [0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0],
      [0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,1,1,0],
      [0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0],
      [0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0],
      [0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,1,1,1,1,1,1,0],
      [0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,1,1,1,1,1,1,0],
      [0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,1,1,1,1,1,1,0],
      [0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,1,1,1,1,1,1,0],
      [0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,1,1,1,1,1,1,0],
      [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
      [0,0,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],

    ];
    return grid;
  }
  getLevel() {
    const grid = this.state.gridArr;
    function addRandomRoom() {
      let i = Math.floor(Math.random() * 28) + 1;
      let j = Math.floor(Math.random() * 33) + 1;
      if (grid[i][j] === 1) {
        addRandomRoom();
      }
      if (grid[i+1][j] === 1 || grid[i-1][j] === 1 || grid[i][j+1] === 1 || grid[i][j-1] === 1) {
        grid[i][j] = 1;
      }
    }
    for (let k = 0; k < 400; k++) {
      addRandomRoom();
    }
    
    return grid;
  }
  generateBlocks(block) {
    let grid = this.state.gridArr;
    let i = Math.floor(Math.random() * 28) + 1;
    let j = Math.floor(Math.random() * 33) + 1;
    if (grid[i][j] !== 1) {
      this.generateBlocks(block);
    } else {
      grid[i][j] = block;
      if (block === 5) {
        this.setState({
          player: {
            y: i,
            x: j
          }
        })
      }
      return grid;
    }
  }
  generateEntities() {
    const grid = this.getLevel();
    /* if (this.state.level === 5) {
      this.generateBlocks(7);
    } */

    // generate enemies
    for (let i = 0; i < 5; i++) {
      this.generateBlocks(3);
    }

    // generate health packets
    for (let i = 0; i < 7; i++) {
      this.generateBlocks(2);
    }

    // generate player
    this.generateBlocks(5);

    // generate portal
    this.generateBlocks(4);

    // generate weapon
    this.generateBlocks(6);

    return grid;
  }
  keyPress(e) {
    const grid = this.state.gridArr;
    const player = this.state.player;
    switch(e.keyCode) {
      case 37:
        //move left
        if (grid[player.y][player.x - 1] === 1) {
          grid[player.y][player.x - 1] = 5;
          grid[player.y][player.x] = 1;
          player.x = player.x - 1;
          this.setState({
            gridArr: grid,
            player: player
          })
        }
        break;
      case 38:
        //move up
        if (grid[player.y - 1][player.x] === 1) {
          grid[player.y - 1][player.x] = 5;
          grid[player.y][player.x] = 1;
          player.y = player.y - 1;
          this.setState({
            gridArr: grid,
            player: player
          })
        }
        break;
      case 39:
        //move right
        if (grid[player.y][player.x + 1] === 1) {
          grid[player.y][player.x + 1] = 5;
          grid[player.y][player.x] = 1;
          player.x = player.x + 1;
          this.setState({
            gridArr: grid,
            player: player
          })
        }
        break;
      case 40:
        //move down
        if (grid[player.y + 1][player.x] === 1) {
          grid[player.y + 1][player.x] = 5;
          grid[player.y][player.x] = 1;
          player.y = player.y + 1;
          this.setState({
            gridArr: grid,
            player: player
          })
        }
        break;
      default: 
        return;
    }
  }
  generateLevel() {
    const grid = this.generateEntities();;
    this.setState({
      gridArr: grid,
    })
  }
  
  componentWillMount() {
    this.generateLevel();
    window.addEventListener('keyup', this.keyPress.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener('keyup', this.keyPress.bind(this));
  }
  
  render(){
    return (
      <div className="wrapper">
        <Display gridArr={this.state.gridArr} />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
