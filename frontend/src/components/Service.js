// import React, { Component } from 'react';




// class Service extends Component {
  

//   componentDidMount() { // 오타 수정
    
//     fetch(`https://my-wiki.p-e.kr/api/service`, {
//       method: 'POST',
//       headers: {
//         'X-CSRFToken': csrfToken, // CSRF 토큰 추가
//         'Content-Type': 'application/json', // 필요 시 추가
//       },
//       body: JSON.stringify({
//         question: "배가너무아파요...",
//       }),
//     })
//       .then(response => {
//         if (!response.ok) {
//           throw new Error("Network response was not ok");
//         }
//         return response.json();
//       })
//       .then(data => {
//         console(data.result) // API에서 받아온 데이터를 상태에 저장
//       })
//       .catch(error => {
//         console.error(error); // 에러 처리 로직
//       });
//   }

//   render() {

//     return (
//       <div>
        
          
          
        
//       </div>
//     );
//   }
// }

// export default Service; // withRouter로 감싸기
import React, { useState } from 'react';

const Service = () => {
  const [chat, setChat] = useState([]);
  const addMessage = (message) => {
    setChat((prevChat) => [...prevChat, message]);
  
  const [isClientTurn, setIsClientTurn] = useState(true); // 현재 턴을 관리하는 상태
  const recognition = new window.webkitSpeechRecognition();
  recognition.continuous = true;
  recognition.interimResults = false;
  recognition.lang = 'ko-KR';
  recognition.start();
  

    
    
   recognition.onresult = async (event) => {
        recognition.stop();
        for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
            addMessage(event.results[i][0].transcript);
            addMessage(await this.sendQuestionToServer(recognizedText));
        }
        }
    };

    this.recognition.onerror = (event) => {
      console.error("음성 인식 오류: ", event.error);
    };

    this.recognition.stop = () => {
      console.log("서버턴");
      setIsClientTurn(false); // 음성 인식 상태 업데이트
    };

    this.recognition.start=()=>{
      console.log("사용자턴");
      setIsClientTurn(true);
    }; 
  };

  sendQuestionToServer = async (question) => {
  

    try {
      await fetch(`https://my-wiki.p-e.kr/api/service`, {
        method: 'POST',
        headers: {
          'X-CSRFToken': csrfToken,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question }),
      }).then(response=>{
        return response.json();
      }).then(data=>{
        
        recognition.start(); // API ���� 받��을 시에 ��성 인식 재시작
        return data.result;
      })
    } catch (error) {

      recognition.start();
      return `일시적인오류:${error.message} 가발생하였습니다`;
      
    };
    


  

  
 


    return (
      <div>
        <h1>심신풀이</h1>
        {chat.map((message, index) => (
          (index % 2 === 0)?  
          <div>{message}</div>:
          <div>{message}</div>
        ))}
        {isClientTurn?(<p>말하세요!</p>):(<p>로딩중...</p>)}
      </div>
    );
}
};


export default Service;
