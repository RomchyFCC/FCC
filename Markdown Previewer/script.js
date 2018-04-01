
class App extends React.Component {
  constructor() {
    super();
    this.state = {
      text: 'Heading\n==\n\nSub-heading\n--\n \n#### Another deeper heading\n \nParagraph.\n\nText attributes *italic*, **bold**, \n`monospace`, ~~strikethrough~~ .\n\nUnordered list:\n\n  * apples\n  * oranges\n  * pears\n\nOrdered list:\n\n  1. apples\n  2. oranges\n  3. pears'
    }
  }
  changeHandler(e) {
    this.setState({
      text: e.target.value
    })
  }
  componentDidMount() {
    document.querySelector('.result').innerHTML = marked(this.state.text);
  }
  
  render(){
    if (document.querySelector('.result')) {
      document.querySelector('.result').innerHTML = marked(this.state.text);
    }
    return (
      <div className="wrapper">
        <textarea onChange={this.changeHandler.bind(this)}>{this.state.text}</textarea>
        <div className="result"></div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));