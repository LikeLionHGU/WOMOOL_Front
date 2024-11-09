import styled from "styled-components";

export const Container = styled.div`
  max-width: 750px;
  margin: 0 auto;
  color: white;
`;

export const NewContainer = styled(Container)`
  max-width: 750px;
  margin: 0 auto;
  color: black;
  min-height: 100vh;
  background-color: white;
  position: relative;
`;

export const NewContainerInnerScroll = styled(NewContainer)`
  overflow-y: auto;
  height: 100vh;
  overflow-x: hidden;
  padding-bottom: 85px;
`;
