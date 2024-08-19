import React, { Component } from "react";
import App from "./components/App";
import "./css/update.css";
import update from "./assets/update.jpg";

class Update extends Component {
  render() {
    return (
      <div>
      <App/>
      <div className="update">
        <img src={update}></img>
        <h1>Not Update Yet Page</h1>
        
        
      </div>
      
      
      </div>
    );
  }
}

export default Update;

