import React, { useState } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // 스타일 임포트
import './Board.css'; // CSS 파일 임포트
import { useParams } from 'react-router-dom'; // useParams 임포트







const Read = () => {
  const { id } = useParams(); // URL에서 id 추출
  const [content,setContent] = useState('');
  const [title,setTitle] = useState('');
  read(); // id로 API 요청


  

  async function read() {
    // title file 추가
    const results = await fetch(`https://my-wiki.p-e.kr/api/board/read/${id}`, {
      method: 'GET', // POST 메서드 사용
      headers: {
        'X-CSRFToken': csrfToken
      }
    });

    if (results.ok) {
      console.log('불러오기 성공!');
      setContent(results.content); // content file 추가
      setTitle(results.title); // title file 추가
    } else {
      console.error(results.error,' 불러오기 실패!');
      // 에러 처리 로직
    }
  }

  return (
    <div className="viewer">
      <div className="title" value={title}>
        
      </div>
      <ReactQuill
        value={content}
        
      />
      
      
    </div>
  );
};

export default Read;
