import React, { useEffect, useState } from "react";
import { useRecoilValue, useResetRecoilState } from "recoil";
import { authJwtAtom } from "../recoil/auth/atoms";
import { Navigate, useNavigate } from "react-router-dom";
import { fetchBe } from "../tools/api";
import { NewContainer } from "../styles/Container";
import styled from "styled-components";
import { pretendard, timesNewRoman } from "../styles/fonts";
import TheModal from "../components/TheModal";

import SelectMyCupBtn from "../assets/NewUserCup/select-my-cup-btn.svg";
import SelectMyCupBtnHover from "../assets/NewUserCup/select-my-cup-btn-hover.svg";
import ModalSample from "../assets/NewUserCup/modal/sample.svg";
import ModalConfirm from "../assets/NewUserCup/modal/confirm.svg";
import ModalConfirmHover from "../assets/NewUserCup/modal/confirm-hover.svg";
import ModalWoomoolSvg from "../assets/modal-woomool-blue.svg";
import Header from "../components/Header";

const cupType = [
  {
    id: 1,
    title: "Lucky cup",
    description: "한 컵 마실수록 행복해지는 컵",
    cupImage: "/cups/1.svg",
  },
  {
    id: 2,
    title: "Cloudy cup",
    description: "한 컵 마실수록 몽글몽글해지는 컵",
    cupImage: "/cups/1.svg",
  },
];

function NewUserCup() {
  const navigate = useNavigate();

  const jwtValue = useRecoilValue(authJwtAtom);
  const resetAuth = useResetRecoilState(authJwtAtom);

  const [clickedId, setClickedId] = useState(1);

  const [hintModal, setHintModal] = useState("initial");

  // 이미 컵을 선택했는지는 딱히 확인할 필요가 없음. 선택한 적이 있으면 덮어 씌우면 됨.
  // (백이 그렇게 처리 가능하다면...)

  // User have no profile
  useEffect(() => {
    if (!jwtValue) return;
    fetchBe(jwtValue, "/userDetail/get")
      .then((json) => {
        if (!json.weight) navigate("/newuser", { replace: true });
      })
      .catch((e) => setUserDataError(e.message));
  }, [jwtValue]);

  // modal 이 hidden 되면 그냥 냅다 redirect
  useEffect(() => {
    if (hintModal === "hidden") navigate("/");
  }, [hintModal]);

  // Handle Not Logged In User
  if (!jwtValue) return <Navigate to="/" />;
  return (
    <NewContainer
      style={{
        paddingBottom: 64,
        wordBreak: "keep-all",
      }}
    >
      <Header
        loggedIn={true}
        style={{
          position: "relative",
          color: "#2892C2",
          width: "100%",
        }}
      />
      <HeaderBanner.container>
        <HeaderBanner.header>
          choose a weapon <br />
          for the challenge
        </HeaderBanner.header>
        <HeaderBanner.subheader>
          도전을 수행할 자신만의 컵을 골라 보세요{" "}
          <span className="newln">(*프로필 수정 시 변경 가능)</span>
        </HeaderBanner.subheader>
      </HeaderBanner.container>
      <CupSelectionContainer>
        {cupType.map((cup) => (
          <CupItem.wrapper key={`cup-${cup.id}`}>
            <CupItem.header
              onClick={() => setClickedId(cup.id)}
              onMouseOver={() => setClickedId(cup.id)}
            >
              <CupItemData.left>{cup.title}</CupItemData.left>
              <CupItemData.right>{cup.description}</CupItemData.right>
            </CupItem.header>
            <CupItem.body $clicked={clickedId === cup.id}>
              <CupItemData.left>
                <img src={`/assets/${cup.cupImage}`} />
              </CupItemData.left>
              <CupItemData.right>
                <span
                  onClick={() => {
                    setHintModal("show");
                    fetchBe(jwtValue, "/userDetail/updateCup", "PATCH", {
                      cup: cup.id,
                    }).then((json) => {
                      if (json.cup !== cup.id) {
                        alert(
                          "Something went wrong. Redirect you to home page."
                        );
                        location.href = "/";
                      }
                    });
                  }}
                >
                  <img src={SelectMyCupBtn} draggable={false} />
                  <img
                    className="hover"
                    src={SelectMyCupBtnHover}
                    draggable={false}
                  />
                </span>
              </CupItemData.right>
            </CupItem.body>
          </CupItem.wrapper>
        ))}
      </CupSelectionContainer>
      <TheModal
        openModal={hintModal}
        setOpenModal={setHintModal}
        style={{ maxWidth: 594 }}
      >
        <ModalContent.img src={ModalWoomoolSvg} />
        <ModalContent.header>하루에 얼마나 물을 마시나요?</ModalContent.header>
        <ModalContent.subheader>
          <div className="text">
            하단 버튼들을 누를 때마다 다음과 같은 용량으로 계산됩니다
          </div>
          <div>
            <img src={ModalSample} draggable={false} />
          </div>
        </ModalContent.subheader>
        <ModalContent.content>
          <span
            className="btn"
            onClick={() => {
              setHintModal("hidden");
            }}
          >
            <img src={ModalConfirm} draggable={false} />
            <img className="hover" src={ModalConfirmHover} draggable={false} />
          </span>
        </ModalContent.content>
      </TheModal>
    </NewContainer>
  );
}

export default NewUserCup;

const HeaderBanner = {
  container: styled.div`
    padding: 36px 13px;
    margin: 0 41px;
    border-bottom: 1px solid #2892c2;
  `,
  header: styled.div`
    /* choose a weapon for the challenge */

    ${timesNewRoman}
    font-style: normal;
    font-weight: 700;
    font-size: 36px;
    line-height: 41px;
    text-transform: uppercase;

    color: #000000;

    margin-bottom: 24px;
  `,
  subheader: styled.div`
    /* 도전을 수행할 자신만의 컵을 골라 보세요 (*프로필 수정 시 변경 가능) */

    ${pretendard}
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 19px;
    /* identical to box height */
    text-transform: uppercase;

    color: #000000;

    @media (max-width: 530px) {
      span.newln {
        margin-top: 4px;
        display: block;
      }
    }
  `,
};

const CupSelectionContainer = styled.div``;

const CupItemData = {
  left: styled.div``,
  right: styled.div``,
};

const CupItem = {
  wrapper: styled.div`
    padding: 0 41px;
  `,
  header: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-end;

    padding: 24px 13px;

    cursor: pointer;

    ${CupItemData.left} {
      /* Lucky cup */

      ${timesNewRoman}
      font-style: normal;
      font-weight: 700;
      font-size: 48px;
      line-height: 55px;
      text-transform: capitalize;

      color: #000000;
    }

    ${CupItemData.right} {
      /* 한 컵 마실수록 행복해지는 컵 */
      ${pretendard}
      font-style: normal;
      font-weight: 600;
      font-size: 16px;
      line-height: 19px;
      /* identical to box height */
      text-transform: uppercase;

      color: #000000;
    }

    @media (max-width: 530px) {
      display: block;
      ${CupItemData.left} {
        margin-bottom: 8px;
      }
      /* flex-direction: column; */
      /* height: ${(props) => (props.$clicked ? "453px" : "0")}; */
      /* height: auto; */
    }
  `,
  body: styled.div`
    display: flex;
    align-items: center;

    /* padding: 48px 0; */

    box-sizing: border-box;
    border-bottom: 1px solid #2892c2;
    border-top: ${(props) => (props.$clicked ? "1px solid #2892c2" : "0")};

    transition: height 0.3s ease-in-out;
    overflow: hidden;
    height: ${(props) => (props.$clicked ? "328px" : "0")};

    & > div {
      margin: 35px;
    }

    ${CupItemData.left} {
      flex-shrink: 0;
      width: 333px;
    }

    ${CupItemData.right} {
      span {
        cursor: pointer;
      }

      span .hover {
        display: none;
      }

      span:hover .hover {
        display: inline;
      }

      span:hover img:not(.hover) {
        display: none;
      }
    }

    @media (max-width: 750px) {
      /* display: block; */
      flex-direction: column;
      height: ${(props) => (props.$clicked ? "453px" : "0")};
      /* height: auto; */
    }
  `,
};

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
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 17px;
    text-align: center;
    text-transform: uppercase;

    color: #2892c2;

    & > * {
      margin-bottom: 27px;
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
