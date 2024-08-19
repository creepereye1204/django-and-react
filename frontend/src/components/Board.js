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


  

  commentDidMount = () => {
    fetch(`https://my-wiki.p-e.kr/api/board/read/${id}`, {
        method: 'GET', // POST 메서드 사용
        headers: {
          'X-CSRFToken': csrfToken
        }
      }).then(response => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then(data => {
        setTitle(data.title);
        setContent(data.content); // API에서 받아�� content로 Quill editor ���기화
      }).catch(error => {
        console.error(error); // 에러 처리 로직
      });
  }

  return (
    <div className="viewer">
      <div className="title">
        {title}
      </div>
      <ReactQuill
        value={content}
        
      />
      
      
    </div>
  );
};

export default Read;
