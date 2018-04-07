class Row extends React.Component {
  row() {
    const row = [];
    this.props.rowArr.forEach((cell, j) => {
      row.push(<Point key={`point${this.props.i}${j}`} handleClick={this.props.handleClick} i={this.props.i} j={j} >{cell}</Point>);
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
      <div className="header">
        <p>Generations: <span>{this.props.counter}</span></p>
        <div className="buttons">
          <button onClick={this.props.handleRun} >Start</button>
          <button onClick={this.props.handlePause} >Pause</button>
          <button onClick={this.props.handleClear} >Clear</button>
        </div>
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
      counter: 0,
    };
  }

  componentDidMount() {
    this.handleRun();
  }

  getEmptyGrid() {
    let grid = [];
    for (let i = 0; i < 30; i++) {
      let row = [];
      for(let j = 0; j < 50; j++) {
        row.push(0);
      }
      grid.push(row);
    }
    return grid;
  }

  getRandomGrid() {
    let grid = [];
    for (let i = 0; i < 30; i++) {
      let row = [];
      for(let j = 0; j < 50; j++) {
        row.push(Math.floor(Math.random() * 2));
      }
      grid.push(row);
    }
    return grid;
  }

  getNextGrid() {
    let grid = [];
    for (let i = 0; i < 30; i++) {
      let row = [];
      for (let j = 0; j < 50; j++) {
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
      let neighbours = 0;
      let rowLength = 50;
      let columnHeight = 30;

      if (gridArr[mod(i+1, columnHeight)][j]) neighbours++;
      if (gridArr[mod(i+1, columnHeight)][mod(j+1, rowLength)]) neighbours++;
      if (gridArr[i][mod(j+1, rowLength)]) neighbours++;
      if (gridArr[i][mod(j-1, rowLength)]) neighbours++;
      if (gridArr[mod(i+1, columnHeight)][mod(j-1, rowLength)]) neighbours++;
      if (gridArr[mod(i-1, columnHeight)][j]) neighbours++;
      if (gridArr[mod(i-1, columnHeight)][mod(j-1, rowLength)]) neighbours++;
      if (gridArr[mod(i-1, columnHeight)][mod(j+1, rowLength)]) neighbours++;
      
      return neighbours;
    }

    function mod(neighbour, length) {
      length = Math.abs(length);
      return (neighbour % length + length) % length;
    }
  }

  toggleCell(e) {
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
      counter: this.state.counter + 1
    })}, 10);
  }

  handleClear() {
    clearInterval(this.interval);
    this.setState({
      gridArr: this.getEmptyGrid(),
      counter: 0
    });
  }

  handlePause() {
    clearInterval(this.interval);
  }

  componentWillUpdate(nextProps, nextState) {
    if (this.state.counter > 0) {
        function isEmpty(grid) {
        for (let i = 0; i < grid.length; i++) {
          for (let j = 0; j < grid[i].length; j++) {
            if (grid[i][j]) {
              return 1;
            }
          }
        }
        return 0;
      }
      let full = isEmpty(this.state.gridArr);
      if (!full) {
        this.handleClear();
      }
    }
  }
  

  render(){
    return (
      <div className="wrapper">
        <Buttons counter={this.state.counter} handleClear={this.handleClear.bind(this)} handleRun={this.handleRun.bind(this)} handlePause={this.handlePause.bind(this)} />
        <Display handleClick={this.toggleCell.bind(this)} gridArr={this.state.gridArr} />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
