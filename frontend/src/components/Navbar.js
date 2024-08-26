import React, { useState } from "react";
import { Link } from "react-router-dom"; // Link 컴포넌트 추가
import "./Navbar.css";


function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // 메뉴 상태 관리

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen); // 메뉴 열기/닫기
  };

  return (
    <header className={writeMode ? "editHeader" : "normalHeader"}>
      <a href="#" className="logo">My Wiki</a>
      <div className="menu-toggle" onClick={toggleMenu}>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <nav className={`navbar ${isMenuOpen ? 'active' : ''}`}>
        <Link to="/">Home</Link>
        <Link to="/models">Models</Link> 
        <Link to="/service">Project</Link>
        <Link to="/board">Blog</Link>
        <Link to="/write">Write</Link>
      </nav>
    </header>
  );
}
export default Navbar;
