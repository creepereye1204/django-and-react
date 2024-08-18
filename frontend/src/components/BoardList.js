import { Card } from "@material-ui/core";
import React, { Component } from "react";
import "./BoardList.css";


class BoardList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      boards: [], // 글 목록을 저장할 상태
      loading: true, // 로딩 상태
      error: null, // 에러 상태
    };
  }

  componentDidMount() {
    // API에서 데이터 fetch
    fetch("https://my-wiki.p-e.kr/api/board") // API URL로 변경
      .then(response => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then(data => {
        this.setState({ boards: data, loading: false }); // 상태 업데이트
      })
      .catch(error => {
        this.setState({ loading: false, error: error.message }); // 에러 처리
      });
  }

  render() {
    const { boards, loading, error } = this.state;

    if (loading) {
      return <div>Loading...</div>; // 로딩 중인 경우
    }

    if (error) {
      return <div>Error: {error}</div>; // 에러가 발생한 경우
    }

    return (
      <div>
        <h1>글 목록</h1>
        <ul>
          {boards.map(board => (
            <Card className="card">
                <Link>{board.title}</Link>
            </Card>
             // 각 글의 제목을 리스트로 표시
          ))}
        </ul>
      </div>
    );
  }
}

export default BoardList;
