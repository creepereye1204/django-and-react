import React, { Component } from "react";
import App from "./components/App";
import Write from "./components/Write";
class WriteBoard extends Component {
  render() {
    return (
      <div>
        
        <App writeMode={true}/>
        <Write/>
      </div>
    );
  }
}

export default WriteBoard;

