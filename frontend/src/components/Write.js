import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // 스타일 임포트
import './Write.css'; // CSS 파일 임포트

const Write = () => {
  const [text, setText] = useState('');

  const handleChange = (value) => {
    setText(value);
  };

  const handleSave = () => {
    // 저장 로직을 여기에 추가
    console.log("저장된 내용:", text);
  };

  return (
    <div className="editor">
      <ReactQuill
        value={text}
        onChange={handleChange}
        modules={{
          toolbar: [
            [{ header: [1, 2, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            ['link', 'image', 'video'], // 비디오 추가
            ['clean'], // 클리어 포맷 버튼
            ['code-block'], // 코드 블록 추가
            ['blockquote'], // 인용 추가
            [{ color: [] }, { background: [] }], // 텍스트 색상 및 배경색 선택
            [{ align: [] }], // 정렬 옵션
          ],
        }}
      />
      <button onClick={handleSave}>저장하기</button>
    </div>
  );
};

export default Write;
