import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { userDetailAtom } from "../../recoil/userAtoms";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { fetchBe } from "../../tools/api";
import { authJwtAtom } from "../../recoil/auth/atoms";
import { pretendard } from "../../styles/fonts";

import CloseBtn from "../../assets/Mypage/close-x.svg";
import StampAttend from "../../assets/Mypage/stamp_attend.svg";
import StampComplete from "../../assets/Mypage/stamp_complete.svg";
import StampDisabled from "../../assets/Mypage/stamp_disabled.svg";
import { convertMlToL, currentKoreanTime, formatDate } from "../../tools/tool";

const Stamps = [StampDisabled, StampAttend, StampComplete];

function LastLog({ show = "init", setShow }) {
  // const jwtValue = useRecoilValue(authJwtAtom);
  const jwtValue = useRecoilValue(authJwtAtom);
  const setUserData = useSetRecoilState(userDetailAtom);

  const [attendanceData, setAttendanceData] = useState();
  const attendanceDataByWeek =
    attendanceData?.reduce((prev, curr) => {
      prev[curr.week] = [...(prev[curr.week] || []), curr];
      return prev;
    }, {}) || {};

  useEffect(() => {
    if (show === "hidden") return;
    // Get User Attendance data
    (async () => {
      try {
        const userData = await fetchBe(jwtValue, "/userDetail/get");
        setUserData(userData);
        const json = await fetchBe(jwtValue, "/userAttendance/get");
        setAttendanceData([
          ...json.userAttendanceDtos,
          {
            date: currentKoreanTime(new Date()),
            attendance: userData.attendance,
            dateCount: userData.weekDate,
            drankWater: userData.todayTotal,
            hasDrankToday: userData.hasDrankToday,
            recommendation: userData.recommendation,
            warnDrankToday: userData.warnDrankToday,
            week: userData.week,
          },
        ]);
      } catch (e) {
        console.error(e);
      }
    })();
  }, [show]);

  return (
    <LastLogWrapper className={!!attendanceData ? show : "init"}>
      <LastLogContainer>
        <LastLogContent>
          <Header.wrapper>
            <Header.closeIcn
              src={CloseBtn}
              draggable={false}
              onClick={() => setShow("hidden")}
            />
            <Header.text>지난 기록</Header.text>
          </Header.wrapper>
          {Object.keys(attendanceDataByWeek)
            .sort((a, b) => +b - +a)
            .map((weekNo) => (
              <UserRecordWrapper key={`week${weekNo}`}>
                <UserRecordWeek>
                  <div>WEEK {weekNo}</div>
                  <div>
                    {convertMlToL(
                      attendanceDataByWeek[weekNo].reduce(
                        (prev, curr) => prev + curr.drankWater,
                        0
                      )
                    )}
                    L/
                    {convertMlToL(
                      attendanceDataByWeek[weekNo].reduce(
                        (prev, curr) => prev + curr.recommendation,
                        0
                      )
                    )}
                    L
                  </div>
                </UserRecordWeek>
                {attendanceDataByWeek[weekNo]
                  .sort((a, b) => b.date.localeCompare(a.date))
                  .map((day) => {
                    let status = 0;
                    if (day.attendance) status = 1;
                    if (day.hasDrankToday) status = 2;
                    return (
                      <UserRecordDay.wrapper key={day.date}>
                        <UserRecordDay.day>
                          <div className="day">#{day.dateCount + 1}</div>
                          <div className="date">{`${formatDate(day.date)[0]}_${
                            formatDate(day.date)[1]
                          }`}</div>
                        </UserRecordDay.day>
                        <UserRecordDay.drank>
                          <div className="stamp">
                            <img src={Stamps[status]} draggable={false} />
                          </div>
                          <div className="status">
                            <div className="type">
                              {["미접속", "출석완료", "출석완료"][status]}
                            </div>
                            {status > 0 && (
                              <div className="stats">
                                {convertMlToL(day.drankWater)}L/
                                {convertMlToL(day.recommendation)}L
                              </div>
                            )}
                          </div>
                        </UserRecordDay.drank>
                      </UserRecordDay.wrapper>
                    );
                  })}
              </UserRecordWrapper>
            ))}
        </LastLogContent>
      </LastLogContainer>
    </LastLogWrapper>
  );
}

export default LastLog;

const LastLogContent = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  background-color: #edeceb;

  color: white;
  padding: 0;
  box-sizing: border-box;
  transition: left 450ms; /*ease-in-out*/
`;

const LastLogWrapper = styled.div`
  z-index: 9;
  position: fixed;
  width: 100vw;
  min-height: 100vh;
  margin: 0;
  padding: 0;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;

  &.init {
    visibility: hidden;
    ${LastLogContent} {
      left: -100%; /* Move it completely off-screen */
    }
  }

  &.hidden {
    animation: exit 450ms forwards;
    ${LastLogContent} {
      left: -100%; /* Move it completely off-screen */
    }
  }

  &.show {
    visibility: visible;
    ${LastLogContent} {
      left: 0; /* Move it completely off-screen */
    }
  }

  @keyframes exit {
    from {
      visibility: visible;
    }
    to {
      visibility: hidden;
    }
  }
`;

const LastLogContainer = styled.div`
  max-width: 750px;
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  margin: auto;
  padding: 0;
  overflow-x: hidden;
  /* background-color: yellow; */
`;

const Header = {
  wrapper: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 109px;
    background-color: white;
    padding: 0 40px;
  `,
  closeIcn: styled.img`
    cursor: pointer;
    padding: 16px;
  `,
  text: styled.div`
    /* 지난 기록 */

    ${pretendard}
    font-style: normal;
    font-weight: 700;
    font-size: 30px;
    line-height: 36px;
    /* identical to box height */
    text-transform: uppercase;

    color: #2892c2;
  `,
};

const UserRecordWrapper = styled.div``;

const UserRecordWeek = styled.div`
  height: 82px;
  background-color: #2892c2;

  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 33px;

  div {
    /* Week 2 */

    ${pretendard}
    font-style: normal;
    font-weight: 600;
    font-size: 24px;
    line-height: 29px;
    /* identical to box height */
    text-align: center;
    text-transform: uppercase;

    color: #ffffff;
  }
`;

const UserRecordDay = {
  wrapper: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 40px;
    height: 118px;

    color: black;

    .day {
      margin-right: 18px;
      ${pretendard}
      font-style: normal;
      font-weight: 600;
      font-size: 24px;
      line-height: 29px;
      /* identical to box height */
      text-align: center;
      text-transform: uppercase;

      color: #000000;
    }

    .date {
      ${pretendard}
      font-style: normal;
      font-weight: 600;
      font-size: 38px;
      line-height: 45px;
      text-align: center;
      text-transform: uppercase;

      color: #000000;
    }
  `,
  day: styled.div`
    display: flex;
  `,
  drank: styled.div`
    display: flex;
    align-items: center;
    /* align-items: flex-end; */

    .stamp {
      margin-right: 23px;
    }

    .status {
      width: 90px;
      ${pretendard};
      font-style: normal;
      font-weight: 600;
      font-size: 20px;
      line-height: 24px;
      /* identical to box height */
      text-align: center;
      text-transform: uppercase;

      color: #000000;
    }

    .stats {
      margin-top: 14px;
    }
  `,
};
