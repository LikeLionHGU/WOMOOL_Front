import React from "react";
import styled from "styled-components";
import { convertMlToL } from "src/tools/tool";
import { nenu, pretendard } from "src/styles/fonts";
import { HoverImageSpan } from "../../styles/stylePresets";

import copySvg from "../../assets/Mypage-group/copy.svg";

function GroupViewVeryTop({ userData, groupData }) {
  return (
    <Wrapper>
      <TopPart>
        <LevelIconBox>
          <div>
            <LevelBoxIconContent.dayNum>
              #{((+groupData.dateCount % 7) + 1).toString().padStart(2, "0")}
            </LevelBoxIconContent.dayNum>
            <LevelBoxIconContent.weekNum>
              WEEK {Math.floor(groupData.dateCount / 7) + 1}
            </LevelBoxIconContent.weekNum>
          </div>
          <LevelBoxIconContent.desc>
            Drinking
            <br />
            Water
          </LevelBoxIconContent.desc>
          <ProfileImageBox>
            <img src={groupData.teamImage} />
          </ProfileImageBox>
        </LevelIconBox>
        <ProfileImageBox style={{ position: "relative" }}>
          <StyleOverlay>
            <div
              onClick={() => {
                navigator.clipboard
                  .writeText(groupData.code)
                  .then(() => {})
                  .catch((err) => {});
              }}
            >
              <div>CODE</div>
              <div>
                {groupData.code}{" "}
                <img
                  style={{
                    width: 16,
                    height: 20,
                    display: "inline-block",
                    marginLeft: 1,
                    marginBottom: 2,
                  }}
                  src={copySvg}
                />
              </div>
            </div>
          </StyleOverlay>
          <img src={groupData.teamImage} />
        </ProfileImageBox>
      </TopPart>
      <CurrentGoal>GOAL {convertMlToL(groupData.recommendation)}L</CurrentGoal>
    </Wrapper>
  );
}

export default GroupViewVeryTop;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  margin-bottom: 18px;
  @media (max-width: 550px) {
    margin-bottom: 8px;
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

    @media (max-width: 550px) {
      display: none;
    }
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

const ProfileImageBox = styled.div`
  height: 100%;
  border-radius: 10px;
  border: 1px solid black;
  overflow: hidden;
  & > *,
  img {
    aspect-ratio: 1 / 1;
    height: 100%;
    object-fit: cover; /* Ensures the image covers the container */
    object-position: center center; /* Centers the image */
  }
`;

const TopPart = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 13px;
  gap: 15px;
  height: 140px;

  @media (max-width: 550px) {
    height: 110px;
  }

  & > ${ProfileImageBox} {
    @media (max-width: 550px) {
      display: none;
    }
  }
`;

const LevelIconBox = styled.div`
  flex-shrink: 1;

  ${nenu}
  border: 1px solid black;
  padding: 8px 11px;
  /* width: calc(129px - 22px); */
  width: 129px;
  border-radius: 10px;
  box-sizing: border-box;

  & > ${ProfileImageBox} {
    display: none;
  }

  @media (max-width: 550px) {
    box-sizing: border-box;
    width: calc(100% - 32px);
    /* padding: 8px 16px; */
    padding: 0;
    padding-left: 16px;
    margin: 8px 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    /* border: none; */
    & > ${ProfileImageBox} {
      display: block;
      border: none;
    }
  }
`;

const StyleOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  cursor: pointer;

  & > div {
    visibility: hidden;
  }

  &:hover > div {
    flex-direction: column;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: bold;
    font-size: 28px;
    visibility: visible;
    background-color: rgba(0, 0, 0, 0.7);
  }
`;
