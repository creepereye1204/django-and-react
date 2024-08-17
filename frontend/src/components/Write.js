import React, { useState } from 'react';
import ReactQuill ,{ Quill } from 'react-quill';
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

  [{ 'color': [] }, { 'background': [] }],          // 텍스트 색상 및 배경색 변경 기능
  [{ 'font': [] }],
  [{ 'align': [] }],
  ['link', 'image', 'video'],
  
  // 이미지 사이즈 조정 기능 추가
  

  ['clean']                                         
];
const ImageResizeOptions = {parchment: Quill.import('parchment')};

const Write = () => {
  const [text, setText] = useState('');

  const handleChange = (value) => {
    setText(value);
  };

 async function handleSave() {
  const results=await fetch('https://my-wiki.p-e.kr/api/baord/write', {

  })
 };

  return (
    <div className="editor">
      <input type='text'>제목:</input>
      <ReactQuill
        value={text}
        onChange={handleChange}
        modules={{
          toolbar: toolbarOptions,
          ImageResize: ImageResizeOptions
        }}
      />
      <button onClick={handleSave}>저장하기</button>
    </div>
  );
};

export default Write;
