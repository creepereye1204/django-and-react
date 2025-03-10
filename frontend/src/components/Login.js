import React, { Component } from "react";
import styled from "styled-components";

const Style = styled.div`
  form {
    position: absolute;
    top: 30px;
    left: 50%;
  }
`;

class Login extends Component {
  handleSubmit = (event) => {
    event.preventDefault(); // 기본 폼 제출 동작 방지
    const formData = new FormData(event.target); // 폼 데이터를 가져옴

    // ti
    fetch("/api/login", {
      // API 호출
      method: "POST",
      headers: {
        "X-CSRFToken": csrfToken,
      },
      body: formData,
    }).then((response) => {
      if (response.ok) {
        console.log(response.ok);
      }
    });
  };

  render() {
    return (
      <Style>
        <form
          onSubmit={this.handleSubmit}
          method="post"
          enctype="multipart/form-data"
        >
          <h2>Login Form</h2>
          <p>Please enter your credentials to login.</p>
          <label>
            Username:
            <input type="text" name="user_id" />
          </label>
          <label>
            Password:
            <input type="password" name="password" />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </Style>
    );
  }
}

export default Login;
