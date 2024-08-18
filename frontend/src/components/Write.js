import React, { useState } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // 스타일 임포트
import './Write.css'; // CSS 파일 임포트
import ImageResize from 'quill-image-resize';

Quill.register('modules/ImageResize', ImageResize);

const toolbarOptions = [
  // 기존 toolbarOptions...
];

const ImageResizeOptions = { parchment: Quill.import('parchment') };

const Write = () => {
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [thumbnail, setThumbnail] = useState('');

  const handleChange = (value) => {
    setContent(value);
  };

  const handleFileSelect = (e) => {
    setThumbnail(e.target.files[0]);
  };

  const handleButtonClick = () => {
    document.getElementById('file-input').click(); // 숨겨진 파일 입력 클릭
  };

  const handleRemoveFile = () => {
    setThumbnail(''); // 선택한 파일 제거
    document.getElementById('file-input').value = ''; // 파일 입력 초기화
  };

  async function handleSave() {
    const results = await fetch('https://my-wiki.p-e.kr/api/board/write', {
      method: 'POST', // POST 메서드 사용
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrfToken
      },
      body: JSON.stringify({ 'title':title, 'content':content,'thumbnail':thumbnail }), // 제목과 본문을 JSON 형태로 전송
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
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
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
      <input 
        id="file-input" 
        type="file" 
        accept="image/*" 
        style={{ display: 'none' }} // 파일 입력 숨기기
        onChange={handleFileSelect} 
      />
      <button 
        className="thumbnail-button" 
        onClick={handleButtonClick}
      >
        썸네일 업로드
      </button>
      {thumbnail && (
        <div>
          <p>선택된 파일: {thumbnail.name}</p>
          <button 
            className="remove-button" 
            onClick={handleRemoveFile}
          >
            파일 제거
          </button>
        </div>
      )}
    </div>
  );
};

export default Write;
