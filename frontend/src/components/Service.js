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
import React, { Component } from 'react';

class Service extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chatBubbles: [], // 채팅 말풍선 저장
      isRecognizing: false, // 음성 인식 상태
    };
    this.recognition = null; // 음성 인식 객체
  }

  componentDidMount() {
    // 음성 인식 초기화
    this.initSpeechRecognition();
  }

  initSpeechRecognition = () => {
    this.recognition = new window.webkitSpeechRecognition();
    this.recognition.continuous = true;
    this.recognition.interimResults = false;
    this.recognition.lang = 'ko-KR';

    this.recognition.onstart = () => {
      console.log("음성 인식 시작...");
      this.setState({ isRecognizing: true }); // 음성 인식 상태 업데이트
    };

    this.recognition.onresult = async (event) => {
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          const recognizedText = event.results[i][0].transcript;
          console.log("Google 음성 인식이 이렇게 들었습니다: " + recognizedText);
          
          // 사용자 질문 추가
          this.addChatBubble(recognizedText, 'user-bubble');

          // 서버에 질문 전송
          await this.sendQuestionToServer(recognizedText);
        }
      }
    };

    this.recognition.onerror = (event) => {
      console.error("음성 인식 오류: ", event.error);
    };

    this.recognition.onend = () => {
      console.log("음성 인식 종료");
      this.setState({ isRecognizing: false }); // 음성 인식 상태 업데이트
    };

    this.recognition.start(); // 음성 인식 시작
  };

  sendQuestionToServer = async (question) => {
  

    try {
      const response = await fetch(`https://my-wiki.p-e.kr/api/service`, {
        method: 'POST',
        headers: {
          'X-CSRFToken': csrfToken,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      this.addChatBubble(data.result, 'response-bubble'); // 서버 응답 추가

      // 서버로부터 응답을 받으면 음성 인식을 다시 시작
      this.startRecognition();
    } catch (error) {
      console.error("서버 오류: ", error);
    }
  };

  addChatBubble = (content, bubbleType) => {
    this.setState((prevState) => ({
      chatBubbles: [...prevState.chatBubbles, { content, bubbleType }],
    }));
  };

  startRecognition = () => {
    if (!this.state.isRecognizing) {
      this.recognition.start(); // 음성 인식 다시 시작
    }
  };

 

  render() {
    return (
      <div>
        <div>
          {this.state.chatBubbles.map((bubble, index) => (
            <div key={index} className={bubble.bubbleType}>
              {bubble.content}
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Service;
