import React from "react"; // React를 가져옵니다.
import { render } from "react-dom"; // render를 가져옵니다.
import App from "./components/App"; // App 컴포넌트를 가져옵니다.

const appDiv = document.getElementById("app"); // HTML의 app 요소를 가져옵니다.
render(<App />, appDiv); // App 컴포넌트를 렌더링합니다.
