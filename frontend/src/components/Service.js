import React, { Component } from 'react';




class Service extends Component {
  

  componentDidMount() { // 오타 수정
    
    fetch(`https://my-wiki.p-e.kr/api/service`, {
      method: 'POST',
      headers: {
        'X-CSRFToken': csrfToken, // CSRF 토큰 추가
        'Content-Type': 'application/json', // 필요 시 추가
      },
      body: JSON.stringify({
        question: "배가너무아파요...",
      }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then(data => {
        console(data.result) // API에서 받아온 데이터를 상태에 저장
      })
      .catch(error => {
        console.error(error); // 에러 처리 로직
      });
  }

  render() {

    return (
      <div>
        
          
          
        
      </div>
    );
  }
}

export default Service; // withRouter로 감싸기
