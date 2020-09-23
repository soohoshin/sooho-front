import React, { useRef, useEffect } from "react";
import styled, { css } from "styled-components";
import { NavLink } from "react-router-dom";

export const LinkButton = styled(NavLink)`
  display: inline-block;
  padding: 14px;
  min-width: 130px;
  position: relative;
  vertical-align: middle;
  font-size: 16px;
  font-weight: 600;
  letter-spacing: -0.025em;
  line-height: 1;
  border: 1px solid #000;
  border-radius: 0px;
  background: transparent;
  overflow: hidden;
  box-sizing: border-box;
  text-align: center;
  transition: color 0.55s cubic-bezier(0.52, 0.08, 0.18, 1);

  span {
    position: sticky;
    z-index: 15;
  }
  &::before {
    content: "";
    display: block;
    width: 120%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    transform-origin: right top;
    transform: translateX(-101%) skewX(-17.62deg);
    transition: transform 0.55s cubic-bezier(0.52, 0.08, 0.18, 1);
    backface-visibility: hidden;
    background: #222;
    z-index: 10;
  }
  &:hover {
    color: #fff !important;

    &:before {
      transform: translateX(0) skewX(-17.62deg);
      transform-origin: left top;
    }
  }

  ${(props) =>
    props.color === "white" &&
    css`
      border: 1px solid #fff;
      &::before {
        background: #fff;
      }
      &:hover {
        color: #222 !important;
      }
    `}
`;
