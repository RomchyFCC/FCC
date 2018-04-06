class Row extends React.Component {
  row() {
    const row = [];
    this.props.rowArr.forEach((cell, j) => {
      row.push(<Point key={`point${self.i}${j}`} handleClick={this.props.handleClick} i={this.props.i} j={j} >{cell}</Point>);
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
      grid.push(<Row key={`row${i}`} handleClick={this.props.handleClick} rowArr={row} i={i} />);
    });
    return grid;
  }
  render() {
    return (
      <div className="grid">{this.grid()}</div>
    );
  }
}

class Buttons extends React.Component {
  render() {
    return (
      <div className="buttons">
        <button>Start</button>
        <button>End</button>
        <button>Clear</button>
      </div>
    );
  }
}

class Point extends React.Component {
  render() {
    return (
      <div onClick={this.props.handleClick} className={this.props.children ? 'cell alive' : 'cell dead'}><p className="cellId">{this.props.i}</p><p className="cellId">{this.props.j}</p></div>
    )
  }
}

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      gridArr: this.getRandomGrid(),
      count: 0,
    };
  }

  componentDidMount() {
    this.handleRun();
  }

  getEmptyGrid() {
    let grid = [];
    for (let i = 0; i <= 50; i++) {
      let row = [];
      for(let j = 0; j <= 70; j++) {
        row.push(0);
      }
      grid.push(row);
    }
    return grid;
  }

  getRandomGrid() {
    let grid = [];
    for (let i = 0; i < 50; i++) {
      let row = [];
      for(let j = 0; j < 70; j++) {
        row.push(Math.floor(Math.random() * 2));
      }
      grid.push(row);
    }
    return grid;
  }

  getNextGrid() {
    let grid = [];
    for (let i = 0; i < 50; i++) {
      let row = [];
      for (let j = 0; j < 70; j++) {
        row.push(this.nextCell(this.state.gridArr, i, j) ? 1 : 0);
      }
      grid.push(row);
    }
    return grid;
  }

  nextCell(gridArr, i, j) {
    let neighborCount = getNeighborCount(gridArr, i, j);
    return gridArr[i][j] && neighborCount == 2 || neighborCount == 3;
    
    function getNeighborCount(gridArr, i, j) {
      let nc = 0;
      
      if (gridArr[mod(i+1, 50)][j]) nc++;
      if (gridArr[mod(i+1, 50)][mod(j+1, 70)]) nc++;
      if (gridArr[i][mod(j+1, 70)]) nc++;
      if (gridArr[i][mod(j-1, 70)]) nc++;
      if (gridArr[mod(i+1, 50)][mod(j-1, 70)]) nc++;
      if (gridArr[mod(i-1, 50)][j]) nc++;
      if (gridArr[mod(i-1, 50)][mod(j-1, 70)]) nc++;
      if (gridArr[mod(i-1, 50)][mod(j+1, 70)]) nc++;
      
      return nc;
    }
    function mod(x, m) {
      m = Math.abs(m);
      return (x % m + m) % m;
    }
  }
  changeCell(e) {

    let i = parseInt(e.target.firstChild.innerHTML);
    let j = parseInt(e.target.lastChild.innerHTML);
    let grid = this.state.gridArr;
    grid[i][j] = grid[i][j] ? 0 : 1;
    this.setState({
      gridArr: grid
    });
  }
  handleRun() {
    this.interval = window.setInterval(() => {
      this.setState({
      gridArr: this.getNextGrid(),
      count: this.state.count + 1
    })}, 3000);
  }
  render(){
    return (
      <div className="wrapper">
        <Buttons />
        <Display handleClick={this.changeCell.bind(this)} gridArr={this.state.gridArr} />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
