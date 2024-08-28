import React, { useState, useEffect } from 'react';
import './SketchToImage.css'
const SketchToImage = () => {
  const [image, setImage] = useState(null);
  const [style, setStyle] = useState('');
  const [prompt, setPrompt] = useState('');
  const [negativePrompt, setNegativePrompt] = useState('');
  const [webSocket, setWebSocket] = useState(null);
  const styles = [
    '(스타일 없음)',
    '시네마틱',
    '3D 모델',
    '애니메이션',
    '디지털 아트',
    '사진',
    '픽셀 아트',
    '판타지 아트',
    '네온 펑크',
    '만화',
    '초현실주의',
    '인상주의',
    '큐비즘',
    '표현주의',
    '미래주의',
  ];
  useEffect(() => {
    const ws = new WebSocket('wss://my-wiki.p-e.kr/ws/api/sketch-to-image');

    ws.onopen = () => {
      console.log('웹소켓 연결됨');
    };

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data); // 수신한 메시지를 파싱
      
    };

    ws.onclose = () => {
      console.log('웹소켓 연결 종료');
    };

    setWebSocket(ws);

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
      };

      // 이미지가 존재하는 경우 Blob으로 변환 후 전송
      if (image) {
        const blob = await fetch(image).then(res => res.blob()); // Blob으로 변환
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64data = reader.result.split(',')[1]; // Base64 문자열 추출
          const finalMessage = {
            ...message,
            image: base64data, // 문자열 타입으로 전송할 데이터
          };
          webSocket.send(JSON.stringify(finalMessage)); // 웹소켓으로 메시지 전송
          
          resetFields();
        };
        reader.readAsDataURL(blob); // Blob을 Data URL로 변환
      } else {
        webSocket.send(JSON.stringify(message)); // 이미지 없이 메시지 전송
        
        resetFields();
      }
    } else {
      console.error('웹소켓이 열려 있지 않습니다.');
    }
  };

  const resetFields = () => {
    setStyle('');
    setPrompt('');
    setNegativePrompt('');
    setImage(null);
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
    <div className='client-container'>
      <h1 className='title'>SketchToImage</h1>
      {image ? <img src={image} alt='선택한 이미지' className='image' />:<h1 className='image'>이미지를 골라주세요</h1> }
      <div className='input-container'>
        <select
          value={style}
          onChange={(e) => setStyle(e.target.value)}
        >
          <option value='' disabled>스타일 선택</option>
          {styles.map((s, index) => (
            <option key={index} value={s}>{s}</option>
          ))}
        </select>
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
        
        <label htmlFor='image-upload' className='button'>
          <span>이미지 선택</span>
          <input
          id="image-upload"
          type='file'
          accept='image/*'
          onChange={handleImageChange}
          hidden={true}
        />
        </label>
        <button onClick={sendImageToServer} className='button'>전송</button>
      </div>
      
      
    </div>
  );
};

export default SketchToImage;
