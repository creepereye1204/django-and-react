import React, { Component } from "react";
import App from "./App";
import Navbar from "./Navbar";
import Login from "./Login";
class Home extends Component {
  render() {
    return (
      <div>
        <Navbar />

        <App />
        <Login />
      </div>
    );
  }
}

export default Home;
