import React, { Component } from "react";
import App from "./components/App";
import BoardWrapper from "./components/Board";
import './css/read.css'; // 스타일 파일을 임포트합니다.

class Read extends Component {
  render() {
    return (
      <div className="container">
        <App className="app" writeMode={true} />
        <BoardWrapper className="board" />
      </div>
    );
  }
}

export default Read;
