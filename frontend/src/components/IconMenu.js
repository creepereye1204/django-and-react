import React, { useEffect, useRef, useState } from 'react';
import './IconMenu.css'; // CSS 파일을 따로 작성하여 import 합니다.

const IconMenu = () => {
  const [isActive, setIsActive] = useState(false);
  const toggleSound = useRef(null);
  const openSound = useRef(null);
  const hoverSound = useRef(null);

  const handleMenuToggle = () => {
    setIsActive(!isActive);
    toggleSound.current.currentTime = 0; // Reset the audio to start from the beginning
    toggleSound.current.play();
    
    if (!isActive) {
      openSound.current.currentTime = 0; // Reset the audio to start from the beginning
      openSound.current.play();
    }
  };

  const handleMouseEnter = () => {
    hoverSound.current.currentTime = 0; // Reset the audio to start from the beginning
    hoverSound.current.play();
  };

  useEffect(() => {
    // 이펙트 정리
    return () => {
      // 컴포넌트 언마운트 시 사운드 리셋
      toggleSound.current.pause();
      openSound.current.pause();
      hoverSound.current.pause();
    };
  }, []);

  return (
    <div className="icon-menu">
      <ul className={`menu ${isActive ? 'active' : ''}`}>
        <div className="menuToggle" onClick={handleMenuToggle}>
          <ion-icon name="add-outline"></ion-icon>
        </div>
        {['home-outline', 'settings-outline', 'mail-outline', 'key-outline', 'camera-outline', 'game-controller-outline', 'person-outline', 'videocam-outline'].map((icon, index) => (
          <li key={index} style={{ '--i': index, '--clr': getColor(index) }}>
            <a href="#" onMouseEnter={handleMouseEnter}>
              <ion-icon name={icon}></ion-icon>
            </a>
          </li>
        ))}
      </ul>

      {/* Audio Elements */}
      <audio ref={toggleSound}>
        <source src="audio/close.mp3" type="audio/mpeg" />
        <source src="audio/close.ogg" type="audio/ogg" />
      </audio>
      <audio ref={openSound}>
        <source src="audio/open.mp3" type="audio/mpeg" />
        <source src="audio/open.ogg" type="audio/ogg" />
      </audio>
      <audio ref={hoverSound}>
        <source src="audio/beep.mp3" type="audio/mpeg" />
        <source src="audio/beep.ogg" type="audio/ogg" />
      </audio>
    </div>
  );
};

// 색상을 반환하는 함수
const getColor = (index) => {
  const colors = ['#ff2972', '#fee800', '#04fc43', '#fe00f1', '#00b0fe', '#fea600', '#a529ff', '#01bdab'];
  return colors[index % colors.length];
};

export default IconMenu;
