import React, { Component } from "react";
import { render } from "react-dom";
import "./App.css";
import Dashboard from "./Dashboard";

class Navbar extends Component {
  render() {
    return (
      <header className="header"> {/* class를 className으로 수정 */}
        <a href="#" className="logo">My Wiki</a>
        <nav className="navbar">
          <a href="#">Home</a>
          <a href="#">About</a>
          <a href="#">Portfolio</a>
          <a href="https://colab.research.google.com/drive/1dYnkNX4YNkyj20mgWJVb9uoAd_lKvD15?usp=sharing">Service</a>
          <a href="#">Contact</a>
        </nav>
      </header>
    );
  }
}

export default class App extends Component {
  render() {
    return (
      <div className="background"> {/* class를 className으로 수정 */}
        <video autoPlay loop muted id="background-video">
          <source src="https://my-wiki.p-e.kr:20004/media/NightCity.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <Navbar />
        <Dashboard />
      </div>
    );
  }
}

const appDiv = document.getElementById("app");
render(<App />, appDiv);
