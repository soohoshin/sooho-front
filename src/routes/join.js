import React from "react";
import styled, { css } from "styled-components";
import JoinForm from "../components/join/join-form.js";

const Join = ({ history }) => {
  return (
    <JoinContainer>
      <JoinForm />
    </JoinContainer>
  );
};

const JoinContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;
export default Join;
