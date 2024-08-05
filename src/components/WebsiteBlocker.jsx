import React, { useEffect, useState } from "react";
import TheModal from "./TheModal";
import { pretendard } from "../styles/fonts";
import ModalWoomoolSvg from "src/assets/header-logo.svg";
import styled from "styled-components";

function WebsiteBlocker({ children: Children }) {
  const [display, setDisplay] = useState("initial");
  const [countDown, setCountDown] = useState("");
  useEffect(() => {
    const checkTime = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();

      if (hours === 23 && minutes >= 55) {
        setDisplay("show");
        const nextMidnight = new Date();
        nextMidnight.setHours(24, 0, 0, 0); // Set time to 00:00:00 of the next day

        const timeDifference = nextMidnight - now;
        const timeRemaining = new Date(timeDifference);

        const minutesRemaining = timeRemaining.getUTCMinutes();
        const secondsRemaining = timeRemaining.getUTCSeconds();

        setCountDown(
          `${minutesRemaining.toString().padStart(2, "0")}:${secondsRemaining
            .toString()
            .padStart(2, "0")}`
        );
      } else {
        if (display === "show") {
          window.location.reload();
        }
      }
    };

    const interval = setInterval(checkTime, 1000); // Check every second
    return () => clearInterval(interval);
  }, []);
  return (
    <>
      {Children}
      <TheModal
        openModal={display}
        backdropStyle={{ backgroundColor: "rgba(0,0,0,0.7)" }}
        setOpenModal={() => {}}
      >
        <ModalContent.img src={ModalWoomoolSvg} />
        <ModalContent.header>서버 점검중입니다</ModalContent.header>
        <ModalContent.subheader>
          <div className="text">
            매일 23:55 ~ 00:00 까지는 기록을 저장하기 위해
            <br />
            서버 점검이 진행됩니다.
          </div>
          <div className="text countdown">{countDown}</div>
        </ModalContent.subheader>
      </TheModal>
    </>
  );
}

export default WebsiteBlocker;

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

    color: white;

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

    color: white;

    & > .text:not(:last-child) {
      margin-bottom: 34px;
    }
    .countdown {
      font-size: 3em;
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
