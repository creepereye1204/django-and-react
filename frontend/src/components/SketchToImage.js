import React, { useState, useEffect } from 'react';

const SketchToImage = () => {
  const [image, setImage] = useState(null);
  const [style, setStyle] = useState('');
  const [prompt, setPrompt] = useState('');
  const [negativePrompt, setNegativePrompt] = useState('');
  const [chat, setChat] = useState([]); // 대화 내용을 저장할 상태
  const [webSocket, setWebSocket] = useState(null);

  useEffect(() => {
    // 웹소켓 연결 설정
    const ws = new WebSocket('wss://my-wiki.p-e.kr/ws/api/sketch-to-image');

    ws.onopen = () => {
      console.log('웹소켓 연결됨');
    };

    ws.onmessage = (event) => {
      const message = event.data;
      setChat((prevChat) => [...prevChat, message]); // 받은 메시지를 대화 내용에 추가
    };

    ws.onclose = () => {
      console.log('웹소켓 연결 종료');
    };

    setWebSocket(ws);

    // 컴포넌트 언마운트 시 웹소켓 연결 종료
    return () => {
      ws.close();
    };
  }, []);

  const sendImageToServer = async () => {
    if (webSocket && webSocket.readyState === WebSocket.OPEN) {
      const message = {
        style,
        prompt,
        negativePrompt,
        image, // 이미지 추가
      };
      webSocket.send(JSON.stringify(message)); // 웹소켓으로 메시지 전송
      setChat((prevChat) => [...prevChat, `나: ${JSON.stringify(message)}`]); // 클라이언트 메시지 추가
      setStyle(''); // 입력 필드 초기화
      setPrompt('');
      setNegativePrompt('');
      setImage(null); // 이미지 초기화
    } else {
      console.error('웹소켓이 열려 있지 않습니다.');
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result); // 이미지 데이터를 state에 저장
      };
      reader.readAsDataURL(file); // 파일을 데이터 URL로 읽기
    }
  };

  return (
    <div className='chat-container'>
      <h1 className='title'>SketchToImage</h1>
      <input
        type='text'
        value={style}
        onChange={(e) => setStyle(e.target.value)}
        placeholder='스타일 입력'
      />
      <input
        type='text'
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder='프롬프트 입력'
      />
      <input
        type='text'
        value={negativePrompt}
        onChange={(e) => setNegativePrompt(e.target.value)}
        placeholder='부정 프롬프트 입력'
      />
      <input
        type='file'
        accept='image/*'
        onChange={handleImageChange} // 이미지 변경 시 처리
      />
      <button onClick={sendImageToServer}>전송</button> {/* 버튼 클릭 시 메시지 전송 */}
      {image && <img src={image} alt='선택한 이미지' style={{ width: '100px', height: '100px' }} />} {/* 선택한 이미지 미리보기 */}
    </div>
  );
};

export default SketchToImage;
