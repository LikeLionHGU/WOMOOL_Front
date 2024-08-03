import React from "react";
import styled from "styled-components";
import { pretendard } from "./fonts";

function Button({ children, ...props }) {
  return (
    <ButtonContainer {...props}>
      <ButtonComp>{children}</ButtonComp>
    </ButtonContainer>
  );
}

export default Button;

const ButtonComp = styled.div`
  /* 확인했어요! */

  width: 74px;
  height: 19px;

  ${pretendard}
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 19px;
  text-align: center;
  /* identical to box height */

  /* Inside auto layout */
  flex: none;
  order: 0;
  flex-grow: 0;
`;
const ButtonContainer = styled.div`
  cursor: pointer;
  user-select: none;

  box-sizing: border-box;
  /* Property 1=Frame 44 */

  width: 301.62px;
  height: 45.07px;

  /* Auto layout */
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 9px 51px;
  gap: 10px;

  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25), inset 0px 0px 4px #ffffff;
  border-radius: 30px;
  background: rgba(255, 255, 255, 0.6);
  color: #2892c2;

  &:hover {
    background: #2892c2;
    color: white;
  }
`;
