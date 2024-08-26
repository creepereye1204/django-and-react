import React, { Component } from "react";
import App from "./components/App";
import BoardList from "./components/BoardList";
import Navbar from "./components/Navbar";
class Board extends Component {
  render() {
    return (
      <div>
        <Navbar/>
        <App/>
        <BoardList/>
      </div>
    );
  }
}

export default Board;

