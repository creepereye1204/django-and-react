
// import React, { Component } from "react";
// import { Link } from "react-router-dom";
// import "./BoardList.css";


// class BoardList extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       boards: [], // 글 목록을 저장할 상태
//       loading: true, // 로딩 상태
//       error: null, // 에러 상태
//     };
//   }

//   componentDidMount() {
//     // API에서 데이터 fetch
//     fetch("https://my-wiki.p-e.kr/api/board") // API URL로 변경
//       .then(response => {
//         if (!response.ok) {
//           throw new Error("Network response was not ok");
//         }
//         return response.json();
//       })
//       .then(data => {
//         this.setState({ boards: data.results, loading: false }); // 상태 업데이트
//       })
//       .catch(error => {
//         this.setState({ loading: false, error: error.message }); // 에러 처리
//       });
//   }

//   render() {
//     const { boards, loading, error } = this.state;

//     if (loading) {
//       return <div className="loader"></div>; // 로딩 스피너
//     }

//     if (error) {
//       return <div className="error">Error: {error}</div>; // 에러 메시지
//     }

//     // 기본 이미지 URL


//     return (
//       <div className="board-container">
//         {boards.map(board => (
//           <card className="card" key={board.id}> {/* key 속성을 추가하여 경고 방지 */}
//             <img 
//               src={board.thumbnail} 
//               alt={board.title} 
              
//             />
//             <Link to={`/board/${board.id}`}>
//               <div className="title">
//                 {board.title}
//               </div>
//             </Link> {/* 링크에 id 추가 */}
//           </card>
//         ))}
//         {}
//       </div>
//     );
//   }
// }

// export default BoardList;
// import React, { Component } from "react";
// import { Link } from "react-router-dom";
// import "./BoardList.css";

// class BoardList extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       pageSize:10,
//       boards: [],
//       loading: true,
//       error: null,
//       startIndex: 1, // 시작 인덱스
//       endIndex: 1, // 끝 인덱스
//     };
//   }

//   componentDidMount() {
//     fetch(`https://my-wiki.p-e.kr/api/board/?page=1&page_size=${this.pageSize}`)
//       .then(response => {
//         if (!response.ok) {
//           throw new Error("Network response was not ok");
//         }
//         return response.json();
//       })
//       .then(data => {
//         this.setState({
//           boards: data.results,
//           loading: false,
//           startIndex: data.startIndex,
//           endIndex: data.endIndex,
//         });
//       })
//       .catch(error => {
//         this.setState({ loading: false, error: error.message });
//       });
//   }

//   renderPaginationButtons() {
//     const { startIndex, endIndex } = this.state;
//     const buttons = [];

//     for (let i = startIndex; i <= endIndex; i++) {
//       buttons.push(
//         <button key={i} onClick={() => this.handlePageChange(i)}>
//           {i + 1} {/* 페이지 번호는 1부터 시작 */}
//         </button>
//       );
//     }

//     return buttons;
//   }

//   handlePageChange(page) {
//     const url=`https://my-wiki.p-e.kr/api/board/?page=${page}&page_size=${this.pageSize}&page_`;
//     fetch(url,{
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     }).then(response=>{
//       return response.json();
//     }).then(data=>{
//       const totalPage=data.count/pageSize;
//       this.setState({
//         boards: data.results,
//         loading: false,
//         startIndex: data.startIndex,
//         endIndex: data.endIndex,
//       });
//     })
//   }

//   render() {
//     const { boards, loading, error } = this.state;

//     if (loading) {
//       return <div className="loader"></div>;
//     }

//     if (error) {
//       return <div className="error">Error: {error}</div>;
//     }

//     return (
//       <div className="board-container">
//         {boards.map(board => (
//           <div className="card" key={board.id}>
//             <img 
//               src={board.thumbnail} 
//               alt={board.title} 
//             />
//             <Link to={`/board/${board.id}`}>
//               <div className="title">
//                 {board.title}
//               </div>
//             </Link>
//           </div>
//         ))}
//         <div className="pagination">
//           {this.renderPaginationButtons()}
//         </div>
//       </div>
//     );
//   }
// }

// export default BoardList;

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
    fetch(`https://my-wiki.p-e.kr/api/board/?page=${page}&page_size=${this.state.pageSize}`)
      .then(response => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then(data => {
        this.setState({
          boards: data.results,
          loading: false,
          totalCount: data.count, // 총 데이터 수
          currentPage: page, // 현재 페이지 설정
        });
      })
      .catch(error => {
        this.setState({ loading: false, error: error.message });
      });
  }

  renderPaginationButtons() {
    const { totalCount, pageSize, currentPage } = this.state;
    const totalPages = Math.ceil(totalCount / pageSize); // 총 페이지 수
    const buttons = [];

    for (let i = 1; i <= totalPages; i++) {
      buttons.push(
        <button key={i} onClick={() => this.handlePageChange(i)} disabled={currentPage === i}>
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
        {boards.map(board => (
          <div className="card" key={board.id}>
            <img 
              src={board.thumbnail} 
              alt={board.title} 
            />
            <Link to={`/board/${board.id}`}>
              <div className="title">
                {board.title}
              </div>
            </Link>
          </div>
        ))}
        <div className="pagination">
          {this.renderPaginationButtons()} {/* 페이지네이션 버튼 표시 */}
        </div>
      </div>
    );
  }
}

export default BoardList;
