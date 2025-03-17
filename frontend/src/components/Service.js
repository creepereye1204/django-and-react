import "./Service.css";
import React, { useState, useEffect } from "react";

class ChatMessage {
  constructor(content, isClientTurn) {
    this.content = content; // 메시지 내용
    this.isClientTurn = isClientTurn; // 클라이언트 턴 여부
    this.time = new Date().toLocaleString(); // 메시지 전송 시간
  }
}

const Service = () => {
  const [chatMessages, setChatMessages] = useState([]); // 채팅 메시지 상태
  const [webSocket, setWebSocket] = useState(null); // 웹소켓 상태
  const [inputValue, setInputValue] = useState(""); // 입력값 상태
  const [buttonAbled, setButtonAbled] = useState(false); // 초기 상태에서 버튼 비활성화

  useEffect(() => {
    const ws = new WebSocket("wss://my-wiki.p-e.kr/ws/api/bible-bot");

    ws.onopen = () => {
      setWebSocket(ws);
      console.log("웹소켓 연결됨");
      setButtonAbled(true); // 연결되면 입력 가능
    };

    ws.onmessage = (event) => {
      const incomingMessage = JSON.parse(event.data); // 수신 메시지 파싱
      if (incomingMessage.message === null) {
        setButtonAbled(true); // null일 경우 버튼 활성화
        return; // null일 경우 함수 종료
      }
      const text = incomingMessage.message || ""; // 메시지 내용

      setChatMessages((prevMessages) => {
        const updatedMessages = [...prevMessages];
        const latestMessageIndex = updatedMessages.length - 1;

        // 최신 메시지가 존재하고 서버 턴일 경우 메시지 추가
        if (
          latestMessageIndex >= 0 &&
          !updatedMessages[latestMessageIndex].isClientTurn
        ) {
          updatedMessages[latestMessageIndex].content += text; // 메시지 내용 추가
        } else {
          updatedMessages.push(new ChatMessage(text, false)); // 새로운 서버 메시지 추가
        }

        return updatedMessages;
      });
    };

    ws.onclose = () => {
      console.log("웹소켓 연결 종료");
      setWebSocket(null);
      setButtonAbled(true); // 연결 종료 시 입력 비활성화
    };

    return () => {
      ws.close();
      setWebSocket(null);
    };
  }, []); // 빈 배열을 전달하여 컴포넌트가 처음 렌더링될 때만 실행

  const sendMessage = (messageContent) => {
    setButtonAbled(false);
    if (webSocket && webSocket.readyState === WebSocket.OPEN) {
      if (messageContent) {
        const clientMessage = new ChatMessage(messageContent, true);
        setChatMessages((prevMessages) => [...prevMessages, clientMessage]);
        webSocket.send(JSON.stringify({ message: messageContent })); // 메시지 객체 전송
        setInputValue(""); // 입력값 초기화
      } else {
        alert("내용이 비어 있습니다.");
      }
    } else {
      alert("웹소켓이 연결되어 있지 않습니다.");
    }
  };

  return (
    <div className="chat-container">
      <h1 className="title">심신풀이</h1>
      {chatMessages.map((message, index) =>
        message.isClientTurn ? (
          <div className="client" key={index}>
            {message.content}
            <h5>{message.time}</h5>
          </div> // 클라이언트 메시지
        ) : (
          <div className="server" key={index}>
            {message.content}
            <h5>{message.time}</h5>
          </div> // 서버 메시지
        )
      )}
      <input
        className="input-container"
        type="text"
        placeholder="텍스트 입력!"
        value={inputValue} // 입력값 상태
        onChange={(e) => setInputValue(e.target.value)} // 입력값 업데이트
      />
      <button onClick={() => sendMessage(inputValue)} disabled={!buttonAbled}>
        전송
      </button>
    </div>
  );
};

export default Service;
