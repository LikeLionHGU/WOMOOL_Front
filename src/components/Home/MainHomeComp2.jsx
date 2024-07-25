import React from "react";

import MainCupImg from "../../assets/MainHome/Section2/Cup.jpg";
import styled from "styled-components";

function MainHomeComp2() {
  return (
    <div>
      <MainHomeTodayDrank>
        <img src={MainCupImg} />
      </MainHomeTodayDrank>
    </div>
  );
}

export default MainHomeComp2;

const MainHomeTodayDrank = styled.div`
  padding-top: 119px;
  padding-bottom: 100px;

  padding-left: 20.8%;
  padding-right: 8%;

  img {
    width: 100%;
    max-width: 534px;
    /* padding: 8px; */
  }
`;
