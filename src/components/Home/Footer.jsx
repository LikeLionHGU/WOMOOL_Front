import React from "react";
import styled from "styled-components";

import FooterLogoImg from "../../assets/footer-logo.svg";

function Footer() {
  return (
    <FooterComp>
      <hr />
      <FooterArea.main>
        <FooterArea.left>
          <div>
            <img src={FooterLogoImg} />
          </div>
          <FooterText.left>
            PURE WATER IS THE WORLD'S <br />
            FIRST AND FOREMOST MEDICINE.
          </FooterText.left>
        </FooterArea.left>
        <FooterArea.right>
          <FooterText.right>
            <div>ABOUT US</div>
            <div>INSTAGRAM</div>
          </FooterText.right>
        </FooterArea.right>
      </FooterArea.main>
    </FooterComp>
  );
}

export default Footer;

const FooterComp = styled.div`
  font-family: "Pretendard Variable", Pretendard, -apple-system,
    BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI",
    "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", "Apple Color Emoji",
    "Segoe UI Emoji", "Segoe UI Symbol", sans-serif;
`;

const FooterArea = {
  main: styled.div`
    max-width: 640px;
    margin: auto;
    margin-top: 183px;
    padding: 24px;
    padding-bottom: 47px;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
  `,
  left: styled.div``,
  right: styled.div``,
};

const FooterText = {
  left: styled.div`
    margin-top: 24px;
    font-size: 10px;
  `,
  right: styled.div`
    font-size: 11px;
    & > div {
      padding: 5px 0;
    }
  `,
};
