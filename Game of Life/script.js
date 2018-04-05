class Point extends React.Component {
  render() {
    return (
      <div className="alive cell"></div>
    );
  }
}

class Display extends React.Component {
  render() {
    return (
      <div className="display">
        <Point />
      </div>
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

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      zone: ''
    };
  }

  render(){
    return (
      <div className="wrapper">
        <Buttons />
        <Display />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
