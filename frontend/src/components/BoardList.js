import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./BoardList.css";

class BoardList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageSize: 10,
      boards: [],
      loading: true,
      error: null,
      totalCount: 0, // 총 데이터 수
      currentPage: 1, // 현재 페이지
    };
  }

  componentDidMount() {
    this.getPage(1); // 처음에 페이지 1을 불러옴
  }

  getPage(page) {
    fetch(`/api/board/?page=${page}&page_size=${this.state.pageSize}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        this.setState({
          boards: data.results,
          loading: false,
          totalCount: data.count, // 총 데이터 수
          currentPage: page, // 현재 페이지 설정
        });
      })
      .catch((error) => {
        this.setState({ loading: false, error: error.message });
      });
  }

  renderPaginationButtons() {
    const { totalCount, pageSize, currentPage } = this.state;
    const totalPages = Math.ceil(totalCount / pageSize); // 총 페이지 수
    const buttons = [];

    for (let i = 1; i <= totalPages; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => this.handlePageChange(i)}
          disabled={currentPage === i}
        >
          {i}
        </button>
      );
    }

    return buttons;
  }

  handlePageChange(page) {
    this.getPage(page); // 페이지 변경 시 데이터 재요청
  }

  render() {
    const { boards, loading, error } = this.state;

    if (loading) {
      return <div className="loader"></div>;
    }

    if (error) {
      return <div className="error">Error: {error}</div>;
    }

    return (
      <div className="board-container">
        {boards.map((board) => (
          <div className="card" key={board.board_id}>
            <img src={board.thumbnail} alt={board.title} />
            <Link to={`/board/${board.board_id}`}>
              <div className="title">{board.title}</div>
            </Link>
          </div>
        ))}
        <div className="pagination">{this.renderPaginationButtons()}</div>
      </div>
    );
  }
}

export default BoardList;
