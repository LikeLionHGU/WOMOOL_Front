import React from "react";

import InduGroupToggle from "../../assets/Mypage/indu-group-toggle.svg";
import styled from "styled-components";

function GroupOnOffToggle({ clicked }) {
  return (
    <ToggleContainer>
      <img
        className={clicked ? "clicked" : ""}
        src={InduGroupToggle}
        draggable={false}
      />
    </ToggleContainer>
  );
}

export default GroupOnOffToggle;

const ToggleContainer = styled.div`
  /* Rectangle 40 */
  width: 158px;
  height: 61px;
  background: #2892c2;
  border-radius: 30.5px;
  overflow: hidden;
  cursor: pointer;

  img {
    transition: transform 400ms ease-in-out;
  }
  img.clicked {
    transform: translateX(-100px);
  }
`;
