// import React, { useEffect, useState } from 'react';
// import ReactQuill, { Quill } from 'react-quill';
// import 'react-quill/dist/quill.snow.css'; // 스타일 임포트
// import './Write.css'; // CSS 파일 임포트
// import ImageResize from 'quill-image-resize';
// import { useNavigate } from "react-router-dom";

// Quill.register('modules/ImageResize', ImageResize);

// const toolbarOptions = [
//   ['bold', 'italic', 'underline', 'strike'],        
//   ['blockquote', 'code-block'],               
//   [{ 'list': 'ordered'}, { 'list': 'bullet' }],
//   [{ 'script': 'sub'}, { 'script': 'super' }],      
//   [{ 'indent': '-1'}, { 'indent': '+1' }],          
//   [{ 'direction': 'rtl' }],                         
//   [{ 'size': ['small', false, 'large', 'huge'] }],  
//   [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
//   [{ 'color': [] }, { 'background': [] }],
//   [{ 'font': [] }],
//   [{ 'align': [] }],
//   ['link', 'image', 'video'],
//   ['clean']                                         
// ];

// const ImageResizeOptions = { parchment: Quill.import('parchment') };

// const Write = ({initialTitle='',initialContent='',initialThumbnail='',id=null}) => {
 

  
//   const navigate = useNavigate();
  
//   const [content, setContent] = useState(initialContent);
//   const [title, setTitle] = useState(initialTitle);
//   const [thumbnail, setThumbnail] = useState(initialThumbnail);


//   const handleChange = (value) => {
//     setContent(value);
    
//   };

//   const handleFileSelect = (e) => {
//     setThumbnail(e.target.files[0]);
    
//   };

//   const handleButtonClick = () => {
//     document.getElementById('file-input').click(); // 숨겨진 파일 입력 클릭
//   };

//   const handleRemoveFile = () => {
//     setThumbnail(''); // 선택한 파일 제거
//     document.getElementById('file-input').value = ''; // 파일 입력 초기화

//   };

//   async function write(){
//     const formData = new FormData();
    
//     if (thumbnail instanceof File && thumbnail.type.startsWith('image/')) formData.append('thumbnail', thumbnail);
    
    
//     formData.append('title', title); 
//     formData.append('content', content); 
//     formData.append('id', id); // id 값이 있으면 update, 없으면 write
//     const url=id?'https://my-wiki.p-e.kr/api/board/update':'https://my-wiki.p-e.kr/api/board/write'
//     const results = await fetch(url, {
//       method: 'POST', // POST 메서드 사용
//       headers: {
//         'X-CSRFToken': csrfToken
//       },
//       body: formData, // 제목과 본문을 JSON 형태로 전송
//     });

//     if (results.ok) {
//       console.log('저장 성공');
//       alert('저장 성공!');
//       if(!id)navigate(-1);
// // 이전 페이지로 이동
//     } else {
//       alert(results.error, ' 저장 실패');
      
//     }
//   }
//   async function handleSave() {
//     if (title && content) await write();
//   else{
//     const empty=[];
//     if(!title) empty.push('제목');
//     if(!content) empty.push('본문');
//     alert(`${empty.join(', ')}을(를) 입력하세요.`);
//   }
//   };
//   return (
//     <div className="editor">
//       <div className="input">
//         <input 
//           className="title-input"
//           type="text" 
//           placeholder="제목을 입력하세요" 
//           value={title} 
//           onChange={(e) => setTitle(e.target.value)} 
//         />
//         <button onClick={handleSave}>저장하기</button>
//       </div>
//       <ReactQuill
//         value={content}
//         onChange={handleChange}
//         modules={{
//           toolbar: toolbarOptions,
//           ImageResize: ImageResizeOptions
//         }}
//       />
//       <div className='thumbnail-container'>
//         <input 
//           id="file-input" 
//           type="file" 
//           accept="image/*" 
//           style={{ display: 'none' }} // 파일 입력 숨기기
//           onChange={handleFileSelect} 
//         />
//         <button 
//           className="thumbnail-button" 
//           onClick={handleButtonClick}
//         >
//           썸네일 업로드
//         </button>
//         {thumbnail && (
            
//           <button 
//             className="remove-button" 
//             onClick={handleRemoveFile}
//           >
//             {thumbnail.name}:파일 제거
//           </button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Write;
import React, { useEffect, useState } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // 스타일 임포트
import './Write.css'; // CSS 파일 임포트
import ImageResize from 'quill-image-resize';
import { useNavigate } from "react-router-dom";

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

const Write = ({ initialTitle = '', initialContent = '', initialThumbnail = '', id = null }) => {
  const navigate = useNavigate();
  const [content, setContent] = useState(initialContent);
  const [title, setTitle] = useState(initialTitle);
  const [thumbnail, setThumbnail] = useState(initialThumbnail);
  const [embeddedFiles, setEmbeddedFiles] = useState([]);

  const handleChange = (value) => {
    setContent(value);
  };

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    files.forEach(file => embedFile(file));
  };

  const embedFile = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const base64Data = e.target.result;
      const fileId = Date.now(); // 고유 ID 생성
      setEmbeddedFiles(prev => [...prev, { id: fileId, name: file.name, data: base64Data }]);
      setContent(prevContent => `${prevContent}<img src="${base64Data}" alt="${file.name}" />`);
    };
    reader.readAsDataURL(file);
  };

  const handleButtonClick = () => {
    document.getElementById('file-input').click();
  };

  const handleRemoveFile = (id) => {
    setEmbeddedFiles(prev => prev.filter(file => file.id !== id));
    setContent(prevContent => prevContent.replace(/<img src="[^"]+" alt="[^"]+" \/>/, '')); // 첫 번째 이미지 제거
  };

  async function write() {
    const formData = new FormData();

    if (thumbnail instanceof File && thumbnail.type.startsWith('image/')) formData.append('thumbnail', thumbnail);

    formData.append('title', title);
    formData.append('content', content);
    formData.append('id', id); // id 값이 있으면 update, 없으면 write
    const url = id ? 'https://my-wiki.p-e.kr/api/board/update' : 'https://my-wiki.p-e.kr/api/board/write';
    
    const results = await fetch(url, {
      method: 'POST', // POST 메서드 사용
      headers: {
        'X-CSRFToken': csrfToken
      },
      body: formData, // 제목과 본문을 JSON 형태로 전송
    });

    if (results.ok) {
      console.log('저장 성공');
      alert('저장 성공!');
      if (!id) navigate(-1);
    } else {
      alert('저장 실패');
    }
  }

  async function handleSave() {
    if (title && content) await write();
    else {
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
          ImageResize: ImageResizeOptions
        }}
        onDrop={(e) => {
          e.preventDefault();
          const files = e.dataTransfer.files;
          if (files.length) {
            handleFileSelect({ target: { files } });
          }
        }}
      />
      <div className='thumbnail-container'>
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
          <button
            className="remove-button"
            onClick={() => handleRemoveFile(thumbnail.id)}
          >
            {thumbnail.name}: 파일 제거
          </button>
        )}
      </div>
      <div className="embedded-files">
        {embeddedFiles.map(file => (
          <div key={file.id}>
            <a href={file.data} download={file.name}>{file.name} 다운로드</a>
            <button onClick={() => handleRemoveFile(file.id)}>제거</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Write;
