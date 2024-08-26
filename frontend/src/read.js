import React, { Component } from "react";
import App from "./components/App";
import BoardWrapper from "./components/Board";
class Read extends Component {
  render() {
    return (
      <div>
        
        <App writeMode={true}/>
        <BoardWrapper/>
      </div>
    );
  }
}

export default Read;

