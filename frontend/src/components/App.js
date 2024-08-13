import React, { Component } from "react";
import { render } from "react-dom";

class Navbar extends Component {
  render() {
    return (
      <nav style={{ backgroundColor: '#333', padding: '10px' }}>
        <ul style={{ listStyleType: 'none', display: 'flex', margin: 0, padding: 0 }}>
          <li style={{ margin: '0 15px' }}>
            <a href="/" style={{ color: 'white', textDecoration: 'none' }}>Home</a>
          </li>
          <li style={{ margin: '0 15px' }}>
            <a href="/about" style={{ color: 'white', textDecoration: 'none' }}>About</a>
          </li>
          <li style={{ margin: '0 15px' }}>
            <a href="/students" style={{ color: 'white', textDecoration: 'none' }}>Students</a>
          </li>
        </ul>
      </nav>
    );
  }
}

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Navbar />
        <h1>hellos</h1>
      </div>
    );
  }
}

const appDiv = document.getElementById("app");
render(<App />, appDiv);
