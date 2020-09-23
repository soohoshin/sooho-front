import React, { useRef, useEffect, useState } from "react";
import { useWindowScroll, useAudio } from "react-use";
import styled, { css, keyframes } from "styled-components";
import { NavLink, withRouter } from "react-router-dom";
import {
  useBreakpoint,
  useUserInfoShared,
} from "../../context/global-context.js";
import { MdMenu, MdClear } from "react-icons/md";
import { useCookie } from "react-use";
import { useLogin } from "../../util";

const LayoutComponent = ({ children, history }) => {
  const { x: windowX, y: windowY } = useWindowScroll();
  const breakpoint = useBreakpoint();
  const [userInfoData] = useUserInfoShared();
  const [sideMenuState, setSideMenuState] = useState(false);
  const [value, updateCookie, deleteCookie] = useCookie("user");
  const setLogin = useLogin();

  // useEffect(() => {
  //   console.log(userInfoData);
  //   console.log(windowY);
  // }, [windowY, userInfoData]);

  return (
    <LayoutContainer state={sideMenuState}>
      <Header scrolltop={windowY} breakpoint={breakpoint}>
        <div className="header-wrap">
          <span>LOGO</span>
          {breakpoint === "L" || breakpoint === "XL" ? (
            <>
              <nav>
                <StyledNavLink to="/product">PRODUCT</StyledNavLink>
                <StyledNavLink to="/about">BUSINESS</StyledNavLink>
                <StyledNavLink to="/rank">RIGHT WAY</StyledNavLink>
                <StyledNavLink to="/mypage">CAREERS</StyledNavLink>
              </nav>
              <nav>
                {userInfoData.isOurLogin ? (
                  <>
                    <span>{userInfoData.userName}님 안녕하세요</span>
                    <button
                      type="button"
                      onClick={() => {
                        deleteCookie();
                        setLogin({
                          isOurLogin: false,
                          userId: null,
                          userName: null,
                        });
                        history.push("/");
                      }}
                    >
                      LogOut
                    </button>
                  </>
                ) : (
                  <>
                    <NavLink to="/join">회원가입 </NavLink>
                    <NavLink to="/login">로그인 </NavLink>
                  </>
                )}
              </nav>
            </>
          ) : (
            <button type="button" onClick={() => setSideMenuState(true)}>
              <MdMenu size="2rem" />
            </button>
          )}
        </div>
      </Header>
      {children}
      {sideMenuState && (
        <>
          <SideMenu state={sideMenuState}>
            <button type="button" onClick={() => setSideMenuState(false)}>
              <MdClear size="2rem" />
            </button>
            side menu
          </SideMenu>
          <SideMenuBackground
            state={sideMenuState}
            onClick={() => setSideMenuState(false)}
          />
        </>
      )}
    </LayoutContainer>
  );
};

const backgroundAni = keyframes`
0%{
  opacity: 0;

}
100%{
      opacity: 0.8;
}
`;
const SideMenuBackground = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  background-color: #000;
  width: 100%;
  height: 100%;
  z-index: 900;
  transition: opacity 2000ms, display 3000ms;

  ${(props) =>
    props.state &&
    css`
      animation: ${backgroundAni} 0.2s alternate;
    `}
`;

const sidemenuAni = keyframes`
0%{
  transform: translateX(100%);

}
100%{
  transform: translateX(0);
}
`;

const SideMenu = styled.div`
  width: 320px;
  height: 100%;
  background-color: #fff;
  position: fixed;
  right: 0;
  top: 0;
  z-index: 1000;
  transition: transform 300ms;
  ${(props) =>
    props.state &&
    css`
      animation: ${sidemenuAni} 0.3s alternate;
    `}

  button.close {
  }
`;

const Header = styled.header`
  display: flex;
  width: 100%;
  z-index: 500;
  width: 100%;
  height: 90px;
  position: fixed;
  top: 20px;
  left: 0;
  padding: 0 90px;
  box-sizing: border-box;
  transition: height 300ms, top 290ms, box-shadow 400ms, padding 300ms;

  ${(props) =>
    (props.breakpoint === "S" || props.breakpoint === "XS") &&
    css`
      top: 0px;
      left: 0;
      padding: 0;
    `}

  .header-wrap {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    background-color: #fff;
    padding: 0 50px;
    box-sizing: border-box;

    nav {
      height: 100%;
      display: flex;
      align-items: center;

      button {
        display: inline-flex;
        align-items: center;
        justify-content: center;
      }

      button + button {
        border-left: 1px solid #000;
      }
    }

    ${(props) =>
      (props.breakpoint === "S" || props.breakpoint === "XS") &&
      css`
        background-color: transparent;
        padding: 0 10px;
        color: #fff;
        height: 75px;
        transition: background-color 300ms;
        button {
          color: #fff;
        }

        ${(props) =>
          props.scrolltop > 0 &&
          css`
            background-color: #fff;
            color: #000;
            button {
              color: #000;
            }
          `}
      `}
  }

  ${(props) =>
    props.scrolltop > 100 &&
    css`
      padding: 0;
      height: 75px;
      top: 0;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12);
    `}
`;

const LayoutContainer = styled.div`
  ${(props) =>
    props.state &&
    css`
      overflow: hidden;
      height: 100vh;
    `}
`;

const StyledNavLink = styled(NavLink)`
  padding: 0px 32.5px;
  height: 100%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: 900;
`;

export default withRouter(LayoutComponent);
