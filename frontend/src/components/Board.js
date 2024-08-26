import React, { Component } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // 스타일 임포트
import './Board.css'; // CSS 파일 임포트
import { useParams } from 'react-router-dom'; // useParams 임포트
import Write from './Write'; // Write 컴포넌트 임포트
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      admin: false, // 로그인 여부
      id: this.props.id, // id 받아오기
      board: {}, // 글 목록을 저장할 상태
    };
    
  }


  componentDidMount() {
    const id = this.state.id; // CSRF 토큰을 적절히 설정해야 합니다.
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
      this.setState({ 
        board: data,
        admin: data.admin
      }, () => {
        // 데이터가 성공적으로 설정된 후 PDF 생성
        this.generatePDF(data.content);
      });
    })
    .catch(error => {
      console.error(error);
    });
    generatePDF = (content) => {
      const pdf = new jsPDF();
      pdf.text(content, 10, 10); // PDF에 내용 추가
  
      // PDF 저장
      pdf.save('document.pdf');
    };
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
