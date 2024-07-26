import React, { useState } from "react";
import { Container } from "../styles/Container";
import { useRecoilValue } from "recoil";
import { authJwtAtom } from "../recoil/auth/atoms";
import styled from "styled-components";
import { serverRootUrl } from "../constants";

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
];

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
    fetch(serverRootUrl + targetEndPoint, {
      method: requestType,
      headers: {
        Authorization: `Bearer ${jwtValue}`,
        "Content-Type": "application/json",
      },
      body:
        requestType !== "GET"
          ? JSON.stringify(JSON.parse(requestData))
          : undefined,
    }).then((data) => data.json().then((json) => setResponseData(json)));
  };
  return (
    <Container>
      <ApiTestC>
        <h1>Api TEST</h1>
        <div>Server Root Url: {serverRootUrl}</div>
        <h3>JWT Token</h3>
        <input value={jwtValue} readOnly />
        <h3>Target Endpoint</h3>
        <input
          value={targetEndPoint}
          onChange={(e) => setTargetEndPoint(e.target.value)}
        />
        <h3>Method</h3>
        <div>
          <input
            type="radio"
            id="type-get"
            checked={requestType === "GET"}
            onClick={() => setRequestType("GET")}
          />
          <label for="type-get">GET</label>
          <input
            type="radio"
            id="type-post"
            checked={requestType === "POST"}
            onClick={() => setRequestType("POST")}
          />
          <label for="type-post">POST</label>
        </div>
        <textarea
          value={requestData}
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
                backgroundColor:
                  preset.method === "GET" ? "#a6ffac" : "#ffd5a6",
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
  white-space: pre;
`;
