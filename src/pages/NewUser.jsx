import React, { useEffect, useState } from "react";
import { useRecoilValue, useResetRecoilState } from "recoil";
import { authJwtAtom } from "../recoil/auth/atoms";
import { Navigate, useNavigate } from "react-router-dom";
import { NewContainer } from "../styles/Container";
import styled from "styled-components";
import { pretendard, timesNewRoman } from "../styles/fonts";

import ReadyWoomoolImg from "../assets/NewUser/ReadyWoomool.svg";
import { removeNonNumeric } from "../tools/tool";
import { fetchBe } from "../tools/api";

function NewUser() {
  const navigate = useNavigate();

  const jwtValue = useRecoilValue(authJwtAtom);
  const resetAuth = useResetRecoilState(authJwtAtom);

  const [userInputState, setUserInputState] = useState({
    nickname: "",
    height: null,
    weight: null,
  });

  const [nickNameState, setNicknameState] = useState({
    status: "",
    lastNickname: "",
    errorMessage: "",
  });

  // User Already have profile
  useEffect(() => {
    if (!jwtValue) return;
    fetchBe(jwtValue, "/userDetail/get")
      .then((json) => {
        if (json.weight) navigate("/");
      })
      .catch((e) => setUserDataError(e.message));
    fetchBe(jwtValue, "/user/get").then(({ nickName }) => {
      if (nickName) {
        setNicknameState({
          status: "ok",
          lastNickname: nickName,
        });
        setUserInputState((prev) => ({
          ...prev,
          nickname: nickName,
        }));
      }
    });
  }, [jwtValue]);

  // Handle Not Logged In User
  if (!jwtValue) return <Navigate to="/" />;

  return (
    <NewContainer>
      <button onClick={() => resetAuth()}>로그아웃</button>
      <MainBanner.main>
        <MainBanner.header>Let's drink water together</MainBanner.header>
        <MainBanner.subheader>
          <b>우</b>리 같이 <b>물</b> 마셔요
        </MainBanner.subheader>
      </MainBanner.main>
      <BlueHr />
      <InputTextSection.main>
        <InputTextSection.left>
          <InputTextItem.headerLabel>
            What’s
            <br /> your name?
          </InputTextItem.headerLabel>
          <InputTextItem.descriptionLabel>
            자신을 가장 잘 나타내는 이름을 알려주세요
          </InputTextItem.descriptionLabel>
        </InputTextSection.left>
        <InputTextSection.right>
          <div
            className={
              nickNameState.status === ""
                ? ""
                : nickNameState.status === "ok"
                ? "good"
                : "warn"
            }
          >
            <InputTextItem.inputArea
              placeholder="닉네임을 입력해주세요"
              value={userInputState.nickname || ""}
              onChange={(e) =>
                setUserInputState((prev) => ({
                  ...prev,
                  nickname: e.target.value,
                }))
              }
              onBlur={() => {
                if (userInputState.nickname === nickNameState.lastNickname)
                  return;
                fetchBe(jwtValue, "/user/nickname", "POST", {
                  nickName: userInputState.nickname,
                })
                  .then(({ nickName, status, message }) => {
                    if (status === 400) {
                      setNicknameState({ status: "dup" });
                    } else if (nickName) {
                      setNicknameState({
                        status: "ok",
                        lastNickname: nickName,
                      });
                    } else if (status === 500) {
                      setNicknameState({
                        status: "err",
                        errorMessage: message || "Unknown Error",
                      });
                    }
                  })
                  .catch((err) =>
                    setNicknameState({
                      errorMessage: err.message,
                      status: "err",
                    })
                  );
                // fetch(serverRootUrl + "/user/nickname", {
                //   headers: {
                //     Authorization: `Bearer ${jwtValue}`,
                //     "Content-Type": "application/json",
                //   },
                //   method: "POST",
                //   body: JSON.stringify({ nickName: userInputState.nickname }),
                // })
                //   .then((data) =>
                //     data.json().then(({ nickName, status }) => {
                //   console.log(data);
                //   if (status === 400) {
                //     setNicknameState({ status: "dup" });
                //   } else if (nickName) {
                //     setNicknameState({
                //       status: "ok",
                //       lastNickname: nickName,
                //     });
                //   }
                // })
                //   )
                //   .catch((err) =>
                // setNicknameState({
                //   errorMessage: err.message,
                //   status: "err",
                // })
                //   );
              }}
            />
            <InputTextItem.warning className="display">
              {nickNameState.status === "dup"
                ? "중복된 이름입니다. 다름 이름을 입력해주세요."
                : nickNameState.status === "ok"
                ? "멋진 이름이네요! 같이 물 마시러 가볼까요?"
                : nickNameState.status === "err"
                ? nickNameState.errorMessage
                : "Something Went Wrong"}
            </InputTextItem.warning>
          </div>
        </InputTextSection.right>
      </InputTextSection.main>
      <BlueHr />
      <InputTextSection.main>
        <InputTextSection.left>
          <InputTextItem.headerLabel style={{ fontSize: 32 }}>
            What’s the right amount of water for you?
          </InputTextItem.headerLabel>
          <InputTextItem.descriptionLabel>
            자신에게 맞는 수분 섭취량을 알 수 있어요
          </InputTextItem.descriptionLabel>
        </InputTextSection.left>
        <InputTextSection.right>
          <div
            className={
              userInputState.height === null
                ? ""
                : +removeNonNumeric(userInputState.height) >= 140 &&
                  +removeNonNumeric(userInputState.height) <= 220
                ? "good"
                : "warn"
            }
          >
            <InputTextItem.inputArea
              placeholder="키(cm)를 입력해주세요"
              // type="number"
              pattern="[0-9]*"
              inputMode="numeric"
              min="140"
              max="220"
              value={userInputState.height || ""}
              onChange={(e) =>
                setUserInputState((prev) => ({
                  ...prev,
                  height: removeNonNumeric(e.target.value),
                }))
              }
              onBlur={() => {
                setUserInputState((prev) => ({
                  ...prev,
                  height: prev.height || "",
                }));
              }}
            />
            <InputTextItem.warning>
              140-220 사이의 값을 입력해주세요
            </InputTextItem.warning>
          </div>
          <div
            className={
              userInputState.weight === null
                ? ""
                : +removeNonNumeric(userInputState.weight) >= 30 &&
                  +removeNonNumeric(userInputState.weight) <= 200
                ? "good"
                : "warn"
            }
          >
            <InputTextItem.inputArea
              placeholder="몸무게(kg)를 입력해주세요"
              // type="number"
              pattern="[0-9]*"
              inputMode="numeric"
              min="30"
              max="200"
              value={userInputState.weight || ""}
              onChange={(e) =>
                setUserInputState((prev) => ({
                  ...prev,
                  weight: removeNonNumeric(e.target.value),
                }))
              }
              onBlur={() => {
                setUserInputState((prev) => ({
                  ...prev,
                  weight: prev.weight || "",
                }));
              }}
            />
            <InputTextItem.warning>
              30-200 사이의 값을 입력해주세요
            </InputTextItem.warning>
          </div>
        </InputTextSection.right>
      </InputTextSection.main>
      <BottomButtonArea>
        <img
          src={ReadyWoomoolImg}
          onClick={() => {
            if (nickNameState.status !== "ok") return;
            if (
              !(
                +removeNonNumeric(userInputState.height) >= 140 &&
                +removeNonNumeric(userInputState.height) <= 220
              )
            )
              return;
            if (
              !(
                +removeNonNumeric(userInputState.weight) >= 30 &&
                +removeNonNumeric(userInputState.weight) <= 200
              )
            )
              return;
            fetchBe(jwtValue, "/userDetail/add", "POST", {
              height: userInputState.height,
              weight: userInputState.weight,
            })
              .then((json) => {
                if (json.message?.includes("Duplicate entry")) {
                  window.location.href = "/"; // Hard reload as something went wrong
                  return;
                }
                if (json.height) {
                  navigate("/newusercup");
                  return;
                }
                // Something went really wrong
                alert("Something went really wrong. Redirect you to home page");
                window.location.href = "/"; // Hard reload as something went wrong

                console.log(json);
              })
              .catch((err) => console.log(err));
          }}
        />
      </BottomButtonArea>
    </NewContainer>
  );
}

export default NewUser;

const MainBanner = {
  main: styled.div`
    height: 323px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
  `,
  header: styled.div`
    ${timesNewRoman}
    text-transform: uppercase;
    font-weight: bold;
    font-size: 38px;
    margin-bottom: 42px;
  `,
  subheader: styled.div`
    ${pretendard}
    font-size: 24px;
  `,
};

const BlueHr = styled.hr`
  border-color: #2892c2;
`;

const InputTextItem = {
  headerLabel: styled.div`
    ${timesNewRoman}
    font-weight: bold;
    font-size: 36px;
    line-height: 41px;
    margin-bottom: 22px;
    text-transform: uppercase;
  `,
  descriptionLabel: styled.div`
    ${pretendard}
    font-weight: 600;
  `,
  inputArea: styled.input`
    ${pretendard}
    width: 100%;
    padding: 14px 5px;
    font-size: 20px;
    border-width: 0 0 1px;
    border-color: #9e9e9e;
  `,
  warning: styled.div`
    ${pretendard}
    margin-top: 7px;
    font-weight: 500;
    font-size: 12px;
    display: none;
  `,
};

const InputTextSection = {
  main: styled.div`
    display: flex;
    height: 246px;

    padding-left: 54px;
    padding-right: 41px;
    padding-top: 30px;
    padding-bottom: 30px;
  `,
  left: styled.div`
    border-right: 1px solid #2892c2;
    width: 382px;
    padding-top: 10px;
    flex-shrink: 0;
  `,
  right: styled.div`
    padding: 12px;
    padding-top: 12px;
    flex-grow: 1;

    & > div {
      margin-bottom: 26px;
    }

    .warn {
      ${InputTextItem.inputArea} {
        border-color: #ea2323;
      }

      ${InputTextItem.warning} {
        display: block;
        color: #ea2323;
      }
    }

    .good {
      ${InputTextItem.inputArea} {
        border-color: #2892c2;
      }

      ${InputTextItem.warning}.display {
        display: block;
        color: #2892c2;
      }
    }
  `,
  // centerBorder: styled.div`
  //   height: 100%;
  //   width: 1px;
  //   background-color: #2892c2;
  //   flex-shrink: 0; /* Prevents the line from shrinking */
  // `,
};

const BottomButtonArea = styled.div`
  text-align: center;
  padding-top: 9px;
  padding-bottom: 44px;
  img {
    cursor: pointer;
  }
`;
