import React, { useRef, useState } from "react";
import { useRecoilValue, useResetRecoilState } from "recoil";
import { authJwtAtom } from "../recoil/auth/atoms";

import { NewContainer, NewContainerInnerScroll } from "../styles/Container";

import PrevRecord from "../assets/Mypage/prev-record.svg";
import PrevRecordHover from "../assets/Mypage/prev-record-hover.svg";

import styled from "styled-components";
import { nenu, pretendard } from "../styles/fonts";
import GroupOnOffToggle from "../components/Mypage/GroupOnOffToggle";
import LastLog from "../components/Mypage/LastLog";
import AttendanceCheck from "../components/Mypage/AttendanceCheck";
import { useFetchBe } from "../tools/api";
import { userDetailAtom } from "../recoil/userAtoms";

import Header from "../components/Header";
import useWindowSize from "../tools/useWindowSize";
import { useNavigate, useSearchParams } from "react-router-dom";
import PersonalVeryTop from "../components/Mypage/PersonalViewVeryTop";
import PersonalViewMain from "../components/Mypage/PersonalViewMain";
import { HoverImageSpan } from "../styles/stylePresets";
import GroupViewExploreMain from "../components/Mypage/GroupViewExploreMain";
import GroupViewExploreTop from "../components/Mypage/GroupViewExploreTop";
import { convertMlToL } from "../tools/tool";

function Mypage() {
  const resetAuth = useResetRecoilState(authJwtAtom);
  const userData = useRecoilValue(userDetailAtom);
  const fetchBe = useFetchBe();
  const [swidth] = useWindowSize();

  const navigate = useNavigate();
  const [params] = useSearchParams();

  const mainRef = useRef();

  // 0 - personal, 1 - explorer, ID - 그룹페이지
  const [groupMode, setGroupMode] = useState(0);
  // const [showRecord, setShowRecord] = useState("init");
  const showRecord = params.get("showRecord") || "hidden";
  const setShowRecord = (value) =>
    value === "show"
      ? navigate("/mypage?showRecord=" + value)
      : navigate("/mypage");

  const scaleValue = Math.min(1, Math.max(0.7, ((swidth - 360) / 360) * 2));
  console.log(scaleValue);
  const rectHeight = mainRef?.current?.getBoundingClientRect().height;
  console.log(rectHeight);
  const translateValue =
    (1 - scaleValue) * mainRef?.current?.offsetHeight * -0.5;

  return (
    <NewContainerInnerScroll style={{ backgroundColor: "#EDECEB" }}>
      <AttendanceCheck />
      <LastLog show={showRecord} setShow={setShowRecord} />

      <MyPageWrapper>
        <div className="header">
          <Header
            loggedIn={true}
            style={{
              position: "relative",
              color: "#2892C2",
              width: "100%",
            }}
          />
        </div>

        <div
          className="main"
          style={{
            transform: `translateY(${translateValue}px)`,
          }}
        >
          <VeryTopWrapper>
            {groupMode === 0 && <PersonalVeryTop userData={userData} />}
            {groupMode === 1 && <GroupViewExploreTop />}
          </VeryTopWrapper>
          <TopBlock.wrapper
            ref={mainRef}
            style={{
              // transform: scaleValue,
              transform: `scale(${scaleValue})`,
              transformOrigin: "bottom center",
              // height: Math.floor(rectHeight),
            }}
          >
            <TopBlock.left>
              <HoverImageSpan onClick={() => setShowRecord("show")}>
                <img src={PrevRecord} draggable={false} />
                <img
                  className="hover"
                  src={PrevRecordHover}
                  draggable={false}
                />
              </HoverImageSpan>
            </TopBlock.left>
            <TopBlock.center>
              {groupMode === 0 && (
                <CurrentLevel>Lv.{+userData.hasDrankLevel + 1}</CurrentLevel>
              )}
            </TopBlock.center>
            <TopBlock.right>
              <span onClick={() => setGroupMode((prev) => (!prev ? 1 : 0))}>
                <GroupOnOffToggle clicked={groupMode === 0 ? false : true} />
              </span>
            </TopBlock.right>
          </TopBlock.wrapper>
          <MainAreaWrapper>
            {groupMode === 0 && (
              <>
                <PersonalViewMain />
                <TempText>
                  <div>
                    Today <br />
                    {convertMlToL(userData.todayTotal)}L
                  </div>
                </TempText>
              </>
            )}
            {groupMode === 1 && <GroupViewExploreMain />}
          </MainAreaWrapper>
        </div>
      </MyPageWrapper>
    </NewContainerInnerScroll>
  );
}

export default Mypage;

const TopBlock = {
  wrapper: styled.div`
    padding-top: 0px; // Header 없어서 임시
    display: flex;
    align-items: center;
    margin-bottom: 3px;
    height: 65px;

    & > * {
      /* border: 1px solid red; */
      box-sizing: border-box;
    }

    @media (max-width: 750px) {
      margin-bottom: 16px;
    }
  `,
  left: styled.div`
    flex: 1 1 150px;
    width: 150px;
    * {
      float: right;
      margin-right: 13px;
    }
  `,
  center: styled.div`
    flex: 0 0 300px;
    width: 300px;
    /* padding-bottom: 19px; */
    transition: flex 300ms;

    @media (max-width: 750px) {
      flex: 1;
    }
  `,
  right: styled.div`
    flex: 1 1 150px;
    width: 150px;
    padding-left: 26px;
  `,
};

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

const MyPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  margin: 0;
  padding: 0;

  & > .header {
    flex-shrink: 0;
  }

  & > .main {
    flex-grow: 1;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;

    @media (max-width: 750px) {
      align-items: center;
    }
  }
`;

const VeryTopWrapper = styled.div`
  width: 100%;
  height: 250px;
  overflow-y: hidden;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  @media (max-width: 550px) {
    height: 160px;
  }
`;

const MainAreaWrapper = styled.div`
  width: 100%;
  min-height: 535px;
  position: relative;
`;

const TempText = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  div {
    display: inline-block;
    margin: auto;
    font-size: 64px;
    font-weight: bold;
    text-align: center;
    background-color: lightgray;
  }
`;
