import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import styled, { css } from "styled-components";
import { withRouter } from "react-router-dom";
import useAsync from "../../api/api";

const JoinForm = ({ history }) => {
  const { register, handleSubmit, errors } = useForm();
  const [state, refetch] = useAsync("post", "/api/join", true);
  const onSubmit = async (data) => {
    const userData = refetch(data);
  };

  useEffect(() => {
    console.log(state);
    if (state.data) {
      if (state.data.success) {
        alert("complete");
        history.push("/login");
      } else {
        alert(state.data.message);
      }
    }
  }, [state]);

  console.log(errors);
  return (
    <JoinFormBox onSubmit={handleSubmit(onSubmit)}>
      <h1>회원가입</h1>
      <input
        type="text"
        placeholder="ID"
        name="userId"
        ref={register({ required: true, maxLength: 15 })}
        style={errors.userId && { border: "solid red 1px" }}
      />
      {errors.userId && "userId is error"}
      <input
        type="password"
        placeholder="password"
        name="password"
        ref={register({ required: true, maxLength: 100, minLength: 8 })}
        style={errors.password && { border: "solid red 1px" }}
      />
      {errors.password && "password is error"}
      <input
        type="text"
        placeholder="이름"
        name="userName"
        ref={register({ required: true, maxLength: 10 })}
        style={errors.userName && { border: "solid red 1px" }}
      />
      {errors.userName && "userName is error"}

      <input type="submit" />
    </JoinFormBox>
  );
};

const JoinFormBox = styled.form`
  display: flex;
  flex-direction: column;
  min-width: 400px;
  margin: 0 auto;
  input {
    padding: 10px 0;
    margin-bottom: 10px;
    &:focus {
      outline: none;
    }
  }
  h1 {
    margin: 16px 0;
    text-align: center;
  }
`;
export default withRouter(JoinForm);
