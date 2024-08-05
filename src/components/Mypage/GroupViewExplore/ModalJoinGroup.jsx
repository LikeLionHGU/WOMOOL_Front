import React, { useEffect, useRef, useState } from "react";
import TheModal from "../../TheModal";
import TheButton from "../../../styles/TheButton";
import styled from "styled-components";
import { pretendard } from "../../../styles/fonts";

import ModalWoomoolSvg from "src/assets/modal-woomool-blue.svg";
import FileInit from "src/assets/Mypage-group/file-init.svg";
import FileOk from "src/assets/Mypage-group/file-ok.svg";
import FileDeny from "src/assets/Mypage-group/file-deny.svg";
import WoomoolChar from "src/assets/woomool-char.png";
import { useFetchBe } from "../../../tools/api";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { allGroupsAtom } from "../../../recoil/groupAtoms";

function ModalJoinGroup({ isOpen, setIsOpen, initialCustomValue }) {
  const navigate = useNavigate();

  const [showCustomModal, setShowCustomModal] = useState("initial");
  const [customValue, setCustomValue] = useState("");
  const [createSuccessCode, setCreateSuccessCode] = useState("");
  const [message, setMessage] = useState({
    state: "",
    message: "",
  });
  const [createLoading, setCreateLoading] = useState(false);

  const allGroups = useRecoilValue(allGroupsAtom);

  const fetchBe = useFetchBe();

  const isNameDup = allGroups.find((item) => item.code === customValue);
  const btnStats = !createLoading && message.state === "ok" ? "" : "disabled";

  useEffect(
    () =>
      setMessage({
        state:
          customValue === "" ? "" : customValue && isNameDup ? "ok" : "dup",
        message:
          customValue === ""
            ? "\u00a0"
            : !(customValue && isNameDup)
            ? "존재하지 않는 코드입니다. 다시 한번 입력해주세요."
            : "함께 우물할 준비가 되셨나요?",
      }),
    [customValue, isNameDup]
  );

  // Reset Things
  useEffect(() => {
    setCustomValue("");
    setCreateLoading(false);
    setCustomValue(initialCustomValue || "");
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      setShowCustomModal("show");
    } else {
      setShowCustomModal((prev) => (prev === "initial" ? "initial" : "hidden"));
    }
  }, [isOpen]);

  useEffect(() => {
    if (showCustomModal === "show") {
    } else {
      // Hide Modal
      setIsOpen(false);
    }
  }, [showCustomModal]);
  return (
    <TheModal
      openModal={showCustomModal}
      setOpenModal={setShowCustomModal}
      style={{
        // width: "100%",
        maxWidth: createSuccessCode ? 380 : 594,
        padding: createSuccessCode ? 21 : 60,
        boxSizing: "border-box",
      }}
    >
      {createSuccessCode ? (
        <>
          <ModalContent.img src={ModalWoomoolSvg} />
          <ModalContent.header>그룹에 가입되었어요!</ModalContent.header>
          <ModalContent.content>
            <img src={WoomoolChar} draggable={false} />
            <div style={{ marginBottom: 11 }}>
              소중한 사람들과 함께 우물해요
            </div>
            <TheButton
              onClick={() => {
                // Redirect to createdSuccessCode
                navigate("/group/" + createSuccessCode);
                setCreateSuccessCode("");
                setIsOpen(false);
              }}
            >
              그룹 확인하러 가기
            </TheButton>
          </ModalContent.content>
        </>
      ) : (
        <>
          <ModalContent.img src={ModalWoomoolSvg} />
          <ModalContent.header style={{ paddingBottom: 49 }}>
            함께 우물할 그룹 참여하기
          </ModalContent.header>
          <ModalContent.content>
            <InputSection className={message.state}>
              <CustomModalInput
                value={customValue}
                onChange={(e) => setCustomValue(e.target.value.toUpperCase())}
                placeholder="그룹 참여 코드를 입력해주세요"
              />
              <div className="name-msg">{message.message || "\u00A0"}</div>
            </InputSection>

            <TheButton
              className={btnStats}
              onClick={async () => {
                if (btnStats === "disabled") return;
                setCreateLoading(true);
                // setShowCustomModal("hidden");
                // sendWaterDrink("custom");
                if (!customValue) return alert("No data");
                const createdGrp = await fetchBe("/team/join", "POST", {
                  teamCode: customValue,
                });

                if (
                  createdGrp.message === "해당 그룹에 이미 가입되어 있습니다."
                ) {
                  setMessage({
                    state: "dup",
                    message: "해당 그룹에 이미 가입되어 있습니다.",
                  });
                  return;
                }

                setCreateSuccessCode(createdGrp?.code);
              }}
            >
              그룹 참여하기
            </TheButton>
          </ModalContent.content>
        </>
      )}
    </TheModal>
  );
}

export default ModalJoinGroup;

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
    ${pretendard}
    color: #2892c2;

    & > img {
      width: 149px;
    }
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
  margin-bottom: 5px;

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

const InputSection = styled.div`
  margin-bottom: 27px;

  .name-msg {
    /* 중복된 이름입니다. 다름 이름을 입력해주세요. */
    text-align: left;
    padding-left: 15px;
    margin-bottom: 8px;

    ${pretendard}
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    line-height: 14px;
    text-transform: uppercase;

    color: #ea2323;
  }

  &.dup {
    ${CustomModalInput} {
      border-color: #ea2323;
    }
    .name-msg {
    }
  }
  &.ok {
    .name-msg {
      color: #2892c2;
    }
  }
`;
