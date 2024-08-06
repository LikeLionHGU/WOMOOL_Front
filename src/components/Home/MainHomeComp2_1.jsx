import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import CountUp from "react-countup";
import { pretendard, timesNewRoman } from "src/styles/fonts";
import { useFetchBe } from "src/tools/api";
import { useInView } from "react-intersection-observer";

import MainCupImg from "../../assets/MainHome/Section2/Cup.jpg";
// import CupMask from "../../assets/MainHome/Section2/CupMask.svg";
import CupBackgroundImg from "../../assets/MainHome/Section2/CupBg.jpg";
import { convertMlToL, removeNonNumeric } from "../../tools/tool";
import { fetchBe } from "../../tools/api";

function MainHomeComp2_1() {
  // const fetchBe = useFetchBe();

  const mainRef = useRef();
  const cupBgRef = useRef();

  const [allStats, setAllStats] = useState();

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
  const cupBgRefComputedMarginTop =
    (cupBgRef.current &&
      +removeNonNumeric(getComputedStyle(cupBgRef.current)["paddingTop"])) ||
    0;

  useEffect(() => {
    fetchBe(null, "/main/getInfo").then((json) => setAllStats(json));
  }, []);

  const [startCount, setStartCount] = useState(false);
  const { ref, inView } = useInView({
    /* Optional options */
    threshold: 0.5, // 50% of the component should be visible to trigger the count up
    triggerOnce: true, // Trigger the count up only once
  });

  // Set startCount to true when the component is in view
  if (inView && !startCount) {
    setStartCount(true);
  }
  // console.log(
  //   cupBgRefComputedMarginTop,
  //   scrollY.scrollTop,
  //   cupBgRef?.current?.offsetTop,
  //   cupBgRef.current?.getBoundingClientRect().top,
  //   cupBgRef.current?.getBoundingClientRect().bottom,

  //   -cupBgRef.current?.getBoundingClientRect().top /
  //     cupBgRef?.current?.offsetTop
  // );
  // console.log(
  //   cupBgRef.current?.children[0].children[0].getBoundingClientRect().height
  // );

  return (
    <div ref={mainRef}>
      <MainHomeTodayDrank
        ref={cupBgRef}
        style={{
          height:
            cupBgRef.current?.children[0].children[0].getBoundingClientRect()
              .height,
        }}
      >
        <Cup.main style={{}} data-aos="fade-up">
          <Cup.bg style={{}}>
            <img
              style={{
                top: `-${Math.max(
                  0,
                  Math.min(
                    50,
                    (-cupBgRef.current?.getBoundingClientRect().top /
                      cupBgRef?.current?.offsetTop) *
                      50
                  )
                )}%`,
              }}
              src={CupBackgroundImg}
            />
          </Cup.bg>
          {/* 
          <Cup.mask>
            <img src={CupMask} />
          </Cup.mask> */}
          <MainText ref={ref}>
            <div>오늘까지 ‘우물우물’ 로 섭취한 물의 양</div>
            <div className="water">
              {startCount ? (
                <CountUp end={allStats?.totalWater || 0} duration={6} />
              ) : (
                0
              )}
              mL
            </div>
          </MainText>
        </Cup.main>
      </MainHomeTodayDrank>
    </div>
  );
}

export default MainHomeComp2_1;

const MainHomeTodayDrank = styled.div`
  padding-top: 250px;
  padding-bottom: 100px;

  padding-left: 20.8%;
  padding-right: 8%;

  overflow: hidden;

  /* overflow: hidden; */
  /* height: 3000px; */

  img {
    width: 100%;

    /* padding: 8px; */
  }
`;

const Cup = {
  main: styled.div`
    position: relative;
    height: 100%;
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
    max-width: 534px;
    max-height: 445px;
    padding-bottom: 83.3333%;
    mask-image: url("/assets/CupMask.svg");
    -webkit-mask-image: url("/assets/CupMask.svg");
    mask-size: 100%;
    -webkit-mask-size: 100%;

    img {
      width: 150%;
      left: 50%;
      transform: translateX(-50%);
      position: absolute;
    }

    /* -webkit-mask-size: 100px; */
  `,
};

const MainText = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;

  ${pretendard}
  font-style: normal;
  font-weight: 700;
  font-size: 24.4833px;
  line-height: 29px;
  text-align: center;
  margin-right: 20%;

  color: #ffffff;

  .water {
    font-style: normal;
    font-weight: 700;
    font-size: 44px;
    line-height: 53px;
    /* identical to box height */
    margin-top: 20px;

    color: #ffffff;
  }
`;
