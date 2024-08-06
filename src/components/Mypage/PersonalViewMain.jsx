import React, { useState } from "react";
import MainMug from "src/assets/Mypage/mainmug.svg";
import CountUp from "react-countup";

import ImgBottle from "src/assets/Mypage/bottle.svg";
import ImgBottleHover from "src/assets/Mypage/bottle-hover.svg";
import ImgCup from "src/assets/Mypage/cup.svg";
import ImgCupHover from "src/assets/Mypage/cup-hover.svg";
import ImgCustom from "src/assets/Mypage/custom.svg";
import ImgCustomHover from "src/assets/Mypage/custom-hover.svg";
import ImgSip from "src/assets/Mypage/sip.svg";
import ImgSipHover from "src/assets/Mypage/sip-hover.svg";
import ModalWoomoolSvg from "src/assets/modal-woomool-blue.svg";

import Spinner from "src/styles/Spinner";

import { nenu, pretendard } from "src/styles/fonts";
import TheModal from "../TheModal";
import { useFetchBe } from "../../tools/api";
import styled from "styled-components";

import { convertMlToL, removeNonNumeric } from "src/tools/tool";
import TheButton from "src/styles/TheButton";
import { HoverImageSpan } from "../../styles/stylePresets";
import { useRecoilState, useSetRecoilState } from "recoil";
import { userDetailAtom } from "../../recoil/userAtoms";
import { FloatEffect } from "../../styles/FloatEffect";
import FloatingDiv from "../FloatingDiv";

function PersonalViewMain() {
  const fetchBe = useFetchBe();

  const [userData, setUserData] = useRecoilState(userDetailAtom);
  const [loading, setLoading] = useState({
    bottle: false,
    cup: false,
    sip: false,
    custom: false,
  });

  const [showCustomModal, setShowCustomModal] = useState("initial");
  const [customValue, setCustomValue] = useState("");

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
      fetchBe("/userDetail/get").then((json) => {
        setUserData(json);
      });
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
    <>
      <FloatingDiv maxDistance={10} maxTilt={5} interval={1000}>
        <MainMugArea>
          <img src={`/assets/cups/1.png`} />
          <div>
            <TextDrank>
              <div className="small">TODAY</div>
              <div>
                <CountUp
                  end={convertMlToL(userData.todayTotal) || 0}
                  duration={3}
                  decimals={2}
                  preserveValue={true}
                />
                L
              </div>
            </TextDrank>
          </div>
        </MainMugArea>
      </FloatingDiv>

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
    </>
  );
}

export default PersonalViewMain;

const MainMugArea = styled.div`
  position: relative;
  max-width: 380px;
  text-align: center;
  margin: auto;
  margin-top: -20px;
  margin-bottom: 54px;
  transition: margin-bottom 300ms;
  @media (max-width: 750px) {
    margin-bottom: 20px;
  }
  img {
    width: 100%;
  }
  & > div {
    position: absolute;
    bottom: 0;
    top: 0;
    right: 0;
    left: 0;
    margin: auto;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    margin-left: 70px;
    margin-bottom: 80px;
  }
`;

const WaterButtons = styled.div`
  display: flex;
  justify-content: center;
  /* padding-bottom: 85px; */
`;

const WaterButton = styled.div`
  padding: 8px;
  ${HoverImageSpan} {
    display: block;

    &.disabled img {
      filter: brightness(0) saturate(100%) invert(80%) sepia(0%) saturate(0%)
        hue-rotate(153deg) brightness(97%) contrast(90%);
    }
    @media (max-width: 750px) {
      img {
        width: 63px;
      }
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

const TextDrank = styled.div`
  ${pretendard}
  font-style: normal;
  font-weight: 600;
  font-size: 70px;
  /* identical to box height */
  text-align: center;
  text-transform: uppercase;

  .small {
    font-size: 33px;
  }

  color: #000000;
`;
