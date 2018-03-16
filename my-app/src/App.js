import React, { Component } from "react";
import logo from "./logo.svg";
// import "./App.css";
import Counter from "./counter";
import Notification from "./notification";

//const App = () => "TEST"

class App extends Component {
  render() {
    return (
      <div>
        <Notification />
        <Counter seed={10} />
      </div>
    );
  }
}

/*
 return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );

*/
export default App;
