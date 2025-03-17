import React, { useState } from "react";
import App from "./App";
import Navbar from "./Navbar";
import Login from "./Login";
import Signup from "./Signup";

const Home = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div>
      <Navbar />
      <App />
      {isLogin ? <Login /> : <Signup />}
      <button onClick={() => setIsLogin((prev) => !prev)}>
        {isLogin ? "회원가입으로 전환" : "로그인으로 전환"}
      </button>
    </div>
  );
};

export default Home;
