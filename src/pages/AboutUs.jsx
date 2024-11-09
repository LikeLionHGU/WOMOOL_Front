import React, { useEffect, useRef } from "react";
import { NewContainer, NewContainerInnerScroll } from "src/styles/Container";
import styled from "styled-components";

import { pretendard, timesNewRoman } from "src/styles/fonts";

import WoomoolChar from "src/assets/woomool-char.png";
import aboutUsMoveToTop from "../assets/aboutus-moveToTop.svg";
import Header from "../components/Header";
import AboutUsProfile from "../components/AboutUsProfile";

import MainPointDownImg from "../assets/MainHome/Section1/main-point-down.svg";
import Footer from "../components/Home/Footer";
import AOS from "aos";
import { Container } from "../styles/Container";

function AboutUs() {
  const woomoolInfoRef = useRef();

  // Setup AOS
  useEffect(() => {
    AOS.init({
      // disableMutationObserver: true,
      // throttleDelay: 60,
    });
  });
  return (
    <AllContainer>
      <Container>
        <Header
          loggedIn={true}
          style={{
            position: "relative",
            color: "#2892C2",
            width: "100%",
          }}
        />
        <Wrapper>
          <WoomoolFun>우물우물, 함께라면 건강도 즐겁다</WoomoolFun>
          <WoomoolBestTeam>
            WMWM is
            <br />
            Best Team.
          </WoomoolBestTeam>
          <WoomoolImg src={WoomoolChar} />
          <WoomoolFlex>
            <FlexLeft>
              물 마시는 습관, <br />
              서로 공유하여
              <br />
              ‘우물’해요
            </FlexLeft>
            <FlexRight>
              ‘우물우물’은 물 마시기 습관 기록 웹/앱 서비스로 자신에게 적절한 물
              섭취량을 측정하여 기록하고 그룹 멤버 간 매일 적절한 물 섭취를
              독려하며 함께 습관을 형성해 나갈 수 있는 웰니스(Wellness)라이프를
              목표로 합니다
            </FlexRight>
          </WoomoolFlex>
          <MainPointDown
            onClick={() => {
              woomoolInfoRef.current?.scrollIntoView({
                behavior: "smooth",
              });
            }}
          >
            <img
              style={{ filter: "brightness(0) saturate(100%)" }}
              src={MainPointDownImg}
            />
          </MainPointDown>
          <WoomoolInfo ref={woomoolInfoRef}>
            <AboutUsProfile />
          </WoomoolInfo>
          <div
            data-aos="fade-up"
            style={{ cursor: "pointer", marginBottom: 90 }}
            onClick={() => {
              document.body.scrollIntoView({
                behavior: "smooth",
              });
            }}
          >
            <MainPointDown>
              <img
                src={MainPointDownImg}
                style={{ transform: "rotate(180deg)" }}
              />
            </MainPointDown>
            <img
              src={aboutUsMoveToTop}
              draggable={false}
              style={{
                width: 160,
                margin: "auto",
                display: "block",
                transform: "translateY(-13px)",
              }}
            />
          </div>
          <Footer noTop={true} />
        </Wrapper>
      </Container>
    </AllContainer>
  );
}

export default AboutUs;

const AllContainer = styled.div`
  background: linear-gradient(180deg, white 76%, #2892c2 100%);
`;

const Wrapper = styled.div`
  max-width: 535px;
  width: 90vw;
  margin: auto;
  padding: 16px;
  box-sizing: border-box;
`;

const WoomoolFun = styled.div`
  ${pretendard}
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 18px;

  color: #000000;
`;

const WoomoolBestTeam = styled.div`
  /* WMWM is Best Team. */

  ${timesNewRoman}
  font-style: normal;
  font-weight: 400;
  font-size: 60px;
  line-height: 69px;

  color: #000000;
`;

const WoomoolImg = styled.img`
  display: block;
  width: 100%;
`;

const WoomoolFlex = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  gap: 55px;

  & > div {
  }

  @media (max-width: 550px) {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
`;

const FlexLeft = styled.div`
  /* font-family: 'Kim jung chul Myungjo'; */
  max-width: 196px;
  flex-basis: 196px;
  ${pretendard}
  font-style: normal;
  font-weight: 400;
  font-size: 26px;
  line-height: 53px;
  /* or 177% */

  color: #000000;
`;

const FlexRight = styled.div`
  ${pretendard}
  max-width: 281px;
  font-style: normal;
  font-weight: 500;
  font-size: 15px;
  line-height: 29px;
  /* or 193% */

  color: #494949;
`;

const WoomoolInfo = styled.div`
  & > img {
    width: 100%;
  }
`;

const MainPointDown = styled.div`
  position: static;
  bottom: 17px;
  left: 0;
  right: 0;
  margin: auto;

  text-align: center;
  padding: 8px;

  cursor: pointer;

  animation: moveUpDown 1.4s infinite;
  @keyframes moveUpDown {
    0%,
    100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-10px);
    }
  }
`;
