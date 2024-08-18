import React from "react";
import { render } from "react-dom";
import { BrowserRouter as Router, Routes, Route,Switch } from "react-router-dom";
import App from "./components/App"; // 페이지 컴포넌트
import Update from "./update"; // 페이지 컴포넌트
import Board from "./board";
import WriteBoard from "./writeBoard"; 

function Main() {
  return (
    <Router>
      <Switch>
        <Route path="/" element={<App />} />
        <Route path="/board" element={<Board/>} />
        <Route path="/write" element={<WriteBoard/>} />
        <Route path="*" element={<Update/>} />
      </Switch>
    </Router>
  );
}

const appDiv = document.getElementById("app");
render(<Main />, appDiv);
