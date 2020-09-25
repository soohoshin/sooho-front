import React, { useRef, useEffect, useState, useReducer } from "react";
import styled from "styled-components";
import useAsync from "../../api/api";
import { NavLink } from "react-router-dom";

import { withRouter } from "react-router-dom";

const List = ({ history }) => {
  //   api test
  const [state, refetch] = useAsync("get", "/api/data/all");
  const env = process.env.REACT_APP_ENV || "DEV";
  const [defalutUrl, setDefalutUrl] = useState();
  const { loading, data, error } = state;

  useEffect(() => {
    if (error) {
      alert("로그인 해주세요  !!");
      history.push("/");
    }
  }, [error, history]);

  useEffect(() => {
    if (env === "PROD") {
      setDefalutUrl(
        "http://ec2-3-133-112-140.us-east-2.compute.amazonaws.com:9981/"
      );
    } else {
      setDefalutUrl("http://localhost:9981");
    }
    console.log(defalutUrl);
  }, [env]);

  if (loading) return <div>loading</div>;
  if (error) return <div>error!!!!!!!!!!!!!</div>;
  if (!data) return null;

  return (
    <>
      <h1 style={{ textAlign: "center", margin: "16px" }}>상품목록</h1>
      <ProductBox>
        {data &&
          data.map((product) => (
            <ProductRow key={product.productId}>
              <div>
                <span>상품명</span>
                <span>{product.name}</span>
              </div>
              <div>
                <span>가격</span>
                <span>{product.price}</span>
              </div>
              <div>
                <span>설명</span>
                <span>{product.description}</span>
              </div>
              <div>
                {defalutUrl && (
                  <img
                    style={{ width: "200px" }}
                    src={`${defalutUrl}/${product.productImg}`}
                    alt="productImg"
                  />
                )}
              </div>
              <div>
                <span style={{ margin: "10px", fontWeight: "bold" }}>
                  최신 댓글 3개
                </span>
                <ul>
                  {product.comment.length ? (
                    product.comment.map((data) => (
                      <li key={data.id}>{data.comment}</li>
                    ))
                  ) : (
                    <li style={{ color: "red" }}>댓글 없습니다.</li>
                  )}
                </ul>
              </div>
              <NavLink to={`/detail/${product.productId}`}>자세히보기</NavLink>
            </ProductRow>
          ))}
      </ProductBox>
    </>
  );
};
const ProductBox = styled.ul`
  max-width: 500px;
  width: 100%;
  margin: 0 auto;
  border: 1px solid #c6c6c6;
`;

const ProductRow = styled.li`
  border-bottom: 1px solid #c6c6c6;

  > div {
    padding: 10px;

    span {
      &:first-child {
        width: 100px;
        display: inline-block;
      }
    }
  }
  &:last-child {
    border: none;
  }

  a {
    display: inline-block;
    border-radius: 10px;
    padding: 8px 10px;
    background-color: greenyellow;
    margin: 10px;
    font-weight: bold;
  }
  ul {
    li {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      width: 100%;
    }
  }
`;

export default withRouter(List);
