import React from "react";
import styled from "styled-components";
import ProductDetail from "../components/detail/detail";

const Detail = () => {
  return (
    <DedailContainer>
      <ProductDetail />
    </DedailContainer>
  );
};

const DedailContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding-top: 300px;
  padding-bottom: 300px;
`;
export default Detail;
