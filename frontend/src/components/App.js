import React, { Component, useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Link 컴포넌트 추가
import "./App.css";
import NightCity from '../assets/NightCity.mp4';

class Navbar extends Component {
  render() {
    return (
      <header className="header">
        <a href="#" className="logo">My Wiki</a>
        <nav className="navbar">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link> 
          <Link to="/ppt">Ppt</Link>
          <Link to="/board">Blog</Link>
          <Link to="/write">Write</Link>
        </nav>
      </header>
    );
  }
}

function App() {
  const [inputValue, setInputValue] = useState('');
  const [showInput, setShowInput] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Enter') { // 'Enter' 키를 누르면
        setShowInput(true); // 입력창을 보여줍니다.
      }
    };

    window.addEventListener('keydown', handleKeyDown); // 이벤트 리스너 등록

    return () => {
      window.removeEventListener('keydown', handleKeyDown); // 언마운트 시 리스너 제거
    };
  }, []); // 빈 배열로 한 번만 실행

  const handleInputChange = (event) => {
    setInputValue(event.target.value); // 입력값을 상태로 관리
  };

  return (
    <div className="background">
      <video src={NightCity} autoPlay loop muted />
      <Navbar />
      {showInput && ( // showInput이 true일 때만 입력창을 보여줍니다.
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="여기에 입력하세요"
        />
      )}
    </div>
  );
}

export default App;
