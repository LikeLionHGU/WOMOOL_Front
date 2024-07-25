import { useRecoilValue, useResetRecoilState } from "recoil";
import styled from "styled-components";
import { authJwtAtom } from "../recoil/auth/atoms";
import Header from "../components/Header";
import { Container } from "../styles/Container";

import MainWoomoolText from "../assets/MainHome/Section1/main-woomol-text.svg";
import MainPointDownImg from "../assets/MainHome/Section1/main-point-down.svg";
import MainEntertheRoomImg from "../assets/MainHome/Section1/main-EntertheRoom.svg";

import { useEffect, useRef, useState } from "react";
import MainHomeComp2 from "../components/Home/MainHomeComp2";

function Home() {
  const [videoLoadedComplete, setVideoLoadedComplete] = useState(false);
  const jwtValue = useRecoilValue(authJwtAtom);
  const resetAuth = useResetRecoilState(authJwtAtom);

  // Javascript Animation
  const containerRef = useRef(null);
  const MainHomeSection1Ref = useRef(null);
  const MainHomeSection2Ref = useRef(null);
  const [scrollTimeout, setScrollTimeout] = useState(null);
  const [previousScrollLoc, setPreviousScrollLoc] = useState(0);
  const [locationWhere, setLocationWhere] = useState(0);
  const [scrollTarget, setScrollTarget] = useState(null);

  useEffect(() => {
    if (scrollTarget === null) return;
    let prevValue = 0;
    const interval = setInterval(() => {
      const scrollLoc =
        document.documentElement.scrollTop || document.body.scrollTop;

      console.log({ prevValue, scrollLoc });

      if (Math.abs(scrollTarget - scrollLoc) < 5) {
        document.body.style.overflow = "";
        setScrollTarget(null);
        return;
      }

      if (prevValue === scrollLoc) {
        console.log("DEAD", scrollTarget);
        document.documentElement.scrollTo({
          top: scrollTarget,
          behavior: "smooth",
        });
      }
      prevValue = scrollLoc;
    }, 20);
    return () => clearInterval(interval);
  }, [scrollTarget]);

  useEffect(() => {
    // return; // 임시 stick 효과 비활성화.
    const handleScroll = (e) => {
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }

      const container = containerRef.current;
      const mainHome1 = MainHomeSection1Ref.current;
      const mainHome2 = MainHomeSection2Ref.current;
      // console.log(mainHome1.offsetTop, mainHome1.offsetHeight);
      // console.log(mainHome2.offsetTop);
      const clientHeight = window.screen.height;
      // const clientHeight = document.documentElement.clientHeight;
      const scrollLoc =
        document.documentElement.scrollTop || document.body.scrollTop;
      // console.log(scrollLoc, clientHeight, scrollLoc + clientHeight);
      // console.log("scroll", e);

      setPreviousScrollLoc(scrollLoc);

      setScrollTimeout(
        setTimeout(
          ((paramPrevScrollLoc) => {
            const updown = scrollLoc < previousScrollLoc ? "up" : "down";
            console.log("Fire scroll", updown, locationWhere, {
              scrollLoc,
              previousScrollLoc,
              paramPrevScrollLoc,
              mainHome2,
            });

            if (
              locationWhere === 0 &&
              updown == "down" &&
              scrollLoc + clientHeight > mainHome2.offsetTop &&
              scrollLoc < mainHome2.offsetTop
            ) {
              console.log("Scrolling to mainHome2");
              setLocationWhere(1);
              setScrollTarget(mainHome2.offsetTop);
              document.body.style.overflow = "hidden";
              // document.documentElement.scrollTo({
              //   top: mainHome2.offsetTop,
              //   behavior: "smooth",
              // });
            } else if (
              locationWhere === 1 &&
              updown == "up" &&
              scrollLoc < mainHome2.offsetTop
            ) {
              console.log("Scrolling to mainHome1");
              setLocationWhere(0);
              document.body.style.overflow = "hidden";
              setScrollTarget(mainHome1.offsetTop);
              // document.documentElement.scrollTo({
              //   top: mainHome1.offsetTop,
              //   behavior: "smooth",
              // });
            }
          }).bind(null, scrollLoc),
          1
        ) // Delay to prevent excessive calls
      );
    };

    // const container = containerRef.current;
    document.addEventListener("scroll", handleScroll);
    return () => document.removeEventListener("scroll", handleScroll);
  }, [scrollTimeout]);

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
            <MainEnterTheRoom.img src={MainEntertheRoomImg} />
          </MainEnterTheRoom.main>
        </MainFeatureComp.main>
        <MainPointDown src={MainPointDownImg} />
        <MainHomeVid>
          <MainHomeBackShade className={videoLoadedComplete && "darker"} />
          <video
            autoPlay
            muted
            loop
            onLoadedData={() => setVideoLoadedComplete(true)}
          >
            <source src="assets/water-back-vid.webm" type="video/webm" />
          </video>
        </MainHomeVid>
      </MainHomeSection1>
      <MainHomeSection2 ref={MainHomeSection2Ref}>
        <MainHomeComp2 />
      </MainHomeSection2>
    </Container>
  );
}

export default Home;

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
    font-family: "Pretendard Variable", Pretendard, -apple-system,
      BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI",
      "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic",
      "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif;
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

const MainHomeSection2 = styled(ScrollSnap)`
  background-color: black;
  min-height: 200vh;
`;
