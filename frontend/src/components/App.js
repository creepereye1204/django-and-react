import React, { Component } from "react";
import { render } from "react-dom";
import "./App.css";

class Navbar extends Component {
  render() {
    return (
      <nav class="navbar">
        <ul class="nav-list">
          <li class="nav-item">
            <a href="/" class="nav-link">Home</a>
          </li>
          <li class="nav-item">
            <a href="/about" class="nav-link">About</a>
          </li>
          <li class="nav-item">
            <a href="/students" class="nav-link">Info</a>
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
