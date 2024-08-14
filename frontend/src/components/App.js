import React, { Component } from "react";
import { render } from "react-dom";
import "./App.css";

class Navbar extends Component {
  render() {
    return (
      <header class="header">
        <a href="#" className="logo"></a>
        <nav className="navbar">
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
      <div className="background">
        <video autoPlay loop muted id="background-video">
          <source src="https://my-wiki.p-e.kr:20004/media/NightCity.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <Navbar />
      </div>
    );
  }
}

const appDiv = document.getElementById("app");
render(<App />, appDiv);
