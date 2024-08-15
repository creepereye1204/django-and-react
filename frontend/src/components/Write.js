import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // 스타일 임포트
import './Write.css';
const Write = () => {
  const [text, setText] = useState('');

  const handleChange = (value) => {
    setText(value);
  };

  return (
    <div class="editor">
      <ReactQuill
        value={text}
        onChange={handleChange}
        modules={{
          toolbar: [
            [{ header: [1, 2, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            ['link', 'image'],
            ['clean'], // 클리어 포맷 버튼
          ],
        }}
      />
    </div>
  );
};

export default Write;