import React, { Component } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // 스타일 임포트
import './Board.css'; // CSS 파일 임포트
import { withRouter } from 'react-router-dom'; // withRouter 임포트

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.id, // id 받아오기
      board: {}, // 글 목록을 저장할 상태
    };
  }

  componentDidMount() { // 오타 수정
    const id = this.state.id;
    const csrfToken = ''; // CSRF 토큰을 적절히 설정해야 합니다.
    fetch(`https://my-wiki.p-e.kr/api/board/read/${id}`, {
      method: 'GET',
      headers: {
        'X-CSRFToken': csrfToken, // CSRF 토큰 추가
        'Content-Type': 'application/json', // 필요 시 추가
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then(data => {
        this.setState({ board: data }); // API에서 받아온 데이터를 상태에 저장
      })
      .catch(error => {
        console.error(error); // 에러 처리 로직
      });
  }

  render() {
    const { title, content } = this.state.board; // 상태에서 title과 content 추출

    return (
      <div className="viewer">
        <div className="title">
          {title}
        </div>
        <ReactQuill
          value={content}
          readOnly={true} // 읽기 전용 모드
          theme="bubble" // 테마 설정
        />
      </div>
    );
  }
}

export default withRouter(Board); // withRouter로 감싸기
