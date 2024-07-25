import React from "react";
import styled from "styled-components";

import headerLogo from "../assets/header-logo.svg";

function Header() {
  return (
    <HeaderComp>
      <HeaderImage src={headerLogo} />
      <HeaderMenus>
        <HeaderMenuBtn>ABOUT US</HeaderMenuBtn>
        <HeaderMenuBtn>Login</HeaderMenuBtn>
      </HeaderMenus>
    </HeaderComp>
  );
}

export default Header;

const HeaderComp = styled.div`
  display: flex;
  justify-content: space-between;
  max-width: 652px;
  margin: auto;
  padding: 37px 16px;
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
