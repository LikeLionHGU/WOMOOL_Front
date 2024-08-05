import React, { useState } from "react";
import styled from "styled-components";
import { pretendard } from "../../../styles/fonts";

import PeopleIcon from "src/assets/Mypage-group/peopleicon.svg";
import WoomoolBackCoverIcon from "src/assets/Mypage-group/woomool-backcover-icon.svg";
import ExitIcon from "src/assets/Mypage-group/exit-icon.svg";
import { convertMlToL } from "src/tools/tool";
import { useNavigate } from "react-router-dom";
import { useFetchBe } from "../../../tools/api";
import ModalJoinGroup from "./ModalJoinGroup";

function GroupViewExploreCard({
  hoverGroupCode = false,
  hoverDelete = false,
  clickJoin = false,
  data = {},
}) {
  const fetchBe = useFetchBe();
  const navigate = useNavigate();
  const [joinModal, setJoinModal] = useState(false);
  return (
    <Card
      style={{
        backgroundImage: `url(${data.teamImage})`,
      }}
    >
      <Backdrop />
      <Content>
        <Title>{data.name}</Title>
        <Footer.wrapper>
          <Footer.left>
            {convertMlToL(data.groupTotal)}L/{convertMlToL(data.recommendation)}
            L
          </Footer.left>
          <Footer.right>
            <img src={PeopleIcon} draggable={false} />
            <div>{data.peopleCount}</div>
          </Footer.right>
        </Footer.wrapper>
      </Content>

      {hoverGroupCode && (
        <Hover onClick={() => setJoinModal(true)}>
          <div>CODE | {data.code}</div>
        </Hover>
      )}

      {clickJoin && (
        <Hover>
          <Hover
            style={{ backgroundColor: "transparent" }}
            onClick={() => navigate("/group/" + data.code)}
          />
          <img src={WoomoolBackCoverIcon} draggable={false} />
          {hoverDelete && (
            <DeleteImg
              src={ExitIcon}
              draggable={false}
              onClick={async () => {
                fetchBe("/team/exit/" + data.teamId, "PATCH");
              }}
            />
          )}
        </Hover>
      )}
      <ModalJoinGroup
        isOpen={joinModal}
        setIsOpen={setJoinModal}
        initialCustomValue={data.code}
      />
    </Card>
  );
}

export default GroupViewExploreCard;

const Content = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  /* background-color: rgba(0, 0, 0, 0.5); */

  box-sizing: border-box;
  padding: 18px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const Backdrop = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
`;

const Hover = styled(Backdrop)`
  display: none;
  background-color: #2892c2;

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

  color: white;
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

    color: white;
  `,
  right: styled.div`
    display: flex;
    align-items: center;
    gap: 5px;
    color: white;
  `,
};

const DeleteImg = styled.img`
  position: absolute;
  display: block;
  right: 20px;
  top: 20px;
  &:hover {
    filter: invert(1);
  }
`;
