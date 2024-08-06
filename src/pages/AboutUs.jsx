import React from "react";
import { NewContainer, NewContainerInnerScroll } from "src/styles/Container";
import styled from "styled-components";

import { pretendard, timesNewRoman } from "src/styles/fonts";

import WoomoolChar from "src/assets/woomool-char.png";
import Header from "../components/Header";

function AboutUs() {
  return (
    <NewContainer>
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
      </Wrapper>
    </NewContainer>
  );
}

export default AboutUs;

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
  font-size: 30px;
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
