import React, { useEffect } from "react";
import LoginForm from "../components/login/login-form";
import styled from "styled-components";

const Login = () => {
  return (
    <LoginContainer>
      <LoginForm />
    </LoginContainer>
  );
};

const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export default Login;
