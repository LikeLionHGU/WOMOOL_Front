import React, { useEffect, useRef, useState } from "react";

import MainCupImg from "../../assets/MainHome/Section2/Cup.jpg";
// import CupMask from "../../assets/MainHome/Section2/CupMask.svg";
import CupBackgroundImg from "../../assets/MainHome/Section2/CupBg.jpg";
import styled from "styled-components";

function MainHomeComp2_1() {
  const mainRef = useRef();
  const [scrollY, setScrollY] = useState({
    scrollTop: 0,
    mainTop: 0,
  });
  const handleScroll = () => {
    const mainDiv = mainRef.current;
    if (!mainDiv) return;
    const scrollTop = window.scrollY;
    // const scaleValue = Math.max(1, 3 - scrollTop / 200);
    setScrollY({ scrollTop, mainTop: mainDiv.offsetTop });
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const animationDurPx = 150;
  const scrollProcess = Math.max(0, scrollY.scrollTop - scrollY.mainTop);

  return (
    <div ref={mainRef}>
      <MainHomeTodayDrank>
        <Cup.main
          style={{
            transform: `translateY(${Math.min(
              animationDurPx + 150,
              scrollProcess + (scrollProcess / animationDurPx) * 150
            )}px) scale(${Math.max(
              1,
              3 * (1 - scrollProcess / (animationDurPx * 1.5))
            )})`,
          }}
        >
          <Cup.bg
            style={{
              // width: 1100 - (scrollY.scrollTop - scrollY.mainTop) * 3,
              "mask-image": `url('/assets/CupMask.svg')`,
              "-webkit-mask-image": `url('/assets/CupMask.svg')`,
              "mask-size": `${Math.max(
                100,
                100 + animationDurPx * (1 - scrollProcess / animationDurPx)
              )}%`,
              "-webkit-mask-size": `${Math.max(
                100,
                100 + animationDurPx * (1 - scrollProcess / animationDurPx)
              )}%`,
            }}
          >
            <img src={CupBackgroundImg} />
          </Cup.bg>
          {/* 
          <Cup.mask>
            <img src={CupMask} />
          </Cup.mask> */}
        </Cup.main>
      </MainHomeTodayDrank>
    </div>
  );
}

export default MainHomeComp2_1;

const MainHomeTodayDrank = styled.div`
  /* padding-top: 90px; */
  padding-bottom: 100px;

  padding-left: 20.8%;
  padding-right: 8%;

  overflow: hidden;

  /* overflow: hidden; */
  height: 100vh;

  img {
    width: 100%;
    max-width: 534px;
    /* padding: 8px; */
  }
`;

const Cup = {
  main: styled.div`
    position: relative;
    /* transition: transform 1ms ease; */
  `,
  mask: styled.div`
    position: absolute;
    img {
      mix-blend-mode: multiply;
    }
  `,
  bg: styled.div`
    position: absolute;
    width: 100%;

    /* -webkit-mask-size: 100px; */
  `,
};
