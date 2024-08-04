import React, { useEffect, useState, useMemo } from "react";
import styled from "styled-components";
import { pretendard, timesNewRoman } from "src/styles/fonts";

import { useFetchBe } from "src/tools/api";

import GroupViewExploreCard from "./GroupViewExploreCard";
import GroupRightArrow from "src/assets/Mypage-group/group-rightarrow.svg";
import CreateGroup from "src/assets/Mypage-group/createGroup.svg";
import CreateGroupHover from "src/assets/Mypage-group/createGroup-hover.svg";
import { HoverImageSpan } from "../../styles/stylePresets";

function GroupViewExploreMain() {
  const fetchBe = useFetchBe();
  const [allGroups, setAllGroups] = useState();
  const [myGroups, setMyGroups] = useState();
  const allGroupByCode = useMemo(() => {
    return allGroups?.reduce((prev, curr) => {
      prev[curr.code] = curr;
      return prev;
    }, {});
  }, [allGroups]);

  useEffect(() => {
    fetchBe("/team/allGroups").then((json) => setAllGroups(json.teams));
    fetchBe("/user/getGroups").then((json) => setMyGroups(json.teams));
  }, []);

  if (!allGroups || !myGroups) return <div></div>;
  return (
    <Wrapper>
      <Section>
        <SectionHeader>
          <div className="top">
            <div>Explore</div>
            <img src={GroupRightArrow} draggable={false} />
          </div>
          <div className="bottom">
            현재까지 {allGroups.length}개의 그룹이 우물하고 있어요
          </div>
        </SectionHeader>
        <SectionBody>
          {allGroups.map((group) => (
            <GroupViewExploreCard
              key={group.code}
              data={group}
              hoverGroupCode={true}
            />
          ))}
        </SectionBody>
      </Section>
      <Section>
        <SectionHeader>
          <div className="top">
            <div>My Group</div>
            <img src={GroupRightArrow} draggable={false} />
          </div>
          <div className="bottom">
            총 {myGroups.length}개의 그룹에 가입되어 있어요
          </div>
        </SectionHeader>
        <SectionBody>
          {myGroups.map(({ code }) => (
            <GroupViewExploreCard
              key={code}
              data={allGroupByCode[code]}
              hoverGroupCode={true}
            />
          ))}
          <HoverImageSpan>
            <img src={CreateGroup} draggable={false} />
            <img className="hover" src={CreateGroupHover} draggable={false} />
          </HoverImageSpan>
        </SectionBody>
      </Section>
    </Wrapper>
  );
}

export default GroupViewExploreMain;

const Wrapper = styled.div`
  padding-top: 42px;
`;

const Section = styled.div`
  margin-bottom: 45px;
`;

const SectionHeader = styled.div`
  margin-left: 58px;
  .top {
    display: flex;
    margin-bottom: 5px;
    div {
      margin-right: 20px;
      ${pretendard}
      font-family: "Pretendard";
      font-style: normal;
      font-weight: 700;
      font-size: 28px;
      line-height: 33px;
      text-transform: uppercase;

      color: #000000;
    }
  }
  .bottom {
    margin-bottom: 5px;
    ${pretendard}
  }
`;

const SectionBody = styled.div`
  box-sizing: border-box;
  width: 100%;
  overflow-x: auto;
  padding: 16px 58px;
  padding-right: 16px;
  display: flex;
  gap: 24px;

  & > div {
    flex-shrink: 0;
  }
`;
