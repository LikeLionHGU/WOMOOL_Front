import React, { useEffect, useRef, useState } from "react";
import { useRecoilValue, useResetRecoilState } from "recoil";
import { authJwtAtom } from "../recoil/auth/atoms";

import { NewContainer, NewContainerInnerScroll } from "../styles/Container";

import PrevRecord from "../assets/Mypage/prev-record.svg";
import PrevRecordHover from "../assets/Mypage/prev-record-hover.svg";
import GroupAdd from "../assets/Mypage/joingroup.svg";
import GroupAddHover from "../assets/Mypage/joingroup-hover.svg";

import styled from "styled-components";
import { nenu, pretendard } from "../styles/fonts";
import GroupOnOffToggle from "../components/Mypage/GroupOnOffToggle";
import LastLog from "../components/Mypage/LastLog";
import AttendanceCheck from "../components/Mypage/AttendanceCheck";
import { useFetchBe } from "../tools/api";
import { userDetailAtom } from "../recoil/userAtoms";

import Header from "../components/Header";
import useWindowSize from "../tools/useWindowSize";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import PersonalVeryTop from "../components/Mypage/PersonalViewVeryTop";
import PersonalViewMain from "../components/Mypage/PersonalViewMain";
import { HoverImageSpan } from "../styles/stylePresets";
import GroupViewExploreMain from "../components/Mypage/GroupViewExplore/GroupViewExploreMain";
import GroupViewExploreTop from "../components/Mypage/GroupViewExplore/GroupViewExploreTop";
import { convertMlToL } from "../tools/tool";
import ModalJoinGroup from "../components/Mypage/GroupViewExplore/ModalJoinGroup";
import GroupViewVeryTop from "../components/Mypage/GroupViewVeryTop";
import GroupViewMain from "../components/Mypage/GroupViewMain";

function Mypage() {
  const resetAuth = useResetRecoilState(authJwtAtom);
  const userData = useRecoilValue(userDetailAtom);
  const fetchBe = useFetchBe();
  const [swidth] = useWindowSize();

  const navigate = useNavigate();
  const [params] = useSearchParams();

  const wrapperRef = useRef();
  const mainRef = useRef();

  const { gid } = useParams();

  const [groupOneData, setGroupOneData] = useState({});

  // 0 - personal, 1 - explorer, ID - 그룹페이지
  const [groupMode, setGroupMode] = useState(gid || 0);
  // const [showRecord, setShowRecord] = useState("init");
  const showRecord = params.get("showRecord") || "hidden";
  const setShowRecord = (value) =>
    value === "show"
      ? navigate("/mypage?showRecord=" + value)
      : navigate("/mypage");
  const setShowGroupRecord = (value) =>
    value === "show"
      ? navigate("/mypage?showRecord=" + value)
      : navigate("/mypage");

  const scaleValue = Math.min(1, Math.max(0.7, ((swidth - 360) / 360) * 2));
  const rectHeight = mainRef?.current?.getBoundingClientRect().height;
  const translateValue =
    (1 - scaleValue) * mainRef?.current?.offsetHeight * -0.5;

  const [joinModalOpen, setJoinModalOpen] = useState(false);

  useEffect(() => {
    if (groupMode === 0 && gid) {
      navigate("/mypage");
    }
  }, [groupMode]);

  useEffect(() => {
    if (!!gid) {
      wrapperRef.current?.scrollTo(0, 0);
      setGroupMode(gid);
      fetchBe("/team/getByCode/" + gid).then((json) => setGroupOneData(json));
    } else {
      if (groupMode !== 0) setGroupMode(1);
    }
  }, [gid]);

  return (
    <NewContainerInnerScroll
      ref={wrapperRef}
      style={{ backgroundColor: "#EDECEB" }}
    >
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
            {groupMode === 0 ? (
              <PersonalVeryTop userData={userData} />
            ) : groupMode === 1 ? (
              <GroupViewExploreTop />
            ) : (
              <GroupViewVeryTop userData={userData} groupData={groupOneData} />
            )}
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
              {groupMode === 0 ? (
                <HoverImageSpan onClick={() => setShowRecord("show")}>
                  <img src={PrevRecord} draggable={false} />
                  <img
                    className="hover"
                    src={PrevRecordHover}
                    draggable={false}
                  />
                </HoverImageSpan>
              ) : groupMode === 1 ? (
                <HoverImageSpan onClick={() => setJoinModalOpen(true)}>
                  <img src={GroupAdd} draggable={false} />
                  <img
                    className="hover"
                    src={GroupAddHover}
                    draggable={false}
                  />
                </HoverImageSpan>
              ) : (
                <HoverImageSpan onClick={() => setShowGroupRecord("show")}>
                  <img src={PrevRecord} draggable={false} />
                  <img
                    className="hover"
                    src={PrevRecordHover}
                    draggable={false}
                  />
                </HoverImageSpan>
              )}
            </TopBlock.left>
            <TopBlock.center>
              {groupMode === 0 ? (
                <CurrentLevel>Lv.{+userData.hasDrankLevel + 1}</CurrentLevel>
              ) : (
                groupMode !== 1 && (
                  <CurrentLevel>
                    Lv.{+groupOneData.completeLevel + 1}
                  </CurrentLevel>
                )
              )}
            </TopBlock.center>
            <TopBlock.right>
              <span onClick={() => setGroupMode((prev) => (!prev ? 1 : 0))}>
                <GroupOnOffToggle clicked={groupMode === 0 ? false : true} />
              </span>
            </TopBlock.right>
          </TopBlock.wrapper>
          <MainAreaWrapper>
            {groupMode === 0 ? (
              <>
                <PersonalViewMain />
                <TempText>
                  <div>
                    Today <br />
                    {convertMlToL(userData.todayTotal)}L
                  </div>
                </TempText>
              </>
            ) : groupMode === 1 ? (
              <GroupViewExploreMain />
            ) : (
              <GroupViewMain groupData={groupOneData} />
            )}
          </MainAreaWrapper>
        </div>
      </MyPageWrapper>
      <ModalJoinGroup isOpen={joinModalOpen} setIsOpen={setJoinModalOpen} />
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
