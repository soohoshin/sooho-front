import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import useAsync from "../../api/api";
import { useForm } from "react-hook-form";
import axios from "axios";

const ProductDetail = ({ match, history }) => {
  const { productId } = match.params;
  const { register, handleSubmit, errors } = useForm();
  const env = process.env.REACT_APP_ENV || "DEV";
  const [defalutUrl, setDefalutUrl] = useState();

  const [productState] = useAsync("get", `/api/data/${productId}`);
  const { loading, data, error } = productState;

  const [commentState, refetch] = useAsync("post", "/api/comment", true);
  const onSubmit = async (data) => {
    const userData = refetch(data);
  };

  useEffect(() => {
    console.log(commentState);
    if (commentState.data) {
      if (commentState.data.success) {
        alert("complete");
        history.push("/product");
      } else {
        alert(commentState.data.message);
      }
    }
  }, [commentState]);

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
  if (data)
    return (
      <ContentBox>
        <div className="name">
          <span>상품명</span>
          <span>{data.name}</span>
        </div>
        <div className="info">
          <span>상품설명</span>
          <span>{data.description}</span>
        </div>
        <div className="price">
          <span>상품가격</span>
          <span>{data.price}</span>
        </div>
        <div className="img">
          <img
            style={{ width: "100%" }}
            src={`${defalutUrl}/${data.productImg}`}
            alt="productImg"
          />
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="hidden"
            ref={register({ required: true })}
            name="productId"
            value={productId}
          />
          {/* <input
            type="text"
            placeholder="ID"
            name="userId"
            ref={register({ required: true, maxLength: 15 })}
          /> */}
          <span>댓글</span>
          <textarea
            ref={register({ required: true, maxLength: 500 })}
            name="comment"
          ></textarea>
          <input type="submit" />
        </form>
        <div className="comment">
          <p className="title">댓글</p>
          {data.comment &&
            data.comment.map((comment) => (
              <pre className="comment-row" key={comment.id}>
                {comment.comment}
              </pre>
            ))}
        </div>
      </ContentBox>
    );
};

const ContentBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 500px;
  width: 100%;
  div {
    border-bottom: 1px solid #c6c6c6;
    width: 100%;
    padding: 10px 6px;

    span {
      &:first-child {
        display: inline-block;
        width: 100px;
      }
    }
  }
  form {
    width: 100%;
    display: flex;
    flex-direction: column;
    span {
      width: 100%;
      display: block;
      text-align: center;
      padding: 10px;
      box-sizing: border-box;
    }
    textarea {
      height: 200px;
      resize: none;
    }
    input[type="submit"] {
      height: 30px;
    }
  }
  .comment {
    .title {
      margin: 6px 0;
    }
    .comment-row {
      padding: 8px;
      border: 1px solid #c6c6c6;
    }
  }
`;

export default withRouter(ProductDetail);
