import './Service.css'
import React, { useState, useEffect } from 'react';

const Service = () => {
  const [chat, setChat] = useState([]);
  const [isClientTurn, setIsClientTurn] = useState(true); // 현재 턴을 관리하는 상태
  const recognition = new window.webkitSpeechRecognition();

  useEffect(() => {
    recognition.continuous = true;
    recognition.interimResults = false;
    recognition.lang = 'ko-KR';

    recognition.onresult = async (event) => {
      recognition.stop();
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          const recognizedText = event.results[i][0].transcript;
          addMessage(recognizedText);
          const serverResponse = await sendQuestionToServer(recognizedText);
          addMessage(serverResponse);
        }
      }
    };

    recognition.onerror = (event) => {
      console.error("음성 인식 오류: ", event.error);
      recognition.start();
    };

     // 컴포넌트가 마운트되면 음성 인식 시작
    
    
  }, []); // 빈 배열을 전달하여 컴포넌트가 처음 렌더링될 때만 실행

  const addMessage = (message) => {
    setChat((prevChat) => [...prevChat, message]);
  };

  const sendQuestionToServer = async (question) => {
    try {
      const response = await fetch(`https://my-wiki.p-e.kr/api/service`, {
        method: 'POST',
        headers: {
          'X-CSRFToken': csrfToken,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question }),
      });
      const data = await response.json();
      recognition.start(); // API 응답을 받으면 음성 인식 재시작
      return data.result;
    } catch (error) {
      recognition.start();
      return `일시적인 오류: ${error.message}가 발생하였습니다`;
    }
  };

  return (
    <div className='chat-container'>
      <h1 className='title'>심신풀이</h1>
      {chat.map((message, index) => (
        index%2 === 0?(
        <div className='clinet'>{message}</div>)
        : (
        <div className='server'>{message}</div>
        )
      ))}
      {isClientTurn ? <div className='able'>말하세요!</div> : <div className='load'>로딩중...</div>}
    </div>
  );
};

export default Service;

