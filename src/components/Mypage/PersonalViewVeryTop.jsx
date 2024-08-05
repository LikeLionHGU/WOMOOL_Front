import React from "react";
import styled from "styled-components";
import { convertMlToL } from "src/tools/tool";
import { nenu, pretendard } from "src/styles/fonts";

function PersonalVeryTop({ userData }) {
  return (
    <Wrapper>
      <LevelIconBox>
        <div>
          <LevelBoxIconContent.dayNum>
            #{(+userData.weekDate + 1).toString().padStart(2, "0")}
          </LevelBoxIconContent.dayNum>
          <LevelBoxIconContent.weekNum>
            WEEK {userData.week}
          </LevelBoxIconContent.weekNum>
        </div>
        <LevelBoxIconContent.desc>
          Drinking
          <br />
          Water
        </LevelBoxIconContent.desc>
      </LevelIconBox>
      <CurrentGoal>GOAL {convertMlToL(userData.recommendation)}L</CurrentGoal>
    </Wrapper>
  );
}

export default PersonalVeryTop;

const Wrapper = styled.div`
  margin-bottom: 18px;
  @media (max-width: 550px) {
    margin-bottom: 8px;
  }
`;

const LevelIconBox = styled.div`
  ${nenu}
  border: 1px solid black;
  padding: 8px 11px;
  /* width: calc(129px - 22px); */
  width: 129px;
  border-radius: 10px;
  box-sizing: border-box;
  margin: auto;
  margin-bottom: 13px;

  @media (max-width: 550px) {
    box-sizing: border-box;
    width: calc(100% - 32px);
    padding: 8px 16px;
    margin: 8px 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    /* border: none; */
  }
`;

const LevelBoxIconContent = {
  dayNum: styled.div`
    font-style: normal;
    font-weight: 600;
    font-size: 36px;
    line-height: 43px;
    /* identical to box height */
    text-transform: uppercase;

    color: #000000;
  `,
  weekNum: styled.div`
    /* week 2 */

    font-style: normal;
    font-weight: 600;
    font-size: 22px;
    line-height: 26px;
    text-transform: uppercase;

    color: #000000;

    margin-bottom: 11px;
    @media (max-width: 550px) {
      margin-bottom: 0;
    }
  `,
  desc: styled.div`
    /* Drinking water */

    font-style: normal;
    font-weight: 450;
    font-size: 18px;
    line-height: 21px;
    text-transform: uppercase;

    color: #000000;
  `,
};

const CurrentGoal = styled.div`
  /* margin-bottom: 18px; */
  ${pretendard}
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 29px;
  /* identical to box height */
  text-align: center;
  text-transform: uppercase;

  color: #2892c2;
`;
