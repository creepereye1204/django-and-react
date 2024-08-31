// import './Service.css';
// import React, { useState, useEffect } from 'react';

// const Service = () => {
//   const [chat, setChat] = useState([]);
//   const recognition = new window.webkitSpeechRecognition();

//   useEffect(() => {
//     recognition.continuous = true;
//     recognition.interimResults = false;
//     recognition.lang = 'ko-KR';

//     recognition.onresult = async (event) => {
//       recognition.stop();
//       for (let i = event.resultIndex; i < event.results.length; ++i) {
//         var clientChat;
//         var serverChat;
//         if (event.results[i].isFinal) {


//           try{
//             clientChat = event.results[i][0].transcript;
//             addMessage(clientChat);
//           }
//           catch (error){
//             alert(error.message);
//             return
//           }
          
//           try {
//             serverChat = await sendQuestionToServer(clientChat);
//             addMessage(serverChat);
//           }
//           catch (error) {
//             alert(error.message);
//             addMessage('오류발생!');
//           }

//         }
//       }
//     };

//     recognition.onerror = (event) => {
//       console.error("음성 인식 오류: ", event.error);
//       recognition.start(); // 오류 발생 시 음성 인식을 다시 시작
//     };

//     recognition.onend = () => {
//       console.log("음성 인식이 종료되었습니다. 다시 시작합니다...");
//       recognition.start(); // 인식이 종료되면 다시 시작
//     };

//     recognition.start(); // 컴포넌트가 마운트되면 음성 인식 시작

//     return () => {
//       recognition.stop(); // 컴포넌트 언마운트 시 음성 인식 정지
//     };
//   }, []); // 빈 배열을 전달하여 컴포넌트가 처음 렌더링될 때만 실행

//   const addMessage = (message) => {
//     setChat((prevChat) => [...prevChat, message]);
//   };

//   const sendQuestionToServer = async (question) => {
//     try {
//       const response = await fetch(`https://my-wiki.p-e.kr/api/service`, {
//         method: 'POST',
//         headers: {
//           'X-CSRFToken': csrfToken,
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ question }),
//       });
//       const data = await response.json();
//       return data.result;
//     } catch (error) {
//       return `일시적인 오류: ${error.message}가 발생하였습니다`;
//     }
//   };

//   return (
//     <div className='chat-container'>
//       <h1 className='title'>심신풀이</h1>
//       {chat.map((message, index) => (
//         index % 2 === 0 ? (
//           <div className='client' key={index}>{message}</div> // 짝수 인덱스
//         ) : (
//           <div className='server' key={index}>{message}</div> // 홀수 인덱스
//         )
//       ))}
       
//     </div>
//   );
// };

// export default Service;


class Message{

  constructor(content,turn) {
    this.content = content;
    this.turn = turn;
    this.time = new Date().toLocaleString();
  }
}

import './Service.css';
import React, { useState, useEffect } from 'react';

const Service = () => {
  const [chat, setChat] = useState([]);
  const recognition = new window.webkitSpeechRecognition();

  useEffect(() => {
    recognition.continuous = true;
    recognition.interimResults = false;
    recognition.lang = 'ko-KR';

    recognition.onresult = async (event) => {
      recognition.stop();
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        var clientChat;
        var serverChat;
        var message;
        if (event.results[i].isFinal) {

          
          try{
            clientChat = event.results[i][0].transcript;
            
          }
          catch (error){
            clientChat = '일시적인 오류: ('+event.error+')가 발생하였습니다';
            alert(clientChat);
            return
          }

          message = new Message(clientChat,'Client');
          addMessage(message);
          
          try {
            serverChat = await sendQuestionToServer(clientChat);
            if(serverChat.status === 200) {
              serverChat=serverChat.result;
              
            }else{
              serverChat = '일시적인 오류: ('+serverChat.message+')가 발생하였습니다';
              
            }
          }
          catch (error) {
            serverChat = '일시적인 오류: ('+error.message+')가 발생하였습니다';
            alert(error.message);
            
          }
          message = new Message(error.message, 'Server');
          addMessage(message);
        }
      }
    };

    recognition.onerror = (event) => {
      console.error("음성 인식 오류: ", event.error);
      recognition.start(); // 오류 발생 시 음성 인식을 다시 시작
    };

    recognition.onend = () => {
      console.log("음성 인식이 종료되었습니다. 다시 시작합니다...");
      recognition.start(); // 인식이 종료되면 다시 시작
    };

    recognition.start(); // 컴포넌트가 마운트되면 음성 인식 시작

    return () => {
      recognition.stop(); // 컴포넌트 언마운트 시 음성 인식 정지
    };
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
      return data.result;
    } catch (error) {
      return `일시적인 오류: ${error.message}가 발생하였습니다`;
    }
  };

  return (
    <div className='chat-container'>
      <h1 className='title'>심신풀이</h1>
      {chat.map((message,index) => (
        message.turn === 'Client' ? (
          <div className='client' key={index}>{message.content}<small>{message.time}</small></div> // 짝수 인덱스
        ) : (
          <div className='server' key={index}>{message.content}<small>{message.time}</small></div> // 홀수 인덱스
        )
      ))}
       
    </div>
  );
};

export default Service;
