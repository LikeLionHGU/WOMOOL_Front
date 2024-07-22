import styled from "styled-components";

function App() {
  return (
    <div className="App">
      <TestStyle>Hello</TestStyle> World
    </div>
  );
}

const TestStyle = styled.div`
  color: red;
`;

export default App;
