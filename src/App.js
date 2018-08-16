import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class LambdaDemo extends Component {
  constructor(props) {
    super(props);
    this.state = {loading: false, msg: null};
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleClick = (e) => {
    console.log("hello from handle click")
    e.preventDefault();

    this.setState({loading: true});
    fetch('/.netlify/functions/hello')
      .then(response => response.json())
      .then(json => this.setState({loading: false, msg: json.msg}));
    console.log("outfrom handle click")
  }

  handleSubmit(e) {
    console.log("here in handleSubmit")
    e.preventDefault();
     this.setState({loading: true, msg: null});
    const data = new FormData(e.target)
    for (var pair of data.entries()) {
      console.log("hello " + pair[0] +', '+ pair[1])
    }
    fetch('/.netlify/functions/hello?to='+pair[1])
    .then(response => response.json())
    .then(json => {
        this.setState({msg: json.msg });
    })
  }
//-          <img src="/happy.jpg" width="100"></img>

  function 
  render() {
    const {msg,loading} = this.state;

    return <div>
      <form name="get-url" onSubmit={this.handleSubmit}>
      <input id="theurl" name="theurl" type="text" />
      <button type="submit">Get sentiment</button>
      </form> 
      <span>sentiment: {msg}</span>
      </div>
  }
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Airbnb user sentiment analysis</h1>
        </header>
        <p></p>
        <LambdaDemo/>
      </div>
    );
  }
}

export default App;
