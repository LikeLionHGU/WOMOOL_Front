import React, { useEffect } from "react";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import LeftArrowImg from "../../assets/MainHome/Section4/LeftArrow.svg";
import RightArrowImg from "../../assets/MainHome/Section4/RightArrow.svg";
import styled from "styled-components";

function MainHomeComp4() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    customPaging: (i) => <>{i + 1}</>,
  };
  return (
    <MainHomeComp4Style data-aos="fade-up" data-aos-offset="200">
      <div>
        <Slider {...settings}>
          <SliderStyle.card>
            <SliderStyle.number>1</SliderStyle.number>
            <SliderStyle.header>맞춤형 목표 설정</SliderStyle.header>
            <SliderStyle.content>
              나에게 필요한 물 섭취량을 알고
              <br />
              건강하게 마실 수 있어요
            </SliderStyle.content>
          </SliderStyle.card>
          <SliderStyle.card>
            <SliderStyle.number>2</SliderStyle.number>
            <SliderStyle.header>함께 키우는 그룹 캐릭터</SliderStyle.header>
            <SliderStyle.content>
              소중한 사람들과 습관을 길러,
              <br />
              우물이를 키워나가요
            </SliderStyle.content>
          </SliderStyle.card>
          <SliderStyle.card>
            <SliderStyle.number>3</SliderStyle.number>
            <SliderStyle.header>웹과 앱 상관없이</SliderStyle.header>
            <SliderStyle.content>
              언제 어디서나
              <br />
              우물이와 함께할 수 있어요
            </SliderStyle.content>
          </SliderStyle.card>
        </Slider>
      </div>
    </MainHomeComp4Style>
  );
}

export default MainHomeComp4;

const MainHomeComp4Style = styled.div`
  width: calc(100% - 60px - 100px);
  margin: auto;
  margin-top: 52px;
  margin-bottom: 136px;
  padding-bottom: 180px;
  text-align: center;
  & > img {
    /* margin: auto; */
  }

  .slick-dots {
    margin-top: 110px;
    bottom: auto;
    font-family: "Times New Roman, sans-serif";
    right: 0;
    left: 0;
  }

  .slick-dots > li {
    color: rgba(255, 255, 255, 0.6);
  }

  .slick-dots .slick-active {
    color: white;
  }
`;

const SliderStyle = {
  card: styled.div`
    font-family: "Pretendard Variable", Pretendard, -apple-system,
      BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI",
      "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic",
      "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif;
  `,
  number: styled.div`
    font-family: "Times New Roman", sans-serif;
    font-size: 48px;
    padding: 36.5px;
  `,
  header: styled.div`
    padding: 13.5px;
    font-size: 36px;
    font-weight: bold;
  `,
  content: styled.div`
    padding: 13.5px;
    font-size: 20px;
    font-weight: medium;
    line-height: 1.3;
  `,
};

function NextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <RightArrowStyle
      // className={className}
      style={{ ...style }}
      onClick={onClick}
    >
      <img src={RightArrowImg} />
    </RightArrowStyle>
  );
}

function PrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <LeftArrowStyle
      // className={className}
      style={{ ...style }}
      onClick={onClick}
    >
      <img src={LeftArrowImg} />
    </LeftArrowStyle>
  );
}

const LeftArrowStyle = styled.div`
  position: absolute;
  left: -25px;
  top: 50%;
  cursor: pointer;
`;
const RightArrowStyle = styled.div`
  position: absolute;
  right: -25px;
  top: 50%;
  cursor: pointer;
`;
