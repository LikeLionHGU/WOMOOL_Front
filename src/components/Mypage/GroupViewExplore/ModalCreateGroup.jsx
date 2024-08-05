import React, { useEffect, useRef, useState } from "react";
import TheModal from "../../TheModal";
import TheButton from "../../../styles/TheButton";
import styled from "styled-components";
import { pretendard } from "../../../styles/fonts";

import ModalWoomoolSvg from "src/assets/modal-woomool-blue.svg";
import FileInit from "src/assets/Mypage-group/file-init.svg";
import FileOk from "src/assets/Mypage-group/file-ok.svg";
import FileDeny from "src/assets/Mypage-group/file-deny.svg";
import { useFetchBe } from "../../../tools/api";
import { useNavigate } from "react-router-dom";

function ModalCreateGroup({ isOpen, setIsOpen, allGroups }) {
  const navigate = useNavigate();

  const [showCustomModal, setShowCustomModal] = useState("initial");
  const [customValue, setCustomValue] = useState("");
  const [image, setImage] = useState();
  const [createSuccessCode, setCreateSuccessCode] = useState("");
  const [createLoading, setCreateLoading] = useState(false);

  const fetchBe = useFetchBe();

  const isNameDup = allGroups.find((item) => item.name === customValue);
  const nameStats = customValue && !isNameDup ? "ok" : isNameDup ? "dup" : "";
  const btnStats =
    !createLoading && image && nameStats === "ok" ? "" : "disabled";

  // Reset Things
  useEffect(() => {
    setImage(null);
    setCustomValue("");
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
      setIsOpen("");
    }
  }, [showCustomModal]);
  return (
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
      {createSuccessCode ? (
        <>
          <ModalContent.img src={ModalWoomoolSvg} />
          <ModalContent.header>그룹이 생성되었어요!</ModalContent.header>
          <ModalContent.content>
            <div>소중한 사람들과 함께 우물해요</div>

            <TheButton
              onClick={() => {
                // Redirect to createdSuccessCode
                navigate("/group/" + createSuccessCode);
              }}
            >
              그룹 확인하러 가기
            </TheButton>
          </ModalContent.content>
        </>
      ) : (
        <>
          <ModalContent.img src={ModalWoomoolSvg} />
          <ModalContent.header>함께 우물할 그룹 생성하기</ModalContent.header>
          <ModalContent.content>
            <InputSection className={nameStats}>
              <CustomModalInput
                value={customValue}
                onChange={(e) => setCustomValue(e.target.value)}
                placeholder="그룹명을 입력해주세요"
              />
              <div className="name-msg">
                {nameStats == "dup"
                  ? "중복된 이름입니다. 다름 이름을 입력해주세요."
                  : "누구라도 함께 우물하고 싶은 이름이네요! "}
              </div>

              <UploadImageBtn file={image} setFile={setImage} />
            </InputSection>

            <TheButton
              className={btnStats}
              onClick={async () => {
                if (btnStats === "disabled") return;
                setCreateLoading(true);
                // setShowCustomModal("hidden");
                // sendWaterDrink("custom");
                if (!image || !customValue) return alert("No data");
                console.log(image, customValue);
                const formData = new FormData();
                formData.append("image", image);
                formData.append("name", customValue);
                const createdGrp = await fetchBe(
                  "/team/create",
                  "POST",
                  formData
                );
                if (
                  createdGrp.message ===
                  "이미 존재하는 그룹이름입니다. 다른 이름으로 입력해주세요"
                ) {
                  alert("이름이 중복됩니다.");
                  return;
                }
                if (!createdGrp?.code) return;
                await fetchBe("/team/join", "POST", {
                  teamCode: createdGrp?.code,
                });
                setCreateSuccessCode(createdGrp?.code);
              }}
            >
              그룹 생성하기
            </TheButton>
          </ModalContent.content>
        </>
      )}
    </TheModal>
  );
}

export default ModalCreateGroup;

const UploadImageBtn = ({ file: rootFile, setFile: setRootFile }) => {
  const [file, setFile] = useState(rootFile);
  const [message, setMessage] = useState("");
  const fileInputRef = useRef();

  useEffect(() => setFile(rootFile), [rootFile]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.size < 1048576) {
      // 1MB = 1048576 bytes
      setFile(selectedFile);
      setRootFile(selectedFile);
      setMessage("");
    } else {
      setMessage("File size should be less than 1MB");
    }
  };
  return (
    <UploadImageWrap>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
      <div className="text" onClick={() => fileInputRef.current?.click()}>
        <div>대표 이미지 업로드하기</div>
        <img
          src={file ? FileOk : message ? FileDeny : FileInit}
          draggable={false}
        />
      </div>
      <div className="message">{message || "\u00A0"}</div>
    </UploadImageWrap>
  );
};

const ModalContent = {
  img: styled.img`
    display: block;
    margin-bottom: 27px;
  `,
  header: styled.div`
    ${pretendard}
    padding-bottom: 49px;

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

const UploadImageWrap = styled.div`
  .text {
    margin-bottom: 4px;
    cursor: pointer;

    display: flex;
    justify-content: center;
    align-items: center;
    gap: 9px;

    ${pretendard}
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    /* identical to box height */
    text-decoration-line: underline;
    text-transform: uppercase;

    color: #2892c2;
  }
  .message {
    margin-bottom: 26px;
    font-size: 12px;
  }
`;

const InputSection = styled.div`
  margin-bottom: 27px;

  .name-msg {
    /* 중복된 이름입니다. 다름 이름을 입력해주세요. */
    visibility: hidden;
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
      visibility: visible;
    }
  }
  &.ok {
    .name-msg {
      visibility: visible;
      color: #2892c2;
    }
  }
`;
