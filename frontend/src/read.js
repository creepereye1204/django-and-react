import React, { Component } from "react";
import App from "./components/App";
import BoardWrapper from "./components/Board";

class Read extends Component {
  render() {
    return (
      <div>
        <div style={{ position: 'relative', zIndex: 10 }}>
          <App writeMode={true} />
        </div>
        <div style={{ position: 'relative', zIndex: 5 }}>
          <BoardWrapper />
        </div>
      </div>
    );
  }
}

export default Read;
