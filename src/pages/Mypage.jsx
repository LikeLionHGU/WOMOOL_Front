import React, { useState } from "react";
import { useRecoilValue, useResetRecoilState } from "recoil";
import { authJwtAtom } from "../recoil/auth/atoms";

import { NewContainer, NewContainerInnerScroll } from "../styles/Container";

import ModalWoomoolSvg from "src/assets/modal-woomool-blue.svg";
import PrevRecord from "../assets/Mypage/prev-record.svg";
import PrevRecordHover from "../assets/Mypage/prev-record-hover.svg";
import MainMug from "../assets/Mypage/mainmug.svg";

import ImgBottle from "../assets/Mypage/bottle.svg";
import ImgBottleHover from "../assets/Mypage/bottle-hover.svg";
import ImgCup from "../assets/Mypage/cup.svg";
import ImgCupHover from "../assets/Mypage/cup-hover.svg";
import ImgCustom from "../assets/Mypage/custom.svg";
import ImgCustomHover from "../assets/Mypage/custom-hover.svg";
import ImgSip from "../assets/Mypage/sip.svg";
import ImgSipHover from "../assets/Mypage/sip-hover.svg";

import styled from "styled-components";
import { nenu, pretendard } from "../styles/fonts";
import GroupOnOffToggle from "../components/Mypage/GroupOnOffToggle";
import LastLog from "../components/Mypage/LastLog";
import AttendanceCheck from "../components/Mypage/AttendanceCheck";
import Spinner from "../styles/Spinner";
import { useFetchBe } from "../tools/api";
import { userDetailAtom } from "../recoil/userAtoms";
import { convertMlToL, removeNonNumeric } from "../tools/tool";
import TheModal from "../components/TheModal";
import TheButton from "../styles/TheButton";

function Mypage() {
  const resetAuth = useResetRecoilState(authJwtAtom);
  const userData = useRecoilValue(userDetailAtom);
  const fetchBe = useFetchBe();

  const [groupMode, setGroupMode] = useState(false);
  const [showRecord, setShowRecord] = useState("init");
  const [showCustomModal, setShowCustomModal] = useState("initial");
  const [customValue, setCustomValue] = useState("");
  const [loading, setLoading] = useState({
    bottle: false,
    cup: false,
    sip: false,
    custom: false,
  });

  const sendWaterDrink = (type) => {
    const typeDrink = {
      bottle: 500,
      cup: 200,
      sip: 30,
    };
    if (loading[type]) return;

    setLoading((prev) => ({
      ...prev,
      [type]: true,
    }));
    fetchBe("/userRecord/add", "POST", {
      amount: type === "custom" ? customValue : typeDrink[type],
    }).then((json) => {
      if (json.message !== "Successfully Added") {
        alert("Error while adding water");
        return;
      }
      setTimeout(
        setLoading((prev) => ({
          ...prev,
          [type]: false,
        })),
        1500
      );
    });
  };

  return (
    <NewContainerInnerScroll style={{ backgroundColor: "#EDECEB" }}>
      <AttendanceCheck />
      <LastLog show={showRecord} setShow={setShowRecord} />
      <div>
        <button onClick={() => resetAuth()}>로그아웃</button>
      </div>

      <TopBlock.wrapper>
        <TopBlock.left>
          <HoverImageSpan onClick={() => setShowRecord("show")}>
            <img src={PrevRecord} draggable={false} />
            <img className="hover" src={PrevRecordHover} draggable={false} />
          </HoverImageSpan>
        </TopBlock.left>
        <TopBlock.center>
          <LevelIconBox>
            <LevelBoxIconContent.dayNum>
              #{userData.weekDate.toString().padStart(2, "0")}
            </LevelBoxIconContent.dayNum>
            <LevelBoxIconContent.weekNum>
              WEEK {userData.week}
            </LevelBoxIconContent.weekNum>
            <LevelBoxIconContent.desc>
              Drinking
              <br />
              Water
            </LevelBoxIconContent.desc>
          </LevelIconBox>
          <CurrentGoal>
            GOAL {convertMlToL(userData.recommendation)}L
          </CurrentGoal>
          <CurrentLevel>Lv.{userData.hasDrankLevel}</CurrentLevel>
        </TopBlock.center>
        <TopBlock.right>
          <span onClick={() => setGroupMode((prev) => !prev)}>
            <GroupOnOffToggle clicked={groupMode} />
          </span>
        </TopBlock.right>
      </TopBlock.wrapper>
      <MainMugArea>
        <img src={MainMug} />
      </MainMugArea>

      <WaterButtons>
        <WaterButton onClick={() => sendWaterDrink("sip")}>
          <HoverImageSpan className={loading.sip ? "disabled" : ""}>
            <img src={ImgSip} draggable={false} />
            <img className="hover" src={ImgSipHover} draggable={false} />
            <Spinner className="spinner" load={true} />
          </HoverImageSpan>
          <div className="text">한 모금</div>
        </WaterButton>
        <WaterButton onClick={() => sendWaterDrink("cup")}>
          <HoverImageSpan className={loading.cup ? "disabled" : ""}>
            <img src={ImgCup} draggable={false} />
            <img className="hover" src={ImgCupHover} draggable={false} />
            <Spinner className="spinner" load={true} />
          </HoverImageSpan>
          <div className="text">한 컵</div>
        </WaterButton>
        <WaterButton onClick={() => sendWaterDrink("bottle")}>
          <HoverImageSpan className={loading.bottle ? "disabled" : ""}>
            <img src={ImgBottle} draggable={false} />
            <img className="hover" src={ImgBottleHover} draggable={false} />
            <Spinner className="spinner" load={true} />
          </HoverImageSpan>
          <div className="text">한 병</div>
        </WaterButton>
        <WaterButton
          onClick={() => {
            setShowCustomModal("show");
            setCustomValue("");
          }}
        >
          <HoverImageSpan className={loading.custom ? "disabled" : ""}>
            <img src={ImgCustom} draggable={false} />
            <img className="hover" src={ImgCustomHover} draggable={false} />
            <Spinner className="spinner" load={true} />
          </HoverImageSpan>
          <div className="text">직접추가</div>
        </WaterButton>
      </WaterButtons>

      <TheModal
        openModal={showCustomModal}
        setOpenModal={setShowCustomModal}
        style={{
          // width: "100%",
          maxWidth: 594,
          padding: 60,
          boxSizing: "border-box",
        }}
      >
        <ModalContent.img src={ModalWoomoolSvg} />
        <ModalContent.header>무엇을 얼마나 마셨나요?</ModalContent.header>
        <ModalContent.subheader>
          <div className="text">특별하게 마신 수분을 직접 추가해주세요!</div>
        </ModalContent.subheader>
        <ModalContent.content>
          <CustomModalInput
            value={customValue}
            onChange={(e) => setCustomValue(removeNonNumeric(e.target.value))}
            placeholder="수분량(ml)을 입력해주세요"
            pattern="[0-9]*"
            inputMode="numeric"
          />
          <TheButton
            onClick={() => {
              setShowCustomModal("hidden");
              sendWaterDrink("custom");
            }}
          >
            추가하기
          </TheButton>
        </ModalContent.content>
      </TheModal>
    </NewContainerInnerScroll>
  );
}

export default Mypage;

const TopBlock = {
  wrapper: styled.div`
    padding-top: 171px; // Header 없어서 임시
    display: flex;
    align-items: flex-end;
    margin-bottom: 3px;

    & > * {
      /* border: 1px solid red; */
      box-sizing: border-box;
    }

    img {
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
    padding-bottom: 19px;
  `,
  right: styled.div`
    flex: 1 1 150px;
    width: 150px;
    padding-left: 26px;
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
  margin-bottom: 13px;
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

const HoverImageSpan = styled.div`
  position: relative;
  & {
    cursor: pointer;
  }

  & .hover {
    display: none;
  }

  &:not(.disabled) .spinner {
    display: none;
  }

  &:not(.disabled):hover {
    .hover {
      display: inline;
    }
    img:not(.hover) {
      display: none;
    }
  }
`;

const CurrentGoal = styled.div`
  margin-bottom: 18px;
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

const MainMugArea = styled.div`
  text-align: center;
  margin-bottom: 54px;
`;

const WaterButtons = styled.div`
  display: flex;
  justify-content: center;
  padding-bottom: 85px;
`;

const WaterButton = styled.div`
  padding: 8px;
  ${HoverImageSpan} {
    display: block;

    &.disabled img {
      filter: brightness(0) saturate(100%) invert(80%) sepia(0%) saturate(0%)
        hue-rotate(153deg) brightness(97%) contrast(90%);
    }
  }
  .text {
    /* 한 모금 */
    ${pretendard}
    font-style: normal;
    font-weight: 600;
    font-size: 18px;
    line-height: 21px;
    text-align: center;
    text-transform: uppercase;

    color: #000000;
  }
`;

const ModalContent = {
  img: styled.img`
    display: block;
    margin-bottom: 27px;
  `,
  header: styled.div`
    ${pretendard}
    /* 무엇을 얼마나 마셨나요? */

font-style: normal;
    font-weight: 700;
    font-size: 28px;
    line-height: 33px;
    text-align: center;
    text-transform: uppercase;

    color: #2892c2;

    margin-bottom: 11px;
  `,
  subheader: styled.div`
    /* 하단 버튼들을 누를 때마다 다음과 같은 용량으로 계산됩니다 */

    ${pretendard}
    /* 오늘의 출석 도장을 받았습니다 오늘도 우물하러 가볼까요? */

    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 17px;
    text-align: center;
    text-transform: uppercase;

    color: #2892c2;

    & > * {
      margin-bottom: 34px;
    }
  `,
  content: styled.div`
    span.btn {
      cursor: pointer;
    }

    span.btn .hover {
      display: none;
    }

    span.btn:hover .hover {
      display: inline;
    }

    span.btn:hover img:not(.hover) {
      display: none;
    }
  `,
};

const CustomModalInput = styled.input`
  /* Rectangle 72 */

  width: 274px;
  height: 46px;

  padding: 12px;
  margin-bottom: 58px;

  box-sizing: border-box;

  background-color: transparent;
  border: 1px solid #2892c2;
  border-radius: 5px;

  /* 수분량(ml)을 입력해주세요 */

  ${pretendard}
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 19px;
  /* identical to box height */

  color: #000;

  &:focus {
    outline: none;
  }
`;
