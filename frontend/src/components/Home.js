import React, { Component } from "react";
import App from "./App";
import Navbar from "./Navbar";
import Login from "./Login";
import Signup from "./Signup"; // 회원가입 컴포넌트 임포트

class Home extends Component {
  state = {
    isLogin: true, // 로그인 상태를 나타내는 상태 변수
  };

  toggleForm = () => {
    this.setState((prevState) => ({ isLogin: !prevState.isLogin }));
  };

  render() {
    const { isLogin } = this.state;

    return (
      <div>
        <Navbar />
        <App /> {/* 로그인/회원가입을 위한 App 컴포��트 */}
        {isLogin ? <Login /> : <Signup />} {/* 상태에 따라 컴포넌트 렌더링 */}
        <button onClick={this.toggleForm}>
          {isLogin ? "회원가입으로 전환" : "로그인으로 전환"}
        </button>
      </div>
    );
  }
}

export default Home;
