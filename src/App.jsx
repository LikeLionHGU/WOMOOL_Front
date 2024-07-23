import { useRecoilValue, useResetRecoilState } from "recoil";
import styled from "styled-components";
import { authJwtAtom } from "./recoil/auth/atoms";

function App() {
  const jwtValue = useRecoilValue(authJwtAtom);
  const resetAuth = useResetRecoilState(authJwtAtom);
  return (
    <div className="App">
      <TestStyle>Hello</TestStyle> World
      <div>{jwtValue}</div>
      <button onClick={resetAuth}>Logout</button>
    </div>
  );
}

const TestStyle = styled.div`
  color: red;
`;

export default App;
