import React from "react";
import { useResetRecoilState } from "recoil";
import { authJwtAtom } from "../recoil/auth/atoms";

import { NewContainer } from "../styles/Container";

import PrevRecord from "../assets/Mypage/prev-record.svg";
import PrevRecordHover from "../assets/Mypage/prev-record-hover.svg";

import styled from "styled-components";
import { nenu, pretendard } from "../styles/fonts";

function Mypage() {
  const resetAuth = useResetRecoilState(authJwtAtom);

  return (
    <NewContainer style={{ backgroundColor: "#EDECEB" }}>
      <div>
        <button onClick={() => resetAuth()}>로그아웃</button>
      </div>

      <TopBlock.wrapper>
        <TopBlock.left>
          <HoverImageSpan>
            <img src={PrevRecord} draggable={false} />
            <img className="hover" src={PrevRecordHover} draggable={false} />
          </HoverImageSpan>
        </TopBlock.left>
        <TopBlock.center>
          <LevelIconBox>
            <LevelBoxIconContent.dayNum>#01</LevelBoxIconContent.dayNum>
            <LevelBoxIconContent.weekNum>WEEK 2</LevelBoxIconContent.weekNum>
            <LevelBoxIconContent.desc>
              Drinking
              <br />
              Water
            </LevelBoxIconContent.desc>
          </LevelIconBox>
          <CurrentLevel>Lv.3</CurrentLevel>
        </TopBlock.center>
        <TopBlock.right>개인 Page 토글</TopBlock.right>
      </TopBlock.wrapper>
    </NewContainer>
  );
}

export default Mypage;

const TopBlock = {
  wrapper: styled.div`
    display: flex;
    align-items: flex-end;
    & > * {
      border: 1px solid red;
      box-sizing: border-box;
    }
  `,
  left: styled.div`
    width: 100%;
    flex-grow: 1;
    * {
      float: right;
      padding-right: 13px;
    }
  `,
  center: styled.div`
    flex: 0 0 300px;
  `,
  right: styled.div`
    width: 100%;
    flex-grow: 1;
  `,
};

const LevelIconBox = styled.div`
  ${nenu}
  border: 1px solid black;
  padding: 8px 11px;
  /* width: calc(129px - 22px); */
  width: 129px;
  border-radius: 10px;
  box-sizing: border-box;
  margin: auto;
  margin-bottom: 60px;
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

const HoverImageSpan = styled.span`
  & {
    cursor: pointer;
  }

  & .hover {
    display: none;
  }

  &:hover .hover {
    display: inline;
  }

  &:hover img:not(.hover) {
    display: none;
  }
`;

const CurrentLevel = styled.div`
  /* Lv.3 */

  ${pretendard}
  font-style: normal;
  font-weight: 500;
  font-size: 28px;
  line-height: 33px;
  text-transform: capitalize;

  color: #000000;
  text-align: center;
`;
