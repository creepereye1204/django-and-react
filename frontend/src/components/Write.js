import React, { useEffect, useState } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './Write.css';
import ImageResize from 'quill-image-resize';
import { useNavigate } from "react-router-dom";

Quill.register('modules/ImageResize', ImageResize);

const toolbarOptions = [
  // 툴바 옵션...
];

const Write = ({initialTitle='', initialContent='', initialThumbnail='', id=null}) => {
  const navigate = useNavigate();
  const [content, setContent] = useState(initialContent);
  const [title, setTitle] = useState(initialTitle);
  const [thumbnail, setThumbnail] = useState(initialThumbnail);
  const [formData, setFormData] = useState(new FormData());

  useEffect(() => {
    // 제목과 내용을 formData에 추가
    formData.set('title', title);
    formData.set('content', content);
    if (thumbnail) {
      formData.set('thumbnail', thumbnail);
    }
    setFormData(formData); // 상태 업데이트
  }, [title, content, thumbnail]);

  const handleChange = (value) => {
    setContent(value);
  };

  const handleFileSelect = (e) => {
    setThumbnail(e.target.files[0]);
  };

  const handleButtonClick = () => {
    document.getElementById('file-input').click();
  };

  const handleRemoveFile = () => {
    setThumbnail(''); 
    document.getElementById('file-input').value = '';
  };

  async function write() {
    const url = id ? 'https://my-wiki.p-e.kr/api/board/update' : 'https://my-wiki.p-e.kr/api/board/write';
    
    const results = await fetch(url, {
      method: 'POST',
      headers: {
        'X-CSRFToken': csrfToken
      },
      body: formData,
    });

    if (results.ok) {
      alert('저장 성공!');
      if (!id) navigate(-1);
    } else {
      console.error('저장 실패');
    }
  }

  async function handleSave() {
    if (title && content) {
      await write();
    } else {
      const empty = [];
      if (!title) empty.push('제목');
      if (!content) empty.push('본문');
      alert(`${empty.join(', ')}을(를) 입력하세요.`);
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
          ImageResize: {}
        }}
      />
      <div className='thumbnail-container'>
        <input 
          id="file-input" 
          type="file" 
          accept="image/*" 
          style={{ display: 'none' }} 
          onChange={handleFileSelect} 
        />
        <button 
          className="thumbnail-button" 
          onClick={handleButtonClick}
        >
          썸네일 업로드
        </button>
        {thumbnail && (
          <button 
            className="remove-button" 
            onClick={handleRemoveFile}
          >
            {thumbnail.name}:파일 제거
          </button>
        )}
      </div>
    </div>
  );
};

export default Write;
