import React, { useRef, useEffect } from "react";
import { useCookie } from "react-use";
import { withRouter } from "react-router-dom";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import axios from "axios";
import { useLogin } from "../../util";

const LoginForm = ({ history }) => {
  const setLogin = useLogin();
  const [value, updateCookie, deleteCookie] = useCookie("user");
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = async (data) => {
    const responsive = await axios.post(
      "http://localhost:9981/api/login",
      data
    );
    if (responsive.data.success) {
      alert("complete");
      setLogin({
        isOurLogin: true,
        userId: responsive.data.userId,
        userName: responsive.data.userName,
      });
      updateCookie(responsive.data.token);
      console.log(responsive.data);
      history.push("/");
    } else {
      alert(responsive.data.reason);
    }
  };
  return (
    <LoginFormBox onSubmit={handleSubmit(onSubmit)}>
      <h1>로그인</h1>
      <input
        type="text"
        placeholder="ID"
        name="userId"
        ref={register({ required: true, maxLength: 15 })}
      />
      <input
        type="password"
        placeholder="password"
        name="password"
        ref={register({ required: true, maxLength: 100 })}
      />

      <input type="submit" />
    </LoginFormBox>
  );
};

const LoginFormBox = styled.form`
  display: flex;
  flex-direction: column;
  min-width: 400px;
  margin: 0 auto;
  input {
    padding: 10px 0;
    margin-bottom: 10px;
  }
  h1 {
    margin: 16px 0;
    text-align: center;
  }
`;
export default withRouter(LoginForm);
