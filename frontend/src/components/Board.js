// import React, { Component } from 'react';
// import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css'; // 스타일 임포트
// import './Board.css'; // CSS 파일 임포트
// import { useParams } from 'react-router-dom'; // useParams 임포트
// import Write from './Write'; // Write 컴포넌트 임포트
// import jsPDF from 'jspdf';
// import html2canvas from 'html2canvas';

// class Board extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       admin: false, // 로그인 여부
//       id: this.props.id, // id 받아오기
//       board: {}, // 글 목록을 저장할 상태
//     };
    
//   }


//   componentDidMount() {
//     const id = this.state.id; // CSRF 토큰을 적절히 설정해야 합니다.
//     fetch(`https://my-wiki.p-e.kr/api/board/read/${id}`, {
//       method: 'GET',
//       headers: {
//         'X-CSRFToken': csrfToken, // CSRF 토큰 추가
//         'Content-Type': 'application/json', // 필요 시 추가
//       },
//     })
//     .then(response => {
//       if (!response.ok) {
//         throw new Error("Network response was not ok");
//       }
//       return response.json();
//     })
//     .then(data => {
//       this.setState({ 
//         board: data,
//         admin: data.admin
//       }); // API에서 받아온 데이터를 상태에 저장
//     })
//     .catch(error => {
//       console.error(error); // 에러 처리 로직
//     });
//   }

//   render() {
//     const { title, content, thumbnail } = this.state.board; // 상태에서 title과 content 추출
//     const { admin } = this.state; // admin 여부
    
//     return (
//       <div>
//         {admin ? (
//           <Write
//             initialTitle={title}
//             initialContent={content}
//             initialThumbnail={thumbnail}
//             id={this.state.id}
//           />
//         ) : (
//           <div className="editor">
//             <div className="title-input">
//               {title}
//             </div>
            
//             <ReactQuill
//               modules={{ toolbar: false }}
//               value={content}
//               readOnly={true} // 읽기 전용 모드
//             />
//           </div>
//         )}
//       </div>
//     );
//   }
// }

// const BoardWrapper = (props) => {
//   const { id } = useParams(); // URL에서 id 가져오기
//   return <Board {...props} id={id} />;
// };

// export default BoardWrapper; // withRouter로 감싸기
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

    this.pdfRef = React.createRef(); // PDF 변환을 위한 ref
  }

  componentDidMount() {
    const id = this.state.id; // CSRF 토큰을 적절히 설정해야 합니다.
    fetch(`${id}`, {
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
      }); // API에서 받아온 데이터를 상태에 저장
    })
    .catch(error => {
      console.error(error); // 에러 처리 로직
    });
  }

  generatePDF = () => {
    const input = this.pdfRef.current; // QuillJS 내용을 가져옴
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      const imgWidth = 190; // 이미지 너비
      const pageHeight = pdf.internal.pageSize.height;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;

      let position = 0;

      pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save('document.pdf'); // PDF 저장
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
          <div className="editor" ref={this.pdfRef}>
            <div className="title-input">
              {title}
            </div>
            
            <ReactQuill
              modules={{ toolbar: false }}
              value={content}
              readOnly={true} // 읽기 전용 모드
            />
            <button onClick={this.generatePDF}>PDF로 저장</button> {/* PDF 저장 버튼 */}
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
