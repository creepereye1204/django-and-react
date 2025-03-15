import React, { useEffect, useState } from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./Write.css";
import ImageResize from "quill-image-resize";
import { useNavigate } from "react-router-dom";

Quill.register("modules/ImageResize", ImageResize);

const toolbarOptions = [
  ["bold", "italic", "underline", "strike"],
  ["blockquote", "code-block"],
  [{ list: "ordered" }, { list: "bullet" }],
  [{ script: "sub" }, { script: "super" }],
  [{ indent: "-1" }, { indent: "+1" }],
  [{ direction: "rtl" }],
  [{ size: ["small", false, "large", "huge"] }],
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ color: [] }, { background: [] }],
  [{ font: [] }],
  [{ align: [] }],
  ["link", "image", "video"],
  ["clean"],
];

const ImageResizeOptions = { parchment: Quill.import("parchment") };

const Write = ({
  initialTitle,
  initialContent,
  initialThumbnail,
  board_id,
  onCancel,
}) => {
  const navigate = useNavigate();

  const [content, setContent] = useState(initialContent || "");
  const [title, setTitle] = useState(initialTitle || "");
  const [thumbnail, setThumbnail] = useState(initialThumbnail || null);
  const [defaultThumbnail, setDefaultThumbnail] = useState(-1);

  useEffect(() => {
    setContent(initialContent || "");
    setTitle(initialTitle || "");
    setThumbnail(initialThumbnail || null);
  }, [initialContent, initialTitle, initialThumbnail]);

  const handleChange = (value) => {
    setContent(value);
  };

  const handleFileSelect = (e) => {
    setThumbnail(e.target.files[0]);
  };

  const handleButtonClick = () => {
    document.getElementById("file-input").click();
  };

  const handleRemoveFile = () => {
    setThumbnail(null);
    document.getElementById("file-input").value = "";
  };

  const handleNoThumbnailButtonClick = () => {
    setDefaultThumbnail(-defaultThumbnail);
  };

  async function write() {
    const formData = new FormData();

    if (thumbnail instanceof File && thumbnail.type.startsWith("image/")) {
      formData.append("thumbnail", thumbnail);
    }
    formData.append("default_thumbnail", defaultThumbnail);
    formData.append("title", title);
    formData.append("content", content);
    formData.append("board_id", board_id); // board_id 추가
    const url = board_id
      ? "https://my-wiki.p-e.kr/api/board/update"
      : "https://my-wiki.p-e.kr/api/board/write";
    const results = await fetch(url, {
      method: "POST",
      headers: {
        "X-CSRFToken": csrfToken,
      },
      body: formData,
    });

    if (results.ok) {
      console.log("저장 성공");
      alert("저장 성공!");
      navigate(-1);
    } else {
      alert("저장 실패");
    }
  }

  async function handleSave() {
    if (title && content) await write();
    else {
      const empty = [];
      if (!title) empty.push("제목");
      if (!content) empty.push("본문");
      alert(`${empty.join(", ")}을(를) 입력하세요.`);
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
        <button onClick={onCancel}>취소하기</button> {/* 취소 버튼 추가 */}
      </div>
      <ReactQuill
        value={content}
        onChange={handleChange}
        modules={{
          toolbar: toolbarOptions,
          ImageResize: ImageResizeOptions,
        }}
      />
      <div className="thumbnail-container">
        <input
          id="file-input"
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={handleFileSelect}
        />
        <button className="thumbnail-button" onClick={handleButtonClick}>
          썸네일 업로드
        </button>
        {thumbnail && (
          <button className="remove-button" onClick={handleRemoveFile}>
            {thumbnail.name}:파일 제거
          </button>
        )}
        <button
          className="thumbnail-button"
          onClick={handleNoThumbnailButtonClick}
        >
          썸네일 사용 안함
        </button>
      </div>
    </div>
  );
};

export default Write;
