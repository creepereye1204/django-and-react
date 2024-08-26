import React, { Component } from "react";
import App from "./components/App";
import Navbar from "./components/Navbar";
import BoardWrapper from "./components/Board";
class Read extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <App writeMode={true}/>
        <BoardWrapper/>
      </div>
    );
  }
}

export default Read;

