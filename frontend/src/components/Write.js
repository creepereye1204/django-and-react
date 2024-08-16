import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // 스타일 임포트
import './Write.css'; // CSS 파일 임포트
const toolbarOptions = [
  //[{ 'font': [] }],
  [{ header: [1, 2, false] }],
  ['bold', 'italic', 'underline', 'strike', 'blockquote'],
  [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
  ['link', 'image'],
  [{ align: [] }, { color: [] }, { background: [] }], // dropdown with defaults from theme
  ['clean']
];

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
          toolbar: toolbarOptions,
        }}
      />
      <button onClick={handleSave}>저장하기</button>
    </div>
  );
};

export default Write;
