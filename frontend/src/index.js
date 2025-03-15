import React from "react";
import { render } from "react-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Update from "./update";
import Board from "./board";
import WriteBoard from "./writeBoard";
import Read from "./read";
import Chat from "./service";
import Models from "./models";
function Main() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/board" element={<Board />} />
        <Route path="/write" element={<WriteBoard />} />
        <Route path="/service" element={<Chat />} />
        <Route path="/board/:board_id" element={<Read />} />
        <Route path="/models/" element={<Models />} />
        <Route path="*" element={<Update />} />
      </Routes>
    </Router>
  );
}

const appDiv = document.getElementById("app");
render(<Main />, appDiv);
