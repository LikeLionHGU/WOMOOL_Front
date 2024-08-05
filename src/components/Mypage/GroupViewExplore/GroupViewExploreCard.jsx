import React from "react";
import styled from "styled-components";
import { pretendard } from "../../../styles/fonts";

import PeopleIcon from "src/assets/Mypage-group/peopleicon.svg";
import { convertMlToL } from "src/tools/tool";
import { useNavigate } from "react-router-dom";

function GroupViewExploreCard({
  hoverGroupCode = false,
  hoverDelete = false,
  clickJoin = false,
  data = {},
}) {
  const navigate = useNavigate();
  return (
    <Card
      style={{
        backgroundImage: `url(${data.teamImage})`,
      }}
    >
      <Title>{data.name}</Title>
      <Footer.wrapper>
        <Footer.left>
          {convertMlToL(data.groupTotal)}L/{convertMlToL(data.recommendation)}L
        </Footer.left>
        <Footer.right>
          <img src={PeopleIcon} draggable={false} />
          <div>{data.peopleCount}</div>
        </Footer.right>
      </Footer.wrapper>
      {hoverGroupCode && (
        <Hover>
          <div>CODE | {data.code}</div>
        </Hover>
      )}
      {hoverDelete && <Hover></Hover>}
      {clickJoin && (
        <Hover
          style={{
            backgroundColor: "transparent",
          }}
          onClick={() => navigate("/group/" + data.code)}
        ></Hover>
      )}
    </Card>
  );
}

export default GroupViewExploreCard;

const Hover = styled.div`
  display: none;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.7);

  justify-content: center;
  align-items: center;

  div {
    /* CODE | 7942 */

    ${pretendard}
    font-style: normal;
    font-weight: 700;
    font-size: 36px;
    line-height: 43px;
    /* identical to box height */
    text-transform: uppercase;

    color: #ffffff;
  }
`;

const Card = styled.div`
  position: relative;
  box-sizing: border-box;
  /* 이 구역의 하마는 나야 */
  width: 288px;
  height: 183px;
  background-color: #d9d9d9;
  padding: 18px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;

  cursor: pointer;
  &:hover ${Hover} {
    display: flex;
  }
`;

const Title = styled.div`
  ${pretendard}
  font-style: normal;
  font-weight: 600;
  font-size: 25px;
  line-height: 30px;
  /* identical to box height */
  text-transform: uppercase;

  color: #000000;
`;

const Footer = {
  wrapper: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
  `,
  left: styled.div`
    /* 7L/10L */

    ${pretendard}
    font-style: normal;
    font-weight: 600;
    font-size: 36px;
    line-height: 43px;
    /* identical to box height */
    text-transform: uppercase;

    color: #000000;
  `,
  right: styled.div`
    display: flex;
    align-items: center;
    gap: 5px;
  `,
};
