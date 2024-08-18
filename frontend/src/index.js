import React from "react";
import { render } from "react-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./components/App"; // 페이지 컴포넌트
import Update from "./update"; // 페이지 컴포넌트

function Main() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="*" element={<Update/>} />
      </Routes>
    </Router>
  );
}

const appDiv = document.getElementById("app");
render(<Main />, appDiv);
