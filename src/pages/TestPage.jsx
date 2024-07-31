import React, { useState } from "react";

import styled from "styled-components";

const Container = styled.div`
  width: 300px;
  margin: 20px auto;
`;

const Header = styled.div`
  background-color: #f1f1f1;
  padding: 10px;
  cursor: pointer;
  border: 1px solid #ccc;
  margin-top: 10px;
`;

const Paragraph = styled.div`
  overflow: hidden;
  height: ${(props) => (props.isOpen ? "100px" : "0")};
  transition: height 0.3s ease-in-out;
  background-color: #f9f9f9;
  border: ${(props) => (props.isOpen ? "1px solid #ccc" : "none")};
  border-top: none;
  div {
    margin: 8px;
  }
`;

function TestPage() {
  const [openIndex, setOpenIndex] = useState(null);

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <Container>
      {[1, 2, 3].map((item, index) => (
        <div key={index}>
          <Header onClick={() => handleToggle(index)}>Header {item}</Header>
          <Paragraph isOpen={openIndex === index}>
            <div> This is the content for Header {item}.</div>
          </Paragraph>
        </div>
      ))}
    </Container>
  );
}

export default TestPage;
