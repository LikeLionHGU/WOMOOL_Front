import React from "react";

import WoomoolChar from "src/assets/woomool-char.png";
import styled from "styled-components";
import { pretendard } from "../../styles/fonts";
import { convertMlToL } from "../../tools/tool";
import WaterDrinkSlider from "./WaterDrinkSlider";
import PeopleIcon from "src/assets/Mypage-group/peopleicon-black.svg";

import GroupRightArrow from "src/assets/Mypage-group/group-rightarrow-blue.svg";
import { FloatEffect } from "../../styles/FloatEffect";
import FloatingDiv from "../FloatingDiv";

import CountUp from "react-countup";

function GroupViewMain({ groupData, groupMembers }) {
  console.log({ groupMembers });
  return (
    <div>
      <FloatingDiv maxDistance={10} maxTilt={5} interval={1000}>
        <WoomoolCharImg src={WoomoolChar} />
      </FloatingDiv>
      <Total>
        <div className="today">This Week</div>
        <div>
          {" "}
          <CountUp
            end={convertMlToL(groupData.groupTotal) || 0}
            duration={3}
            decimals={2}
            preserveValue={true}
          />
          L
        </div>
        <GroupMembersStats>
          {(groupMembers || []).map((memberData) => (
            <WaterDrinkSlider
              key={memberData.userId}
              name={memberData.nickName}
              drink={memberData.waterAmount}
              toDrink={1000}
            />
          ))}
        </GroupMembersStats>

        <BottomFlex>
          <PeopleCount>
            <img src={PeopleIcon} draggable={false} />
            <div>{groupMembers.length}</div>
          </PeopleCount>
          <BottomArrow>
            <div>Explore</div>
            <img src={GroupRightArrow} draggable={false} />
          </BottomArrow>
        </BottomFlex>
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
  width: 320px;
  margin: auto;

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

const GroupMembersStats = styled.div`
  margin-top: 38px;
  margin-bottom: 17px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: center;
`;

const PeopleCount = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  color: black;

  ${pretendard}
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 24px;
  /* identical to box height */
  text-transform: uppercase;

  color: #000000;
`;

const BottomFlex = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const BottomArrow = styled.div`
  cursor: pointer;
  display: flex;
  div {
    /* 마신 물 자세히 보기 */
    ${pretendard}
    font-style: normal;
    font-weight: 700;
    font-size: 18px;
    line-height: 21px;
    text-transform: uppercase;

    color: #2892c2;
  }
`;
