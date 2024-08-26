import React, { Component } from "react";
import App from "./components/App";
import Service from "./components/Service";
import Navbar from "./components/Navbar";
class Chat extends Component {
  render() {
    return (
      <div>
        <Navbar/>
        <App/>
        <Service/>
      </div>
    );
  }
}

export default Chat;

