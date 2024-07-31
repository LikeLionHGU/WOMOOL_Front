import React, { useEffect, useState } from "react";
import { useRecoilValue, useResetRecoilState } from "recoil";
import { authJwtAtom } from "../recoil/auth/atoms";
import { Navigate, useNavigate } from "react-router-dom";
import { fetchBe } from "../tools/api";
import { NewContainer } from "../styles/Container";
import styled from "styled-components";
import { pretendard, timesNewRoman } from "../styles/fonts";

import SelectMyCupBtn from "../assets/NewUserCup/select-my-cup-btn.svg";

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

  // Handle Not Logged In User
  if (!jwtValue) return <Navigate to="/" />;
  return (
    <NewContainer>
      <HeaderBanner.container>
        <HeaderBanner.header>
          choose a weapon <br />
          for the challenge
        </HeaderBanner.header>
        <HeaderBanner.subheader>
          도전을 수행할 자신만의 컵을 골라 보세요 (*프로필 수정 시 변경 가능)
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
                <img src={SelectMyCupBtn} />
              </CupItemData.right>
            </CupItem.body>
          </CupItem.wrapper>
        ))}
      </CupSelectionContainer>
    </NewContainer>
  );
}

export default NewUserCup;

const HeaderBanner = {
  container: styled.div`
    padding: 36px 54px;
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

    padding: 24px 0;

    border-bottom: 1px solid #2892c2;
    border-top: 1px solid #2892c2;

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
  `,
  body: styled.div`
    display: flex;
    align-items: center;

    /* padding: 48px 0; */

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
    }
  `,
};
