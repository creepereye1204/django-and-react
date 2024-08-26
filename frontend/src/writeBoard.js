import React, { Component } from "react";
import App from "./components/App";
import Write from "./components/Write";
import Navbar from "./components/Navbar";
class WriteBoard extends Component {
  render() {
    return (
      <div>
        <Navbar/>
        <App writeMode={true}/>
        <Write/>
      </div>
    );
  }
}

export default WriteBoard;

