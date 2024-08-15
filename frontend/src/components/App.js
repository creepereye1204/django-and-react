import React, { Component } from "react";
import { render } from "react-dom";
import "./App.css";
import Dashboard from "./Dashboard";
import {NightCity} from "../assets/NightCity.mp4";
class Navbar extends Component {
  render() {
    return (
      <header class="header">
        <a href="#" class="logo">My Wiki</a>
        <nav class="navbar">
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
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div class="background">
        <video src={NightCity} autoPlay loop muted/>
        <Navbar />
        <Dashboard/>
      </div>
    );
  }
}

const appDiv = document.getElementById("app");
render(<App />, appDiv);
