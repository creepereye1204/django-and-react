import React, { Component } from "react";
import App from "./components/App";
import SketchToImage from "./components/SketchToImage";
import Navbar from "./components/Navbar";
class Models extends Component {
  render() {
    return (
      <div>
        <Navbar/>
        <App/>
        <SketchToImage/>
      </div>
    );
  }
}

export default Models;

