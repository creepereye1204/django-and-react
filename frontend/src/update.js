import React, { Component } from "react";
import App from "./components/App";
import "./css/update.css";
import update from "./assets/update.jpg";

class Update extends Component {
  render() {
    return (
      <div>
        <img src={update}></img>
        <h1 id="update">Update Page</h1>
        <App/>
        
      </div>
    );
  }
}

export default Update;

