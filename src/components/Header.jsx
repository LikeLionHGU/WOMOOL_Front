import React, { useEffect, useRef } from "react";
import styled from "styled-components";

import headerLogo from "../assets/header-logo.svg";

function Header() {
  const headerRef = useRef(null);
  useEffect(() => {
    const scrollHandler = () => {
      const scrollLoc =
        document.documentElement.scrollTop || document.body.scrollTop;
      const element = headerRef.current;
      if (scrollLoc > 0) {
        element.classList.add("bg");
      } else {
        element.classList.remove("bg");
      }
    };
    document.addEventListener("scroll", scrollHandler);

    return () => document.removeEventListener("scroll", scrollHandler);
  }, []);

  return (
    <HeaderComp ref={headerRef}>
      <div>
        <HeaderImage src={headerLogo} />
        <HeaderMenus>
          <HeaderMenuBtn>ABOUT US</HeaderMenuBtn>
          <HeaderMenuBtn>LOGIN</HeaderMenuBtn>
        </HeaderMenus>
      </div>
    </HeaderComp>
  );
}

export default Header;

const HeaderComp = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  max-width: 750px;
  margin: auto;

  z-index: 99999;

  & > div {
    display: flex;
    justify-content: space-between;
    max-width: 652px;
    padding: 18px 16px;
    margin: auto;
  }

  transition: background-color 80ms linear;
  &.bg {
    background-color: rgba(255, 255, 255, 0.2);
    transition: background-color 200ms linear;
  }
`;

const HeaderImage = styled.img`
  max-width: 68px;
  padding-left: 25px;
  width: 9.067vw;
`;

const HeaderMenus = styled.div`
  font-family: "Times New Roman", sans-serif;
  display: flex;
`;

const HeaderMenuBtn = styled.div`
  padding: 15px 25px;
  font-size: 17px;

  @media (max-width: 750px) {
    font-size: 2.267vw;
  }

  @media (max-width: 574.46px) {
    font-size: 13px;
  }
`;
