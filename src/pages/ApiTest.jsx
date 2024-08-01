import React, { useState } from "react";
import { Container } from "../styles/Container";
import { useRecoilValue } from "recoil";
import { authJwtAtom } from "../recoil/auth/atoms";
import styled from "styled-components";
import { serverRootUrl } from "../constants";
import { fetchBe } from "../tools/api";

const presets = [
  {
    method: "POST",
    endpoint: "/user/nickname",
    description: "유저 닉네임 설정",
    body: {
      nickName: "물먹는 하마2",
    },
  },
  {
    method: "GET",
    endpoint: "/user/get",
    description: "유저 닉네임, 이메일, 이름 get",
    body: {},
  },
  {
    method: "POST",
    endpoint: "/userDetail/add",
    description: "키와 몸무게 입력 (처음 가입시)",
    body: {
      height: "185.3",
      weight: "75.2",
    },
  },
  {
    method: "GET",
    endpoint: "/userDetail/get",
    description: "내 유저 정보 조회",
    body: {},
  },
  {
    method: "GET",
    endpoint: "/userDetail/{userId}",
    description: "{userID} 정보 조회",
    body: {},
  },
  {
    method: "PATCH",
    endpoint: "/userDetail/update",
    description: "키 몸무게 수정",
    body: {
      height: "190.3",
      weight: "20.2",
    },
  },
  {
    method: "POST",
    endpoint: "/userRecord/add",
    description: "물마시기",
    body: {
      amount: "600",
    },
  },
  {
    method: "GET",
    endpoint: "/userRecord/getRecords",
    description: "내가 마신 물 확인",
    body: {},
  },
  {
    method: "GET",
    endpoint: "/userRecord/{userId}",
    description: "{userId} 마신 양 조회",
    body: {},
  },
  {
    method: "GET",
    endpoint: "/userRecord/getCalendar",
    description: "( 권장량 통과한 날 넘겨줌 (스탬프))",
    body: {},
  },
  {
    method: "GET",
    endpoint: "/main/getInfo",
    description: "전체 유저 정보 확인",
    body: {},
  },
  {
    method: "POST",
    endpoint: "/team/create",
    description: "그룹 만들기",
    body: {
      name: "꿀꺽꿀꺽그룹",
    },
  },
  {
    method: "POST",
    endpoint: "/team/join",
    description: "그룹에 가입",
    body: {
      teamCode: "JPHL",
    },
  },
  {
    method: "GET",
    endpoint: "/team/{groupId}",
    description: "그룹정보 불러오기",
    body: {},
  },
];

const requestColor = {
  GET: "#a6ffac",
  POST: "#ffd5a6",
  PATCH: "#ffa6ed",
};

function ApiTest() {
  const [targetEndPoint, setTargetEndPoint] = useState("/userDetail/get");
  const [requestType, setRequestType] = useState("GET");
  const [requestData, setRequestData] = useState("{}");
  const [responseData, setResponseData] = useState({});
  const jwtValue = useRecoilValue(authJwtAtom);

  const loadPreset = ({ method, endpoint, body }) => {
    setRequestType(method);
    setTargetEndPoint(endpoint);
    setRequestData(JSON.stringify(body));
  };

  const sendApiRequest = () => {
    fetchBe(jwtValue, targetEndPoint, requestType, requestData)
      .then((data) => data.json().then((json) => setResponseData(json)))
      .catch((e) => setResponseData(e.message));
  };
  return (
    <Container>
      <ApiTestC>
        <h1>Api TEST</h1>
        <div>
          Server Root Url:{" "}
          <a target="_blank" rel="noopener noreferrer" href={serverRootUrl}>
            {serverRootUrl}
          </a>
        </div>
        <div>
          Login:{" "}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={`${serverRootUrl}/login`}
          >
            {serverRootUrl}/login
          </a>
        </div>
        <h3>JWT Token</h3>
        <input value={jwtValue} readOnly />
        <h3>Target Endpoint</h3>
        <input
          value={targetEndPoint}
          onChange={(e) => setTargetEndPoint(e.target.value)}
        />
        <h3>Method</h3>
        <div>
          {Object.keys(requestColor).map((rtype) => (
            <>
              <input
                type="radio"
                id={`type-${rtype}`}
                checked={requestType === rtype}
                onClick={() => setRequestType(rtype)}
              />
              <label for={`type-${rtype}`}>{rtype}</label>
            </>
          ))}
        </div>
        <textarea
          value={requestType === "GET" ? "" : requestData}
          disabled={requestType === "GET"}
          onChange={(e) => setRequestData(e.target.value)}
        />
        <h3>Preset</h3>
        {presets.map((preset) => (
          <div
            style={{
              cursor: "pointer",
              userSelect: "none",
            }}
            onClick={() => loadPreset(preset)}
          >
            <span
              style={{
                backgroundColor: requestColor[preset.method],
              }}
            >
              [{preset.method}]
            </span>{" "}
            {preset.endpoint} - {preset.description}
          </div>
        ))}
        <button onClick={sendApiRequest}>API Test</button>
        <div>
          <ApiResult>{JSON.stringify(responseData, null, 2)}</ApiResult>
        </div>
      </ApiTestC>
    </Container>
  );
}

export default ApiTest;

const ApiTestC = styled.div`
  background-color: white;
  color: black;
  padding: 16px;
  & > * {
    display: block;
    width: 80%;
    margin: 16px;
  }
`;

const ApiResult = styled.div`
  font-family: monospace;
  word-wrap: normal;
  word-break: break-word;
  white-space: pre-wrap;
`;
