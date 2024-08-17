import React, { useState } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // 스타일 임포트
import './Write.css'; // CSS 파일 임포트
import ImageResize from 'quill-image-resize';

Quill.register('modules/ImageResize', ImageResize);

const toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'],        
  ['blockquote', 'code-block'],               
  [{ 'list': 'ordered'}, { 'list': 'bullet' }],
  [{ 'script': 'sub'}, { 'script': 'super' }],      
  [{ 'indent': '-1'}, { 'indent': '+1' }],          
  [{ 'direction': 'rtl' }],                         
  [{ 'size': ['small', false, 'large', 'huge'] }],  
  [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
  [{ 'color': [] }, { 'background': [] }],
  [{ 'font': [] }],
  [{ 'align': [] }],
  ['link', 'image', 'video'],
  ['clean']                                         
];

const ImageResizeOptions = { parchment: Quill.import('parchment') };

const Write = () => {
  const [content, setContent] = useState('');
  const [title, setTitle] = useState(''); // 제목 상태 추가

  const handleChange = (value) => {
    setContent(value);
  };

  async function handleSave() {
    const results = await fetch('https://my-wiki.p-e.kr/api/board/write', {
      method: 'POST', // POST 메서드 사용
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 'title':title, 'content':content }), // 제목과 본문을 JSON 형태로 전송
    });

    if (results.ok) {
      console.log('저장 성공');
      // 추가적인 성공 처리 로직
    } else {
      console.error(results.error,' 저장 실패');
      // 에러 처리 로직
    }
  }

  return (
    <div className="editor">
      <div className="input">
      <input 
        className="title-input"
        type="text" 
        placeholder="제목을 입력하세요" 
        value={title} // 제목 상태 값
        onChange={(e) => setTitle(e.target.value)} // 제목 상태 업데이트
      />
      <button onClick={handleSave}>저장하기</button>
      </div>
      <ReactQuill
        value={content}
        onChange={handleChange}
        modules={{
          toolbar: toolbarOptions,
          ImageResize: ImageResizeOptions
        }}
      />
      
    </div>
  );
};

export default Write;
