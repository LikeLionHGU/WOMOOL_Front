import React, { useEffect } from "react";

import AOS from "aos";
import "aos/dist/aos.css"; // You can also use <link> for styles

import SquarePlaceHolderImg from "../../assets/MainHome/Section3/SquarePlaceHolder.svg";
import styled from "styled-components";

function MainHomeComp3() {
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <MainHomeComp3Style data-aos="fade-up" data-aos-offset="200">
      <img src={SquarePlaceHolderImg} />
    </MainHomeComp3Style>
  );
}

export default MainHomeComp3;

const MainHomeComp3Style = styled.div`
  margin-top: 200px;
  text-align: center;
  & > img {
    /* margin: auto; */
  }
`;
