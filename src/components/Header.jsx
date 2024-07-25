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
  padding: 37px 54px;
`;

const HeaderImage = styled.img``;

const HeaderMenus = styled.div`
  border: 1px solid red;
  display: flex;
`;

const HeaderMenuBtn = styled.div`
  border: 1px solid yellow;
  padding: 15px 25px;
  font-size: 17px;
`;
