import React from "react";
import styled from "styled-components";
import { pretendard } from "../../styles/fonts";

function GroupViewExploreTop() {
  return (
    <Text>
      Let’s Drink <br />
      water
      <br />
      together
    </Text>
  );
}

export default GroupViewExploreTop;

const Text = styled.div`
  padding: 0 55px;
  height: 100%;
  display: flex;
  align-items: center;
  /* Let’s Drink water together */
  ${pretendard}
  font-style: normal;
  font-weight: 800;
  font-size: 58px;
  line-height: 75px;
  /* or 110% */
  text-transform: uppercase;

  color: #000000;
`;
