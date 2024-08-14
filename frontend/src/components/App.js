import React, { Component } from "react";
import { render } from "react-dom";
import "./App.css";

class Navbar extends Component {
  render() {
    return (
      <header>
        <a href="#" class="header"></a>
        <nav class="navbar">
          <a href="#">Home</a>
          <a href="#">About</a>
          <a href="#">Portfolio</a>
          <a href="#">Service</a>
          <a href="#">Contact</a>
        </nav>
      </header>
      

    );
  }
}

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="background">
        <video autoPlay loop muted className="background-video">
          <source src="NightCity.mp4" type="video/mp4" />
        </video>
        <Navbar />
      </div>
    );
  }
}

const appDiv = document.getElementById("app");
render(<App />, appDiv);
