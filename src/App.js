import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

class LambdaDemo extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: false, msg: null, pos: [], neg: [] };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  /*  handleClick = e => {
    console.log("hello from handle click");
    e.preventDefault();

    this.setState({ loading: true });
    fetch("/.netlify/functions/hello")
      .then(response => response.json())
      .then(json => this.setState({ loading: false, msg: json.msg }));
    console.log("outfrom handle click");
  };*/

  handleSubmit(e) {
    console.log("here in handleSubmit");
    e.preventDefault();
    this.setState({ loading: true, msg: null });
    const data = new FormData(e.target);
    for (var pair of data.entries()) {
      console.log("hello " + pair[0] + ", " + pair[1]);
    }
    fetch("/.netlify/functions/hello?to=" + pair[1])
      .then(response => response.json())
      .then(json => {
        this.setState({ msg: json.msg });
        this.setState({ pos: json.pos });
        this.setState({ neg: json.neg });
      });
  }
  //-          <img src="/happy.jpg" width="100"></img>

  render() {
    const { msg, neg, pos } = this.state;
    const style = "display: inline-block; border: 1px solid; float: left;";
    return (
      <div>
        <form name="get-url" onSubmit={this.handleSubmit}>
          <input id="theurl" name="theurl" type="text" />
          <button type="submit">Get sentiment</button>
        </form>
        <span>sentiment: {msg}</span>
        <br />
        <table style={{ width: "50%", float: "left" }}>
          <thead style={{ width: "50%", float: "left" }}>
            <tr style={{ width: "50%", float: "left" }}>
              <th style={{ width: "50%", float: "left" }}>positive</th>
            </tr>
          </thead>
          <tbody>
            {pos.map(word => (
              <tr style={{ width: "50%", float: "left" }}>
                <td>{word}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <table style={{ width: "50%", float: "left" }}>
          <thead style={{ width: "50%", float: "left" }}>
            <tr style={{ width: "50%", float: "left" }}>
              <th style={{ width: "50%", float: "left" }}>negative</th>
            </tr>
          </thead>
          <tbody>
            {neg.map(word => (
              <tr style={{ width: "50%", float: "left" }}>
                <td>{word}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Airbnb user sentiment analysis</h1>
        </header>
        <p />
        <LambdaDemo />
      </div>
    );
  }
}

export default App;
