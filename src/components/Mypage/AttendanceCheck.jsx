import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { userDetailAtom } from "../../recoil/userAtoms";
import TheModal from "../TheModal";
import styled from "styled-components";

import ModalWoomoolSvg from "src/assets/modal-woomool-blue.svg";
import { pretendard } from "../../styles/fonts";
import TheButton from "../../styles/TheButton";
import { fetchBe } from "../../tools/api";
import { authJwtAtom } from "../../recoil/auth/atoms";

function AttendanceCheck() {
  const [open, setOpen] = useState("initial");
  const userData = useRecoilValue(userDetailAtom);
  const jwtValue = useRecoilValue(authJwtAtom);

  useEffect(() => {
    if (userData?.attendance) return;
    setTimeout(() => setOpen("show"), 1000);
  }, []);
  useEffect(() => {
    if (open !== "hidden") return;
    fetchBe(jwtValue, "/userDetail/attendance", "PATCH");
  }, [open]);

  return (
    <TheModal openModal={open} setOpenModal={setOpen}>
      <ModalContent.img src={ModalWoomoolSvg} />
      <ModalContent.header>오늘의 첫 모금</ModalContent.header>
      <ModalContent.subheader>
        <div className="text">
          오늘의 출석 도장을 받았습니다
          <br />
          오늘도 우물하러 가볼까요?
        </div>
      </ModalContent.subheader>
      <ModalContent.content>
        <TheButton onClick={() => setOpen("hidden")}>좋아 가보자고!</TheButton>
      </ModalContent.content>
    </TheModal>
  );
}

export default AttendanceCheck;

const ModalContent = {
  img: styled.img`
    display: block;
    margin-bottom: 27px;
  `,
  header: styled.div`
    ${pretendard}
    font-style: normal;
    font-weight: 700;
    font-size: 20px;
    line-height: 24px;
    /* identical to box height */
    text-align: center;
    text-transform: uppercase;

    color: #2892c2;

    margin-bottom: 40px;
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
      margin-bottom: 37px;
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
