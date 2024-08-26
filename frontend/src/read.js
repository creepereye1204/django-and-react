import React, { Component } from "react";
import App from "./components/App";
import BoardWrapper from "./components/Board";
class Read extends Component {
  render() {
    return (
      <div>
        
        
        <BoardWrapper/>
        <App writeMode={true}/>
      </div>
    );
  }
}

export default Read;

