
class Rows extends React.Component {
  render() {
    const data = this.props.data;
    const rows = [];
    for (let index = 0; index < data.length; index++) {
      rows.push(<Row key={index} id={index} name={data[index].username} recentPoints={data[index].recent} allTimePoints={data[index].alltime} img={data[index].img} />)
    }
    return (
      <tbody>
        {rows.map(row => {
          return row;
        })}
      </tbody>
    )
  }
}

class Row extends React.Component {
  render() {
    return (
      <tr>
        <td>{this.props.id + 1}</td>
        <td><div><img src={this.props.img} width="25" height="25"/><a href={`https://www.freecodecamp.org/${this.props.name}`} target="_blank">{this.props.name}</a></div></td>
        <td>{this.props.recentPoints}</td>
        <td>{this.props.allTimePoints}</td>
      </tr>
    )
  }
}

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      mode: 'recent',
      data: []
    }
  }

  // get data for last 30 days points
  getData(mode) {
    const last30 = new Promise ((resolve, reject) => {
      $.getJSON(`https://fcctop100.herokuapp.com/api/fccusers/top/${mode}`, data => {
        if(data.length === 100) {
          resolve(data);
        }
      })
    }).then(data => {
      this.setState({
        mode,
        data
      })
    })
  }

  // get data about all time points or in the last 30 days
  handleClick(e) {
    if (e.target.innerHTML === 'Points all time') {
      this.getData('alltime')
    } else if (e.target.innerHTML === 'Points in last 30 days') {
      this.getData('recent')
    }
  }
  
  // set the points for last 30 days
  componentWillMount() {
    this.getData(this.state.mode)
  }
  
  
  render(){
    return (
      <div className="wrapper">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th onClick={this.handleClick.bind(this)}>Points in last 30 days</th>
              <th onClick={this.handleClick.bind(this)}>Points all time</th>
            </tr>
          </thead>
            <Rows data={this.state.data} />
        </table>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));