import React from "react";
import styled from "styled-components";

import FooterLogoImg from "../../assets/footer-logo.svg";
import { pretendard } from "../../styles/fonts";
import { Link } from "react-router-dom";

function Footer({ noTop = false }) {
  return (
    <FooterComp data-aos="fade-up">
      {!noTop && <hr />}
      <FooterArea.main noTop={noTop}>
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
            <Link
              style={{ color: "white", textDecoration: "none" }}
              to="/aboutus"
            >
              ABOUT US
            </Link>
            <div>INSTAGRAM</div>
          </FooterText.right>
        </FooterArea.right>
      </FooterArea.main>
    </FooterComp>
  );
}

export default Footer;

const FooterComp = styled.div`
  ${pretendard}
`;

const FooterArea = {
  main: styled.div`
    max-width: 640px;
    margin: auto;
    margin-top: ${({ noTop }) => (!noTop ? "183px" : "0")};
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
