import React from "react";
import styled from "styled-components";
import { pretendard, timesNewRoman } from "src/styles/fonts";
import { convertMlToL } from "../../tools/tool";

function WaterDrinkSlider({ drink, toDrink, name }) {
  return (
    <Wrapper>
      <InnerSquare
        style={{
          width: Math.min(1, drink / toDrink) * 320,
        }}
      ></InnerSquare>
      <Name>{name}</Name>
      <Drank>{convertMlToL(drink)}L</Drank>
    </Wrapper>
  );
}

export default WaterDrinkSlider;

const Wrapper = styled.div`
  position: relative;
  height: 45px;
  width: 100%;
  background-color: #d9d9d9;
  border-radius: 10px;
`;

const InnerSquare = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 0;
  background-color: #2892c2;
  border-radius: 10px;
  transition: width 300ms;
`;

const Center = styled.div`
  display: flex;
  align-items: center;

  ${pretendard}
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 21px;
  text-align: center;
  text-transform: capitalize;

  color: #ffffff;
`;

const Name = styled(Center)`
  position: absolute;
  left: 12px;
  top: 0;
  bottom: 0;
`;

const Drank = styled(Center)`
  position: absolute;
  right: 12px;
  top: 0;
  bottom: 0;
`;
