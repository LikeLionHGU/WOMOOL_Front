import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

import headerLogo from "../assets/header-logo.svg";
import headerLogoBlue from "../assets/header-logo-blue.svg";
import googleLogo from "../assets/googlelogo.svg";
import kakaoLogo from "../assets/kakaologo.svg";
import { serverRootUrl } from "../constants";
import { pretendard, timesNewRoman } from "../styles/fonts";
import TheModal from "./TheModal";
import { useRecoilValue } from "recoil";
import { authJwtAtom } from "../recoil/auth/atoms";
import { useNavigate } from "react-router-dom";

function Header({ loggedIn = false, ...props }) {
  const navigate = useNavigate();

  const [openModal, setOpenModal] = useState("initial");
  const headerRef = useRef(null);

  const jwtValue = useRecoilValue(authJwtAtom);

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
    <HeaderComp ref={headerRef} {...props}>
      <HeaderCompContent>
        <HeaderImage
          src={loggedIn ? headerLogoBlue : headerLogo}
          onClick={() => {
            navigate(loggedIn ? "/mypage" : "/");
          }}
        />
        <HeaderMenus>
          <HeaderMenuBtn>ABOUT US</HeaderMenuBtn>
          {jwtValue ? (
            <HeaderMenuBtn
              onClick={() => {
                navigate("/newuser");
              }}
            >
              MYPAGE
            </HeaderMenuBtn>
          ) : (
            <HeaderMenuBtn
              onClick={() => {
                console.log("AAA");
                setOpenModal("show");
              }}
            >
              LOGIN
            </HeaderMenuBtn>
          )}
        </HeaderMenus>
      </HeaderCompContent>

      <TheModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        style={{
          color: "white",
        }}
      >
        <HeaderModalLoginText.logo>
          <img src={headerLogo} />
        </HeaderModalLoginText.logo>
        <HeaderModalLoginText.title>LOGIN</HeaderModalLoginText.title>
        <HeaderModalLoginText.text>
          Pure water is the world's
          <br /> first and foremost medicine.
        </HeaderModalLoginText.text>
        <HeaderModalLoginBtn.root>
          <HeaderModalLoginBtn.google
            href={serverRootUrl + "/oauth2/authorization/google"}
          >
            <img src={googleLogo} />
            <div>Google 계정으로 계속</div>
          </HeaderModalLoginBtn.google>
          <HeaderModalLoginBtn.kakao
            href={serverRootUrl + "/oauth2/authorization/kakao"}
          >
            <img src={kakaoLogo} />
            <div> Kakao 계정으로 계속</div>
          </HeaderModalLoginBtn.kakao>
        </HeaderModalLoginBtn.root>
      </TheModal>
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

  z-index: 99;

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
  cursor: pointer;
`;

const HeaderMenus = styled.div`
  font-family: TimesNewRoman, "Times New Roman", Times, Baskerville, Georgia,
    serif;
  display: flex;
`;

const HeaderMenuBtn = styled.div`
  padding: 15px 25px;
  font-size: 17px;
  cursor: pointer;

  @media (max-width: 750px) {
    font-size: 2.267vw;
  }

  @media (max-width: 574.46px) {
    font-size: 13px;
  }
`;
const HeaderCompContent = styled.div`
  display: flex;
  justify-content: space-between;
  max-width: 652px;
  padding: 18px 16px;
  margin: auto;
`;

const HeaderModalLoginText = {
  logo: styled.div`
    width: 47px;
    margin-bottom: 18px;
    img {
      width: 100%;
    }
  `,
  title: styled.div`
    ${timesNewRoman}
    font-size: 18px;
    font-weight: bold;
    font-style: italic;
    text-transform: uppercase;
    margin-bottom: 13px;
  `,
  text: styled.div`
    ${timesNewRoman}
    font-size: 12px;
    text-transform: uppercase;
    margin-bottom: 25px;
  `,
};

const HeaderModalLoginBtn = {
  root: styled.div`
    ${pretendard}
    color: black;
    font-size: 12px;
    font-weight: 600; // Semi Bold
  `,
  google: styled.a`
    /* Frame 6 */

    /* Auto layout */
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 9px 51px;
    gap: 10px;

    background: rgba(255, 255, 255, 0.6);
    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25), inset 0px 0px 4px #ffffff;
    border-radius: 30px;

    margin-bottom: 11px;

    text-decoration: none;
    color: inherit;
  `,
  kakao: styled.a`
    /* Frame 7 */

    /* Auto layout */
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 11px 31px;
    gap: 10px;

    background: rgba(250, 255, 9, 0.6);
    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25),
      inset 0px 0px 4px rgba(255, 255, 255, 0.8);
    border-radius: 30px;

    text-decoration: none;
    color: inherit;
  `,
};
