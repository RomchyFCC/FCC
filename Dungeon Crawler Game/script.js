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

class Point extends React.Component {
  render() {
    return (
      <div onClick={this.props.handleClick} className={this.props.children ? 'cell alive' : 'cell dead'}></div>
    )
  }
}

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      gridArr: this.getRandomGrid()
    };
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
        <Display handleClick={this.toggleCell.bind(this)} gridArr={this.state.gridArr} />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
