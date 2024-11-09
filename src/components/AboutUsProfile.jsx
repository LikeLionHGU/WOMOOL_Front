import React, { useEffect } from "react";
import styled from "styled-components";

import p1 from "../assets/makerPhoto/1.jpg";
import p2 from "../assets/makerPhoto/2.jpg";
import p3 from "../assets/makerPhoto/3.jpg";
import p4 from "../assets/makerPhoto/4.jpg";
import p5 from "../assets/makerPhoto/5.jpg";

const Wrapper = styled.div`
  position: relative;
  //padding-left: 50px; /* Adjust as needed */
  //max-width: 600px; /* Adjust as needed */
  margin: 0 auto;
  margin-top: 100px;
  padding-top: 32px;
`;

const VerticalLine = styled.div`
  position: absolute;
  left: 20px; /* Same x-coordinate */
  top: 32px;
  width: 1px;
  height: calc(100% - 80px);
  background-color: #d9d9d9;
`;

const TeamMemberContainer = styled.div`
  display: flex;
  position: relative;
  margin-bottom: 50px; /* Adjust spacing between team members */
`;

const LineOverlay = styled.div`
  position: absolute;
  left: 20px; /* Same as VerticalLine */
  top: 0;
  width: 1px;
  height: 68.5px;
  background-color: #000;
`;

const InfoContainer = styled.div`
  margin-left: 10px;
  padding-left: 30px;
`;

const Name = styled.div`
  font-size: 30px;
  font-weight: 700;
  text-transform: uppercase;
  margin-bottom: 10px;
`;

const NameText = styled.span`
  color: black;
  font-family: Pretendard;
`;

const MBTI = styled.span`
  color: black;
  font-family: "Times New Roman";
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  gap: 9px;
`;

const InfoItem = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: black;
  text-transform: capitalize;
`;

const Image = styled.img`
  width: 138px;
  height: auto; /* Adjust as needed */
  border-radius: 5px;
  border: 1px solid black;
  margin-left: auto;
`;

const AboutUsProfile = () => {
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top only if keepScrollPosition is not set
  }, []);
  const teamMembers = [
    {
      name: "김고은",
      mbti: "ENTJ",
      major: "제품디자인/GE",
      email: "22100071@handong.ac.kr",
      description: "열쩡가득 세심한 기획자",
      imageSrc: p1,
    },
    {
      name: "김은진",
      mbti: "ENTP",
      major: "제품디자인/시각디자인",
      email: "jinny010718@naver.com",
      description: "완벽주의 트렌디한 디자이너",
      imageSrc: p2,
    },
    {
      name: "유정섭",
      mbti: "ISFP",
      major: "AI 컴퓨터공학심화",
      email: "jungsubr@naver.com",
      description: "한마디로 알잘딱깔센한 프론트엔드",
      imageSrc: p3,
    },
    {
      name: "김민혁",
      mbti: "ISTP",
      major: "AI 컴퓨터공학심화",
      email: "22000082@handong.ac.kr",
      description: "시스템의 근간을 책임지는 백엔드 개발자",
      imageSrc: p4,
    },
    {
      name: "이지광",
      mbti: "ENTJ",
      major: "AI 컴퓨터공학심화",
      email: "lucas0606@handong.ac.kr",
      description: "시스템의 근간을 책임지는 백엔드 개발자",
      imageSrc: p5,
    },
  ];

  return (
    <Wrapper>
      <VerticalLine />
      {teamMembers.map((member, index) => (
        <TeamMemberContainer key={index} data-aos="fade-up">
          <LineOverlay />
          <InfoContainer>
            <Name>
              <NameText>{member.name}</NameText>
              <MBTI>_{member.mbti}</MBTI>
            </Name>
            <Info>
              <InfoItem>Major: {member.major}</InfoItem>
              <InfoItem>Email: {member.email}</InfoItem>
              <InfoItem>{member.description}</InfoItem>
            </Info>
          </InfoContainer>
          <Image src={member.imageSrc} alt={member.name} />
        </TeamMemberContainer>
      ))}
    </Wrapper>
  );
};

export default AboutUsProfile;
