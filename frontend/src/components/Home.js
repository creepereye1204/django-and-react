import React, { Component } from "react";
import App from "./App";
import Navbar from "./Navbar";
class Home extends Component {
  render() {
    return (
      <div>
        <Navbar/>
        <App/>
      </div>
    );
  }
}

export default Home;

