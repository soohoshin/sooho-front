import React, { useRef, useEffect } from "react";
import { useWindowScroll, useWindowSize } from "react-use";
import styled, { css } from "styled-components";
import { useBreakpoint } from "../../context/global-context.js";

const TopComponent = () => {
  const { width, height } = useWindowSize();
  const breakpoint = useBreakpoint();
  return (
    <>
      <BannerWrap height={height} breakpoint={breakpoint}>
        <div className="content-box">
          <p className="content">Show me the money</p>
          <p className="title">OPERATION CWAL</p>
        </div>
      </BannerWrap>
    </>
  );
};

const BannerWrap = styled.div`
  width: 100%;
  ${(props) =>
    props.height &&
    css`
      height: ${props.height}px;
    `}
  ${(props) =>
    (props.breakpoint === "L" || props.breakpoint === "XL") &&
    props.height &&
    css`
      height: ${props.height + 120}px;
    `}
  background-image:url('/images/banner.jpg');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;

  .content-box {
    display: flex;
    ${(props) =>
      props.height &&
      css`
        height: ${props.height}px;
      `}
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    z-index: 15;
    color: #fff;
    text-shadow: 2px 2px 2px #000;

    .content {
      font-size: 16px;
      font-weight: 900;
      margin-bottom: 1rem;
    }

    .title {
      font-size: 38px;
    }
    ${(props) =>
      (props.breakpoint === "L" || props.breakpoint === "XL") &&
      css`
        .content {
          font-size: 56px;
        }

        .title {
          font-size: 70px;
        }
      `}
  }

  .img-box {
    position: relative;
    font-size: 0;

    .img-bg {
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      z-index: 10;
      background-color: rgba(0, 0, 0, 0.3);
    }
    img {
      width: 100%;
    }
  }
`;

export default TopComponent;
