import React, { useRef, useEffect, useState } from "react";
import axios from "axios";
import { useWindowScroll } from "react-use";
import styled, { css } from "styled-components";
import { LinkButton } from "../../styled/common-obj.js";
import { useBreakpoint } from "../../context/global-context.js";

const MiddleComponent = () => {
  const { x: windowX, y: windowY } = useWindowScroll();
  const breakpoint = useBreakpoint();

  return (
    <MiddleContainer scrolltop={windowY} breakpoint={breakpoint}>
      <div className="middle-title">BUSINESS</div>
      <div className="wrap">
        <div className="middle-divion-row">
          <figure className="main_business_img">
            <video
              src="https://www.ka.co.kr/wp-content/themes/kai/images/main/fluid-2.mp4"
              poster="https://www.ka.co.kr/wp-content/themes/kai/images/main/main-business-01.jpg?v1.2"
              loop="1"
              autoPlay="1"
            ></video>
          </figure>
          <div className="middle-content-box">
            <div className="title">SOOHO</div>
            <div className="info">
              We produce high-purity, high-quality ethanol based on 30 years of
              accumulated expertise.
            </div>
            <LinkButton to="/">
              <span>VIEW MORE</span>
            </LinkButton>
          </div>
        </div>

        <div className="middle-divion-row second">
          <figure className="main_business_img second">
            <img src="/images/middleimg1.jpg" alt="middleImg" />
          </figure>
          <div className="middle-content-box">
            <div className="title">SOOHO</div>
            <div className="info">
              We produce high-purity, high-quality ethanol based
              <br /> on 30 years of accumulated expertise.
            </div>
            {breakpoint === "L" || breakpoint === "XL" ? (
              <LinkButton to="/" color="white">
                <span>VIEW MORE</span>
              </LinkButton>
            ) : (
              <LinkButton to="/">
                <span>VIEW MORE</span>
              </LinkButton>
            )}
          </div>
        </div>
      </div>
      <div className="color-content-box">
        <div className="title">SOOHO</div>
        <div className="info">
          We produce high-purity, high-quality ethanol based on 30 years of
          accumulated expertise.
        </div>
        <LinkButton to="/" color="white">
          <span>VIEW MORE</span>
        </LinkButton>
      </div>
      {(breakpoint === "L" || breakpoint === "XL") && (
        <div className="main_business_img absolute"></div>
      )}
    </MiddleContainer>
  );
};

const MiddleContainer = styled.div`
  padding: 7% 0 0;
  display: flex;
  flex-direction: column;
  position: relative;
  margin: 0 auto;
  max-width: 1800px;

  ${(props) =>
    (props.breakpoint === "L" || props.breakpoint === "XL") &&
    css`
      padding: 0 50px;
    `}

  .wrap {
    margin: 0 15px;
    position: relative;

    ${(props) =>
      (props.breakpoint === "L" || props.breakpoint === "XL") &&
      css`
        max-width: 1200px;
        width: 100%;
        margin: 0 auto;
        box-sizing: border-box;

        .middle-divion-row {
          display: flex;
          align-items: center;
          flex-direction: row-reverse;
          margin-top: -110px;

          &.second {
            flex-direction: row;
            .middle-content-box {
              margin-left: auto;
              color: #fff;
            }
          }
        }
      `}

    .main_business_img {
      height: 0;
      padding-top: 60%;
      max-width: 1700px;
      overflow: hidden;
      position: relative;
      margin-top: 16px;

      video,
      img {
        position: absolute;
        width: 100%;
        top: -20%;
        left: 0;
      }
      ${(props) =>
        (props.breakpoint === "L" || props.breakpoint === "XL") &&
        css`
          width: 700px;
          height: 850px;
          padding: 0;
          margin-top: 0px;

          video,
          img {
            width: 100%;
            top: 0;
          }
        `}
    }

    .middle-content-box {
      margin-top: 16px;

      .title {
        padding: 5px 0;
        font-size: 28px;
      }

      .info {
        font-size: 14px;
        line-height: 1.6;
        padding-right: 30px;
      }
    }

    a {
      margin-top: 16px;
    }
  }
  .middle-title {
    font-size: 28px;
    text-align: center;
    ${(props) =>
      (props.breakpoint === "L" || props.breakpoint === "XL") &&
      css`
        font-size: 56px;
        max-width: 1200px;
        width: 100%;
        margin: 0 auto;
        padding-top: 50px;
        text-align: left;
        position: absolute;
        top: 130px;
        left: 0;
        right: 0;
        box-sizing: border-box;
      `}
  }

  .color-content-box {
    margin-top: 16px;
    background-image: url("/images/middleimg3.jpg");
    background-position: center right;
    background-repeat: no-repeat;
    background-size: contain;
    background-color: #000;
    color: white;
    padding: 12% 20px;

    .title {
      padding: 5px 0;
      font-size: 28px;
    }

    .info {
      font-size: 14px;
      line-height: 1.6;
    }
    a {
      margin-top: 16px;
    }
    ${(props) =>
      (props.breakpoint === "L" || props.breakpoint === "XL") &&
      css`
        width: 100%;
        padding: 245px 50px 194px;
        box-sizing: border-box;
        margin-top: -50px;
      `}
  }

  .main_business_img.absolute {
    position: absolute;
    top: 0;
    right: 50px;
    z-index: -1;
    max-width: 952px;
    height: 1325px;
    background: url(/images/middleimg2.jpg) no-repeat center center;
    background-size: cover;
    top: 200px;
    width: 56%;
  }
`;

export default MiddleComponent;
