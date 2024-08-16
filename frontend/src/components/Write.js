import React, { useState } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './Write.css';
import ImageResize from 'quill-image-resize';

Quill.register('modules/ImageResize', ImageResize);

const toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'],
  ['blockquote', 'code-block'],
  [{ 'list': 'ordered' }, { 'list': 'bullet' }],
  [{ 'script': 'sub' }, { 'script': 'super' }],
  [{ 'indent': '-1' }, { 'indent': '+1' }],
  [{ 'direction': 'rtl' }],
  [{ 'size': ['small', false, 'large', 'huge'] }],
  [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
  [{ 'color': [] }, { 'background': [] }],
  [{ 'font': [] }],
  [{ 'align': [] }],
  ['link', 'image', 'video'],
  ['clean']
];

const Write = () => {
  const [text, setText] = useState('');

  const handleChange = (value) => {
    setText(value);
  };

  const handleSave = () => {
    console.log("저장된 내용:", text);
  };

  const insertVideo = () => {
    const url = prompt("비디오 URL을 입력하세요:");
    if (url) {
      const videoHTML = `<div class="video-container"><iframe src="${url}" frameborder="0" allowfullscreen></iframe></div>`;
      const quill = this.reactQuillRef.getEditor(); // Quill 인스턴스 가져오기
      const range = quill.getSelection(true);
      quill.insertEmbed(range.index, 'video', videoHTML);
      quill.setSelection(range.index + 1); // 커서 위치 설정
    }
  };

  return (
    <div className="editor">
      <ReactQuill
        ref={(el) => { this.reactQuillRef = el }}
        value={text}
        onChange={handleChange}
        modules={{
          toolbar: {
            container: toolbarOptions,
            handlers: {
              video: insertVideo // 비디오 삽입 핸들러 추가
            }
          },
          ImageResize: {}
        }}
      />
      <button onClick={handleSave}>저장하기</button>
      <style jsx>{`
        .video-container {
          position: relative;
          padding-bottom: 56.25%; /* 16:9 비율 */
          height: 0;
          overflow: hidden;
        }
        .video-container iframe {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }
      `}</style>
    </div>
  );
};

export default Write;
