import { useRecoilValue, useResetRecoilState } from "recoil";
import styled from "styled-components";
import { authJwtAtom } from "../recoil/auth/atoms";
import Header from "../components/Header";
import { Container } from "../styles/Container";

import MainWoomoolText from "../assets/MainHome/Section1/main-woomol-text.svg";
import MainPointDownImg from "../assets/MainHome/Section1/main-point-down.svg";
import MainEntertheRoomImg from "../assets/MainHome/Section1/main-EntertheRoom.svg";
import MainCupImg from "../assets/MainHome/Section2/Cup.jpg";

function Home() {
  const jwtValue = useRecoilValue(authJwtAtom);
  const resetAuth = useResetRecoilState(authJwtAtom);
  return (
    <Container>
      <MainHomeSection1>
        <Header />
        <MainFeatureComp.main>
          <MainFeatureComp.subtext>
            물 마시는 습관, 서로 공유하여 `우물`해요
          </MainFeatureComp.subtext>
          <MainFeatureComp.img src={MainWoomoolText} />
          <MainEnterTheRoom.main>
            <MainEnterTheRoom.emptyspace />
            <MainEnterTheRoom.img src={MainEntertheRoomImg} />
          </MainEnterTheRoom.main>
        </MainFeatureComp.main>
        <MainPointDown src={MainPointDownImg} />
        <MainHomeVid>
          <MainHomeBackShade />
          <video autoPlay muted loop>
            <source src="assets/water-back-vid.webm" type="video/webm" />
          </video>
        </MainHomeVid>
      </MainHomeSection1>
      <MainHomeSection2>
        <MainHomeTodayDrank>
          <img src={MainCupImg} />
        </MainHomeTodayDrank>
      </MainHomeSection2>
    </Container>
  );
}

export default Home;

const MainHomeSection1 = styled.div`
  position: relative;
  height: 100vh;
  max-height: 1334px;
  overflow: hidden;
  padding: 0;
  margin: 0;
`;

const MainHomeBackShade = styled.div`
  top: 0;
  left: 0;
  right: 0;
  position: absolute;
  background-color: rgba(0, 0, 0, 0.3);
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
`;

const MainHomeVid = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: -1;
  /* opacity: 0.15; */
  /* background-color: black; */

  video: {
    top: 0;
    left: 0;
    right: 0;
    position: absolute;
    height: 100%;
    width: 100%;
    object-fit: cover; // background-size: cover 와 비슷함. (HTML 요소 or 비디오와 작동)
  }
`;

const MainFeatureComp = {
  main: styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 555px;
    width: 74vw;
    margin: 0 auto;
    /* margin: 0 97px; */
    padding: 16px;
    padding-bottom: 64px;
    box-sizing: border-box;
  `,
  subtext: styled.div`
    font-size: 24px;
    margin-bottom: 44px;

    @media (max-width: 750px) {
      font-size: 3.2vw;
    }
  `,
  img: styled.img`
    width: 100%;
  `,
};

const MainEnterTheRoom = {
  main: styled.div`
    position: absolute;
    bottom: 0;
    transform: translateY(100%);
    /* margin-bottom: 64px; */
  `,
  emptyspace: styled.div`
    max-height: 128px;
    height: 17.067vw;
  `,
  img: styled.img`
    width: 26.8vw;
    max-width: 201px;
    min-width: 150px;
    /* margin-top: 128px; */
  `,
};

const MainPointDown = styled.img`
  position: absolute;
  bottom: 17px;
  left: 0;
  right: 0;
  margin: auto;

  animation: moveUpDown 1.4s infinite;
  @keyframes moveUpDown {
    0%,
    100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-10px);
    }
  }
`;

const MainHomeSection2 = styled.div`
  background-color: black;
`;

const MainHomeTodayDrank = styled.div`
  padding-top: 119px;
  padding-bottom: 100px;

  padding-left: 20.8%;
  padding-right: 8%;

  img {
    width: 100%;
    max-width: 534px;
    /* padding: 8px; */
  }
`;
