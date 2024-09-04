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


// class Message{

//   constructor(content,turn) {
//     this.content = content;
//     this.turn = turn;
//     this.time = new Date().toLocaleString();
//   }
// }

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
//         var message;
//         if (event.results[i].isFinal) {

          
//           try{
//             clientChat = event.results[i][0].transcript;
            
//           }
//           catch (error){
//             clientChat = '일시적인 오류: ('+event.error+')가 발생하였습니다';
//             alert(clientChat);
//             return
//           }

//           message = new Message(clientChat,'Client');
//           addMessage(message);
          
//           try {
//             recognition.stop();
//             serverChat = await sendQuestionToServer(clientChat);
//             if(serverChat.status === 200) {
//               serverChat=serverChat.result;
              
//             }else{
//               serverChat = '일시적인 오류: ('+serverChat.message+')가 발생하였습니다';
              
//             }
//           }
//           catch (error) {
//             serverChat = '일시적인 오류: ('+error.message+')가 발생하였습니다';
//             alert(error.message);
            
//           }
//           message = new Message(serverChat, 'Server');
//           addMessage(message);
//           recognition.start();
//         }
//       }
//     };
//     recognition.onresult = (event) => {
//       recognition.stop(); //
//       recognition.start();
//     };
//     recognition.onerror = (event) => {
//       console.log("음성 인식 오류: ", event.error);
//       recognition.stop(); //
//       recognition.start(); // 오류 발생 시 음성 인식을 다시 시작
//     };

//     recognition.onend = () => {
//       console.log("음성 인식이 종료되었습니다. 다시 시작합니다...");
//       recognition.stop(); //
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
//       {chat.map((message,index) => (
//         message.turn === 'Client' ? (
//           <div className='client' key={index}>{message.content}<small>{message.time}</small></div> // 짝수 인덱스
//         ) : (
//           <div className='server' key={index}>{message.content}<small>{message.time}</small></div> // 홀수 인덱스
//         )
//       ))}
       
//     </div>
//   );
// };

// export default Service;
// class Message{

//   constructor(content,turn) {
//     this.content = content;
//     this.turn = turn;
//     this.time = new Date().toLocaleString();
//   }
// }
// import './Service.css';
// import React, { useState, useEffect } from 'react';

// class Chat{

//   constructor(message,isClientTurn) {
//     this.message = message;
//     this.isClientTurn = isClientTurn;
//     this.time = new Date().toLocaleString();
//   }
// }

// const Service = () => {
//   const [chat, setChat] = useState([]);
//   const [webSocket, setWebSocket] = useState(null);
  
//   useEffect(() => {
//     const ws = new WebSocket('wss://my-wiki.p-e.kr/ws/api/sketch-to-image');
    
//     ws.onopen = () => {
//       setWebSocket(ws);
//       console.log('웹소캣 연결됨');
//     }
    

//     ws.onmessage = (event) => {
//         const text=event.data.message;
//         setChat((prevChat) => [...prevChat, chat]);
//         if 
//     }

//     ws.onclose = () => {
//       console.log('웹소켓 연결 종료');
//       setWebSocket(null);
//     };

    
//   return ()=>{
//     ws.close();
//     setWebSocket(null);
//   };
    
//   }, []); // 빈 배열을 전달하여 컴포넌트가 처음 렌더링될 때만 실행

//   const sendMessage = (message) => {
//     if(webSocket && webSocket.readyState == WebSocket.OPEN) {
//         const chat= new Chat(message=message,isClientTurn=true);
//         if(message.message){
//             try{
//                 webSocket.send(JSON.stringify(message));
                
//             }
//             catch(error){
//                 alert('서버로 전송중 실패: '+error.message);
//             }
//         }
            
//         else{
//             alert('안에 내용이 없는디..');
//         }
            
//     }
//   };

  

//   return (
//     <div className='chat-container'>
//       <h1 className='title'>심신풀이</h1>
//       {chat.map((message,index) => (
//         message.turn === 'Client' ? (
//           <div className='client' key={index}>{message.content}<small>{message.time}</small></div> // 짝수 인덱스
//         ) : (
//           <div className='server' key={index}>{message.content}<small>{message.time}</small></div> // 홀수 인덱스
//         )
//       ))}
       
//     </div>
//   );
// };
// import './Service.css';
// import React, { useState, useEffect } from 'react';

// class Chat{

//   constructor(message,isClientTurn) {
//     this.message = message;
//     this.isClientTurn = isClientTurn;
//     this.time = new Date().toLocaleString();
//   }
// }

// const Service = () => {
//   const [chat, setChat] = useState([]);
//   const [webSocket, setWebSocket] = useState(null);
  
//   useEffect(() => {
//     const ws = new WebSocket('wss://my-wiki.p-e.kr/ws/api/sketch-to-image');
    
//     ws.onopen = () => {
//       setWebSocket(ws);
//       console.log('웹소캣 연결됨');
//     }
    
//     ws.onmessage = (event) => {
      
//       setChat((prevChat) => {
//           const text = event.data.message;
//           const isClientTurn = updatedChat[latestMessageIndex].turn
//           const updatedChat = [...prevChat];
//           const latestMessageIndex = updatedChat.length - 1; // 최신 객체의 인덱스
  
//           // 최신 객체가 존재하고, message가 있을 경우 문자열 추가
//           if (latestMessageIndex >= 0 &&  isClientTurn=== false) {
//               if (updatedChat[latestMessageIndex].message) {
//                   updatedChat[latestMessageIndex].message += text;
//               } else {
//                   updatedChat[latestMessageIndex].message = text; // message가 없을 경우 새로 추가
//               }
//           }
  
//           return updatedChat;
//       });
//   };
  


//     ws.onclose = () => {
//       console.log('웹소켓 연결 종료');
//       setWebSocket(null);
//     };

    
//   return ()=>{
//     ws.close();
//     setWebSocket(null);
//   };
    
//   }, []); // 빈 배열을 전달하여 컴포넌트가 처음 렌더링될 때만 실행

//   const sendMessage = (message) => {
//     if(webSocket && webSocket.readyState == WebSocket.OPEN) {
//         const clientChat= new Chat(message=message,isClientTurn=true);
//         const serverChat= new Chat(message=message,isClientTurn=false);
//         if(message.message){
//             try{
//                 setChat((prevChat) => [...prevChat, clientChat]);
//                 setChat((prevChat) => [...prevChat, serverChat]);
//                 webSocket.send(JSON.stringify(message));
                
//             }
//             catch(error){
//                 alert('서버로 전송중 실패: '+error.message);
//             }
            
//         }
            
//         else{
//             alert('안에 내용이 없는디..');
//         }
            
//     }
//   };

  

//   return (
//     <div className='chat-container'>
//       <h1 className='title'>심신풀이</h1>
//       {chat.map((message,index) => (
//         message.turn ? (
//           <div className='client' key={index}>{message.content}<small>{message.time}</small></div> // 짝수 인덱스
//         ) : (
//           <div className='server' key={index}>{message.content}<small>{message.time}</small></div> // 홀수 인덱스
//         )
//       ))}
       
//     </div>
//   );
// };

// export default Service;


// import './Service.css';
// import React, { useState, useEffect } from 'react';

// class ChatMessage {
//   constructor(content, isClientTurn) {
//     this.content = content; // 메시지 내용
//     this.isClientTurn = isClientTurn; // 클라이언트 턴 여부
//     this.time = new Date().toLocaleString(); // 메시지 전송 시간
//   }
// }

// const Service = () => {
//   const [chatMessages, setChatMessages] = useState([]); // 채팅 메시지 상태
//   const [webSocket, setWebSocket] = useState(null); // 웹소켓 상태
//   const [inputValue, setInputValue] = useState(''); // 입력값 상태

//   useEffect(() => {
//     const ws = new WebSocket('wss://my-wiki.p-e.kr/ws/api/bible-bot');
    
//     ws.onopen = () => {
//       setWebSocket(ws);
//       console.log('웹소켓 연결됨');
//     };
    
//     ws.onmessage = (event) => {
//       setChatMessages((prevMessages) => {
//           const incomingMessage = JSON.parse(event.data); // 수신 메시지 파싱
//           const text = incomingMessage.message; // 메시지 내용
          
//           const updatedMessages = [...prevMessages];
//           const latestMessageIndex = updatedMessages.length - 1; // 최신 메시지 인덱스
          
//           // 최신 메시지가 존재하고 서버 턴일 경우 메시지 추가
//           if (latestMessageIndex >= 0 && !updatedMessages[latestMessageIndex].isClientTurn) {
//               if (updatedMessages[latestMessageIndex].content) {
//                   updatedMessages[latestMessageIndex].content += text;
//               } else {
//                   updatedMessages[latestMessageIndex].content = text; // 메시지가 없을 경우 새로 추가
//               }
//           }

//           return updatedMessages;
//       });
//     };
    
//     ws.onclose = () => {
//       console.log('웹소켓 연결 종료');
//       setWebSocket(null);
//     };

//     return () => {
//       ws.close();
//       setWebSocket(null);
//     };
    
//   }, []); // 빈 배열을 전달하여 컴포넌트가 처음 렌더링될 때만 실행

//   const sendMessage = (messageContent) => {
//     if (webSocket && webSocket.readyState === WebSocket.OPEN) {
//       const clientMessage = new ChatMessage(messageContent, true);
//       const serverMessage = new ChatMessage('', false);
      
//       if (messageContent) {
//         try {
//           setInputValue('');
//           setChatMessages((prevMessages) => [...prevMessages, clientMessage]);
//           setChatMessages((prevMessages) => [...prevMessages, serverMessage]);
//           webSocket.send(JSON.stringify({ message: messageContent })); // 메시지 객체 전송
//         } catch (error) {
//           alert('서버로 전송 중 실패: ' + error.message);
//         }
//       } else {
//         alert('내용이 비어 있습니다.');
//       }
//     }
//   };

//   return (
//     <div className='chat-container'>
//       <h1 className='title'>심신풀이</h1>
//       {chatMessages.map((message, index) => (
//         message.isClientTurn ? (
//           <div className='client' key={index}>
//             {message.content}<h5>{message.time}</h5>
//           </div> // 클라이언트 메시지
//         ) : (
//           <div className='server' key={index}>
//             {message.content}<h5>{message.time}</h5>
//           </div> // 서버 메시지
//         )
//       ))}
//       <input
//         className='input-container'
//         type='text'
//         placeholder='텍스트 입력!'
//         value={inputValue} // 입력값 상태
//         onChange={(e) => setInputValue(e.target.value)} // 입력값 업데이트
//       />
//       <button onClick={() => sendMessage(inputValue)} >전송</button> {/* 전송 버튼 */}
//     </div>
// )

// };
// export default Service;


// import './Service.css';
// import React, { useState, useEffect } from 'react';

// class ChatMessage {
//   constructor(content, isClientTurn) {
//     this.content = content; // 메시지 내용
//     this.isClientTurn = isClientTurn; // 클라이언트 턴 여부
//     this.time = new Date().toLocaleString(); // 메시지 전송 시간
//   }
// }

// const Service = () => {
//   const [chatMessages, setChatMessages] = useState([]); // 채팅 메시지 상태
//   const [webSocket, setWebSocket] = useState(null); // 웹소켓 상태
//   const [inputValue, setInputValue] = useState(''); // 입력값 상태
//   const [inputDisabled, setInputDisabled] = useState(true); // 입력 비활성화 상태

//   useEffect(() => {
//     const ws = new WebSocket('wss://my-wiki.p-e.kr/ws/api/bible-bot');

//     ws.onopen = () => {
//       setWebSocket(ws);
//       console.log('웹소켓 연결됨');
//       setInputDisabled(false); // 연결되면 입력 가능
//     };

//     ws.onmessage = (event) => {
//       const incomingMessage = JSON.parse(event.data); // 수신 메시지 파싱
//       if (incomingMessage === null) {
//         setInputDisabled(true);
//         return; // null일 경우 함수 종료
//       }
//       const text = incomingMessage.message; // 메시지 내용

//       setChatMessages((prevMessages) => {
//         const updatedMessages = [...prevMessages];
//         const latestMessageIndex = updatedMessages.length - 1;

//         // 최신 메시지가 존재하고 서버 턴일 경우 메시지 추가
//         if (latestMessageIndex >= 0 && !updatedMessages[latestMessageIndex].isClientTurn) {
//           updatedMessages[latestMessageIndex].content += text;
//         } else {
//           updatedMessages.push(new ChatMessage(text, false)); // 새로운 서버 메시지 추가
//         }

//         return updatedMessages;
//       });
//     };

//     ws.onclose = () => {
//       console.log('웹소켓 연결 종료');
//       setWebSocket(null);
//       setInputDisabled(true); // 연결 종료 시 입력 비활성화
//     };

//     return () => {
//       ws.close();
//       setWebSocket(null);
//     };
//   }, []); // 빈 배열을 전달하여 컴포넌트가 처음 렌더링될 때만 실행

//   const sendMessage = (messageContent) => {
//     if (webSocket && webSocket.readyState === WebSocket.OPEN) {
//       if (messageContent) {
//         setInputDisabled(false);
//         const clientMessage = new ChatMessage(messageContent, true);
//         setChatMessages((prevMessages) => [...prevMessages, clientMessage]);

//         webSocket.send(JSON.stringify({ message: messageContent })); // 메시지 객체 전송
//         setInputValue(''); // 입력값 초기화
//       } else {
//         alert('내용이 비어 있습니다.');
//       }
//     } else {
//       alert('웹소켓이 연결되어 있지 않습니다.');
//     }
//   };

//   return (
//     <div className='chat-container'>
//       <h1 className='title'>심신풀이</h1>
//       {chatMessages.map((message, index) => (
//         message.isClientTurn ? (
//           <div className='client' key={index}>
//             {message.content}<h5>{message.time}</h5>
//           </div> // 클라이언트 메시지
//         ) : (
//           <div className='server' key={index}>
//             {message.content}<h5>{message.time}</h5>
//           </div> // 서버 메시지
//         )
//       ))}
//       <input
//         className='input-container'
//         type='text'
//         placeholder='텍스트 입력!'
//         value={inputValue} // 입력값 상태
//         onChange={(e) => setInputValue(e.target.value)} // 입력값 업데이트
//       />
//       <button onClick={() => sendMessage(inputValue)} disabled={inputDisabled}>전송</button> {/* 전송 버튼 */}
//     </div>
//   );
// };

// export default Service;
import './Service.css';
import React, { useState, useEffect } from 'react';

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
  const [inputValue, setInputValue] = useState(''); // 입력값 상태
  const [buttonAbled, setButtonAbled] = useState(false); // 초기 상태에서 버튼 비활성화

  useEffect(() => {
    const ws = new WebSocket('wss://my-wiki.p-e.kr/ws/api/bible-bot');

    ws.onopen = () => {
      setWebSocket(ws);
      console.log('웹소켓 연결됨');
      setButtonAbled(true); // 연결되면 입력 가능
    };

    ws.onmessage = (event) => {
      const incomingMessage = JSON.parse(event.data); // 수신 메시지 파싱
      if (incomingMessage.message === null) {
        setButtonAbled(true); // null일 경우 버튼 활성화
        return; // null일 경우 함수 종료
      }
      const text = incomingMessage.message || ''; // 메시지 내용

      setChatMessages((prevMessages) => {
        const updatedMessages = [...prevMessages];
        const latestMessageIndex = updatedMessages.length - 1;

        // 최신 메시지가 존재하고 서버 턴일 경우 메시지 추가
        if (latestMessageIndex >= 0 && !updatedMessages[latestMessageIndex].isClientTurn) {
          updatedMessages[latestMessageIndex].content += text; // 메시지 내용 추가
        } else {
          updatedMessages.push(new ChatMessage(text, false)); // 새로운 서버 메시지 추가
        }

        return updatedMessages;
      });
    };

    ws.onclose = () => {
      console.log('웹소켓 연결 종료');
      setWebSocket(null);
      setButtonDisabled(true); // 연결 종료 시 입력 비활성화
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
        setInputValue(''); // 입력값 초기화
      } else {
        alert('내용이 비어 있습니다.');
      }
    } else {
      alert('웹소켓이 연결되어 있지 않습니다.');
    }
  };

  return (
    <div className='chat-container'>
      <h1 className='title'>심신풀이</h1>
      {chatMessages.map((message, index) => (
        message.isClientTurn ? (
          <div className='client' key={index}>
            {message.content}<h5>{message.time}</h5>
          </div> // 클라이언트 메시지
        ) : (
          <div className='server' key={index}>
            {message.content}<h5>{message.time}</h5>
          </div> // 서버 메시지
        )
      ))}
      <input
        className='input-container'
        type='text'
        placeholder='텍스트 입력!'
        value={inputValue} // 입력값 상태
        onChange={(e) => setInputValue(e.target.value)} // 입력값 업데이트
      />
      <button onClick={() => sendMessage(inputValue)} disabled={!buttonAbled}>전송</button>
    </div>
  );
};

export default Service;
