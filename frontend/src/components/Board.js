import React, { Component } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // 스타일 임포트
import "./Board.css"; // CSS 파일 임포트
import { useParams } from "react-router-dom"; // useParams 임포트
import Write from "./Write"; // Write 컴포넌트 임포트

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      admin: false, // 로그인 여부
      board_id: this.props.board_id, // id 받아오기
      board: {}, // 글 목록을 저장할 상태
      isEditing: false, // 수정 모드 여부
    };
  }

  componentDidMount() {
    const board_id = this.state.board_id;
    fetch(`/api/board/read/${board_id}`, {
      method: "GET",
      headers: {
        "X-CSRFToken": csrfToken, // CSRF 토큰 추가
        "Content-Type": "application/json", // 필요 시 추가
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        this.setState({
          board: data,
        }); // API에서 받아온 데이터를 상태에 저장
      })
      .catch((error) => {
        console.error(error); // 에러 처리 로직
      });
  }

  toggleEdit = () => {
    this.setState((prevState) => ({ isEditing: !prevState.isEditing }));
  };

  render() {
    const { title, content, thumbnail, author } = this.state.board; // 상태에서 title과 content 추출
    const { isEditing } = this.state;

    return (
      <div>
        {author ? (
          isEditing ? (
            <Write
              initialTitle={title}
              initialContent={content}
              initialThumbnail={thumbnail}
              board_id={this.state.board_id}
              onCancel={this.toggleEdit} // 수정 모드 종료 핸들러
            />
          ) : (
            <div className="editor">
              <div className="title-input">{title}</div>
              <ReactQuill
                modules={{ toolbar: false }}
                value={content}
                readOnly={true} // 읽기 전용 모드
              />
              <button onClick={this.toggleEdit}>수정하기</button>{" "}
              {/* 수정하기 버튼 */}
            </div>
          )
        ) : (
          <div className="editor">
            <div className="title-input">{title}</div>

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
  const { board_id } = useParams(); // URL에서 id 가져오기
  return <Board {...props} board_id={board_id} />;
};

export default BoardWrapper; // withRouter로 감싸기
