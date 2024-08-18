import React, { Component } from "react";
import App from "./components/App";
import BoardList from "./components/BoardList";
class Board extends Component {
  render() {
    return (
      <div>
        
        <App/>
        <BoardList/>
      </div>
    );
  }
}

export default Board;

