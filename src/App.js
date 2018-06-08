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
    e.preventDefault();
    console.log("hello")

    this.setState({loading: true});
    fetch('/.netlify/functions/hello')
      .then(response => response.json())
      .then(json => this.setState({loading: false, msg: json.msg}));
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({loading: true});
    const data = new FormData(e.target)
    for (var pair of data.entries()) {
      console.log("hello " + pair[0] +', '+ pair[1])
    }
    fetch('/.netlify/functions/hello?to='+pair[1])
    .then(response => response.json())
    .then(json => this.setState({msg: json.msg}));
  }

  function 
  render() {
    const {msg,loading} = this.state;

    return <div>
      <form name="get-url" onSubmit={this.handleSubmit}>
      <input id="theurl" name="theurl" type="url" />
      <button type="submit">Get House Location</button>
      </form>
      <span>{msg}</span>
      </div>
  }
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p></p>
        <LambdaDemo/>
      </div>
    );
  }
}

export default App;
