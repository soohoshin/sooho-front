import React from "react";
import styled from "styled-components";

import List from "../components/product/list";

const Product = () => {
  return (
    <ProductContainer>
      <List />
    </ProductContainer>
  );
};

const ProductContainer = styled.div`
  padding: 300px 0;
`;

export default Product;
