import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // 스타일 임포트
import './Write.css'; // CSS 파일 임포트
const toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'],        // 텍스트 포맷팅
  ['blockquote', 'code-block'],                      // 인용 및 코드 블록
  [{ 'header': 1 }, { 'header': 2 }, { 'header': 3 }, { 'header': 4 }, { 'header': 5 }, { 'header': 6 }],  // 헤더
  [{ 'list': 'ordered'}, { 'list': 'bullet' }],    // 리스트
  [{ 'script': 'sub'}, { 'script': 'super' }],      // 첨자
  [{ 'indent': '-1'}, { 'indent': '+1' }],          // 들여쓰기
  [{ 'direction': 'rtl' }],                          // 텍스트 방향

  [{ 'size': ['small', false, 'large', 'huge'] }],  // 글자 크기
  [{ 'font': [] }],                                  // 글꼴 선택
  [{ 'color': [] }, { 'background': [] }],          // 텍스트 색상 및 배경색

  [{ 'align': [] }],                                 // 정렬 옵션
  ['link', 'image', 'video'],                        // 링크, 이미지, 비디오 삽입
  ['clean'],                                         // 포맷 초기화

  ['formula'],                                       // 수식 추가
  ['hr'],                                            // 수평선 추가
  ['table'],                                         // 테이블 추가
  ['emoji'],                                         // 이모지 삽입
  ['specialCharacters'],                             // 특수 문자 삽입
  ['clipboard'],                                     // 클립보드 기능
  ['paste', 'copy', 'cut'],                         // 붙여넣기, 복사, 잘라내기
  ['textColor', 'backgroundColor'],                  // 텍스트와 배경 색상 선택
  ['lineHeight'],                                    // 줄 간격 조정
  ['letterSpacing'],                                 // 글자 간격 조정
  ['textShadow'],                                    // 텍스트 그림자
  ['imageResize'],                                   // 이미지 크기 조정
  ['grid'],                                         // 그리드 기능
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
