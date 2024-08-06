import React, { useEffect } from "react";

import SquarePlaceHolderImg from "../../assets/MainHome/Section3/SquarePlaceHolder.png";
import styled from "styled-components";

function MainHomeComp3() {
  return (
    <MainHomeComp3Style data-aos="fade-up">
      <img src={SquarePlaceHolderImg} />
    </MainHomeComp3Style>
  );
}

export default MainHomeComp3;

const MainHomeComp3Style = styled.div`
  max-width: 486px;
  margin: auto;
  margin-top: 200px;
  text-align: center;
  padding: 8px;
  & > img {
    /* margin: auto; */
    width: 100%;
  }
`;
