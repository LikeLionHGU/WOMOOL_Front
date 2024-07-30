import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

import headerLogo from "../assets/header-logo.svg";
import googleLogo from "../assets/googlelogo.svg";
import kakaoLogo from "../assets/kakaologo.svg";
import { serverRootUrl } from "../constants";
import { pretendard, timesNewRoman } from "../styles/fonts";

function Header() {
  const [openModal, setOpenModal] = useState("initial");
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
      <HeaderCompContent>
        <HeaderImage src={headerLogo} />
        <HeaderMenus>
          <HeaderMenuBtn>ABOUT US</HeaderMenuBtn>
          <HeaderMenuBtn
            onClick={() => {
              console.log("AAA");
              setOpenModal("show");
            }}
          >
            LOGIN
          </HeaderMenuBtn>
        </HeaderMenus>
      </HeaderCompContent>
      <HeaderModal className={openModal}>
        <HeaderModalBackdrop
          className={openModal}
          onClick={() => setOpenModal("hidden")}
        />
        <HeaderModalContent className={openModal}>
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
        </HeaderModalContent>
      </HeaderModal>
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

const HeaderModal = styled.div`
  position: fixed;
  /* background-color: rgba(0, 0, 0, 0.3); */

  padding: 0;
  width: 0;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  display: flex; // Overwritten by inline style
  align-items: center;
  justify-content: center;

  box-sizing: border-box;
  padding: 16px;

  /* opacity: 0; */
  /* visibility: hidden; */

  &.initial {
    visibility: hidden;
  }

  &.hidden {
    visibility: hidden;
  }

  &.show {
    visibility: visible;
  }

  & .initial {
    visibility: hidden;
  }

  & .hidden {
    animation: fadeOut 250ms forwards;
  }

  & .show {
    animation: fadeIn 250ms forwards;
  }
  /* 
  visibility: hidden;
  opacity: ${(props) => (props.modalOpen ? 100 : 0)}; */
  /* visibility: ${(props) => (props.modalOpen ? "visible" : "hidden")}; */
  /* transition: opacity 1000ms linear; */

  @keyframes fadeOut {
    from {
      opacity: 1;
      visibility: visible;
    }
    to {
      opacity: 0;
      visibility: hidden; /* Optional: also set visibility to hidden at the end */
    }
  }

  /* Define keyframes for fade in */
  @keyframes fadeIn {
    from {
      opacity: 0;
      visibility: visible; /* Optional: ensure visibility is set to visible at the start */
    }
    to {
      opacity: 1;
      visibility: visible;
    }
  }
`;

const HeaderModalBackdrop = styled.div`
  /* background-color: white; */
  height: 100%;
  width: 100%;
  position: absolute;
`;

const HeaderModalContent = styled.div`
  width: 100%;
  max-width: 380px;
  background: rgba(222, 239, 255, 0.127);
  box-shadow: inset 4.39333px -4.39333px 4.39333px rgba(186, 201, 214, 0.454),
    inset -4.39333px 4.39333px 4.39333px rgba(255, 255, 255, 0.454);
  backdrop-filter: blur(24.383px) opacity(1);
  border-radius: 30px;
  padding: 33px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
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
