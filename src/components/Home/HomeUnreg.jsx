import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useRecoilValue, useResetRecoilState } from "recoil";
import styled from "styled-components";
import AOS from "aos";

import googleLogo from "src/assets/googlelogo.svg";
import kakaoLogo from "src/assets/kakaologo.svg";

import "aos/dist/aos.css";

import MainWoomoolText from "../../assets/MainHome/Section1/main-woomol-text.svg";
import MainPointDownImg from "../../assets/MainHome/Section1/main-point-down.svg";
import MainEntertheRoomImg from "../../assets/MainHome/Section1/main-EntertheRoom.svg";
import MainEntertheRoomImgHover from "../../assets/MainHome/Section1/main-EntertheRoom-hover.svg";

import { authJwtAtom } from "../../recoil/auth/atoms";
import Header from "../Header";
import { Container } from "../../styles/Container";
import MainHomeComp2_1 from "./MainHomeComp2_1";
import MainHomeComp3 from "./MainHomeComp3";
import MainHomeComp4 from "./MainHomeComp4";
import Footer from "./Footer";
import { pretendard, timesNewRoman } from "../../styles/fonts";
import { HoverImageSpan } from "../../styles/stylePresets";
import TheModal from "../TheModal";

import headerLogo from "src/assets/header-logo.svg";
import { serverRootUrl } from "../../constants";

function HomeUnreg() {
  const [videoLoadedComplete, setVideoLoadedComplete] = useState(false);
  const [openModal, setOpenModal] = useState("initial");
  const jwtValue = useRecoilValue(authJwtAtom);
  const resetAuth = useResetRecoilState(authJwtAtom);

  // Javascript Animation
  const MainHomeSection1Ref = useRef(null);
  const MainHomeSection2Ref = useRef(null);

  // Setup AOS
  useEffect(() => {
    AOS.init({
      // disableMutationObserver: true,
      // throttleDelay: 60,
    });
  });

  return (
    <Container
      style={
        {
          // scrollSnapType: "y mandatory",
          // height: "100vh",
          // overflowY: "scroll",
        }
      }
    >
      <MainHomeSection1 ref={MainHomeSection1Ref}>
        <Header />
        <MainFeatureComp.main>
          <MainFeatureComp.subtext>
            물 마시는 습관, 서로 공유하여 `우물`해요
          </MainFeatureComp.subtext>
          <MainFeatureComp.img>
            <img src={MainWoomoolText} />
          </MainFeatureComp.img>
          <MainEnterTheRoom.main>
            {/* <MainEnterTheRoom.emptyspace /> */}
            <HoverImageSpan
              style={{ display: "block" }}
              onClick={() => setOpenModal("show")}
            >
              <MainEnterTheRoom.img src={MainEntertheRoomImg} />
              <MainEnterTheRoom.img
                className="hover"
                src={MainEntertheRoomImgHover}
              />
            </HoverImageSpan>
          </MainEnterTheRoom.main>
        </MainFeatureComp.main>
        <MainPointDown
          onClick={() => {
            MainHomeSection2Ref.current?.scrollIntoView({
              behavior: "smooth",
            });
          }}
        >
          <img src={MainPointDownImg} />
        </MainPointDown>
        <MainHomeVid>
          <MainHomeBackShade className={videoLoadedComplete && "darker"} />
          <video
            autoPlay
            muted
            loop
            onLoadedData={() => setVideoLoadedComplete(true)}
          >
            <source src="/assets/water-back-vid.webm" type="video/webm" />
          </video>
        </MainHomeVid>
      </MainHomeSection1>
      <MainHomeSection2 ref={MainHomeSection2Ref}>
        <MainHomeComp2_1 />
        <MainHomeComp3 />
        <MainHomeComp4 />
        <Footer />
      </MainHomeSection2>

      <TheModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        style={{
          color: "white",
        }}
      >
        <HeaderModalLoginText.logo>
          <img src={headerLogo} />
        </HeaderModalLoginText.logo>
        <HeaderModalLoginText.title>LOGIN</HeaderModalLoginText.title>
        <HeaderModalLoginText.text>
          Pure water is the world's
          <br /> first and foremost medicine.
        </HeaderModalLoginText.text>
        <HeaderModalLoginBtn.root>
          <HeaderModalLoginBtn.google
            href={serverRootUrl + "/oauth2/authorization/google"}
          >
            <img src={googleLogo} />
            <div>Google 계정으로 계속</div>
          </HeaderModalLoginBtn.google>
          <HeaderModalLoginBtn.kakao
            href={serverRootUrl + "/oauth2/authorization/kakao"}
          >
            <img src={kakaoLogo} />
            <div> Kakao 계정으로 계속</div>
          </HeaderModalLoginBtn.kakao>
        </HeaderModalLoginBtn.root>
      </TheModal>
    </Container>
  );
}

export default HomeUnreg;

const ScrollSnap = styled.div`
  scroll-snap-align: start;
`;

const MainHomeSection1 = styled(ScrollSnap)`
  position: relative;
  height: 100vh;
  min-height: 655px;
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

  opacity: 0;

  &.darker {
    /* opacity: 1; */
    animation: fadeIn 450ms forwards;
    animation-delay: 1500ms;
    @keyframes fadeIn {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }
  }
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
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    /* top: 50%;
    left: 50%;
    transform: translate(-50%, -50%); */
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 auto;
    /* margin: 0 97px; */

    /* padding: 16px; */
    /* padding-bottom: 64px; */
    box-sizing: border-box;

    & > div {
      height: 33%;
    }
  `,
  subtext: styled.div`
    ${pretendard}
    font-weight: medium;
    font-size: 24px;
    display: flex;
    align-items: end;
    padding-bottom: 32px;
    @media (max-width: 750px) {
      font-size: 3.2vw;
    }

    @media (max-width: 500px) {
      font-size: 16px;
    }
  `,
  img: styled.div`
    width: 100%;
    max-width: 555px;
    width: 74vw;
  `,
};

const MainEnterTheRoom = {
  main: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    /* position: absolute; */
    /* bottom: 0;
    transform: translateY(100%); */
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

const MainPointDown = styled.div`
  position: absolute;
  bottom: 17px;
  left: 0;
  right: 0;
  margin: auto;

  text-align: center;
  padding: 8px;

  cursor: pointer;

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

const MainHomeSection2 = styled(ScrollSnap)`
  background-color: black;
`;

const HeaderModalLoginBtn = {
  root: styled.div`
    ${pretendard}
    color: black;
    font-size: 12px;
    font-weight: 600; // Semi Bold
  `,
  google: styled.a`
    /* Frame 6 */

    /* Auto layout */
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 9px 51px;
    gap: 10px;

    background: rgba(255, 255, 255, 0.6);
    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25), inset 0px 0px 4px #ffffff;
    border-radius: 30px;

    margin-bottom: 11px;

    text-decoration: none;
    color: inherit;
  `,
  kakao: styled.a`
    /* Frame 7 */

    /* Auto layout */
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 11px 31px;
    gap: 10px;

    background: rgba(250, 255, 9, 0.6);
    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25),
      inset 0px 0px 4px rgba(255, 255, 255, 0.8);
    border-radius: 30px;

    text-decoration: none;
    color: inherit;
  `,
};

const HeaderModalLoginText = {
  logo: styled.div`
    width: 47px;
    margin-bottom: 18px;
    img {
      width: 100%;
    }
  `,
  title: styled.div`
    ${timesNewRoman}
    font-size: 18px;
    font-weight: bold;
    font-style: italic;
    text-transform: uppercase;
    margin-bottom: 13px;
  `,
  text: styled.div`
    ${timesNewRoman}
    font-size: 12px;
    text-transform: uppercase;
    margin-bottom: 25px;
  `,
};
