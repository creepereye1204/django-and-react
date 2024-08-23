import React, { Component } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // 스타일 임포트
import './Board.css'; // CSS 파일 임포트
import { useParams } from 'react-router-dom'; // useParams 임포트
import Write from './Write'; // Write 컴포넌트 임포트

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      admin: false, // 로그인 여부
      id: this.props.id, // id 받아오기
      board: {}, // 글 목록을 저장할 상태
    };
    this.download = this.download.bind(this);
  }

  async download() {
    const button = document.querySelector('.pdf-button');
    
    // 버튼 텍스트 변경
    button.textContent = '다운로드 중...';
    button.style.pointerEvents = 'none'; // 클릭 방지

    try {
      const id = this.state.id; // CSRF 토큰을 적절히 설정해야 합니다.
      const response = await fetch(`https://my-wiki.p-e.kr/api/board/download_pdf/${id}`, {
        method: 'GET',
        headers: {
          'X-CSRFToken': csrfToken, // CSRF 토큰 추가
          'Content-Type': 'application/json', // 필요 시 추가
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${this.state.board.title}.pdf`; // 다운로드할 파일 이름
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
      
      // 버튼 텍스트를 원래대로 복원
      button.textContent = 'PDF 변환';
      button.style.pointerEvents = 'auto';
    } catch (error) {
      console.error(error);
      alert('다운로드 중 오류가 발생했습니다.');
      
      // 버튼 텍스트 복원
      button.textContent = 'PDF 변환';
      button.style.pointerEvents = 'auto'; // 클릭 가능하게 복원
    }
  }

  componentDidMount() {
    const id = this.state.id; // CSRF 토큰을 적절히 설정해야 합니다.
    fetch(`https://my-wiki.p-e.kr/api/board/download_pdf/${id}`, {
      method: 'GET',
      headers: {
        'X-CSRFToken': csrfToken, // CSRF 토큰 추가
        'Content-Type': 'application/json', // 필요 시 추가
      },
    }).catch(error => {
        console.error(error); // 에러 처리 로직
      });
  }

  render() {
    const { title, content, thumbnail } = this.state.board; // 상태에서 title과 content 추출
    const { admin } = this.state; // admin 여부
    
    return (
      <div>
        {admin ? (
          <Write
            initialTitle={title}
            initialContent={content}
            initialThumbnail={thumbnail}
            id={this.state.id}
          />
        ) : (
          <div className="editor">
            <div className="title-input">
              {title}
            </div>
            <a className="pdf-button" onClick={this.download}>PDF 변환</a>
            <ReactQuill
              modules={{ toolbar: false }}
              value={content}
              readOnly={true} // 읽기 전용 모드
            />
          </div>
        )}
      </div>
    );
  }
}

const BoardWrapper = (props) => {
  const { id } = useParams(); // URL에서 id 가져오기
  return <Board {...props} id={id} />;
};

export default BoardWrapper; // withRouter로 감싸기
