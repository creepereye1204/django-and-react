import React, { Component } from "react";
import { render } from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Write from "./Write";
import NightCity from '../assets/NightCity.mp4';

import About from './About'; // About 컴포넌트 예시


class Navbar extends Component {
  render() {
    return (
      <header className="header">
        <a href="#" className="logo">My Wiki</a>
        <nav className="navbar">
          <a href="/">Home</a>
          <a href="/about">About</a>
          <a href="/portfolio">Portfolio</a>
          <a href="https://colab.research.google.com/drive/1dYnkNX4YNkyj20mgWJVb9uoAd_lKvD15?usp=sharing">Service</a>
          <a href="/contact">Contact</a>
        </nav>
      </header>
    );
  }
}

export default class App extends Component {
  render() {
    return (
      <Router>
        <div className="background">
          <video src={NightCity} autoPlay loop muted />
          <Navbar />
          <Write/>
          <Switch>

            <Route path="/about" component={About} />
           
            
          </Switch>
        </div>
      </Router>
    );
  }
}

const appDiv = document.getElementById("app");
render(<App />, appDiv);
