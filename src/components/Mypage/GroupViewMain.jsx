import React from "react";

import WoomoolChar from "src/assets/woomool-char.png";
import styled from "styled-components";
import { pretendard } from "../../styles/fonts";
import { convertMlToL } from "../../tools/tool";

function GroupViewMain({ groupData }) {
  return (
    <div>
      <WoomoolCharImg src={WoomoolChar} />
      <Total>
        <div className="today">This Week</div>
        <div>{convertMlToL(groupData.groupTotal)}L</div>
      </Total>
    </div>
  );
}

export default GroupViewMain;

const WoomoolCharImg = styled.img`
  display: block;
  width: 100%;
  max-width: 381px;
  margin: auto;
`;

const Total = styled.div`
  ${pretendard}
  font-style: normal;
  font-weight: 600;
  font-size: 52px;
  line-height: 62px;
  /* identical to box height */
  text-align: center;
  text-transform: uppercase;

  color: #000000;

  .today {
    font-style: normal;
    font-weight: 600;
    font-size: 24px;
    line-height: 29px;
    /* identical to box height */
    text-align: center;
    text-transform: uppercase;

    color: #000000;
  }
`;
