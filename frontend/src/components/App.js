import React, { useState } from "react";

import NightCity from "../assets/NightCity.mp4";
import "./App.css";

function App({ baordMode = false }) {
  const [isBaordMode] = useState(baordMode);

  return (
    <div className={isBaordMode ? "editBackground" : "normalBackground"}>
      <video
        className={isBaordMode ? "editVideo" : "normalVideo"}
        src={NightCity}
        autoPlay
        loop
        muted
      />
    </div>
  );
}

export default App;
