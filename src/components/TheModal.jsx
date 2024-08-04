import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

function TheModal({
  openModal,
  setOpenModal,
  children: ModalContent = <div>Modal</div>,
  style,
  backdropStyle,
}) {
  return (
    <HeaderModal className={openModal}>
      <HeaderModalBackdrop
        className={openModal}
        onClick={() => setOpenModal("hidden")}
        style={backdropStyle}
      />
      <HeaderModalContent className={openModal} style={style}>
        {ModalContent}
      </HeaderModalContent>
    </HeaderModal>
  );
}

export default TheModal;

const HeaderModal = styled.div`
  z-index: 999;
  position: fixed;
  /* background-color: rgba(0, 0, 0, 0.3); */

  padding: 0;
  width: 0;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  display: flex; // Overwritten by inline style
  align-items: center;
  justify-content: center;

  box-sizing: border-box;
  padding: 16px;

  /* opacity: 0; */
  /* visibility: hidden; */

  &.initial {
    visibility: hidden;
  }

  &.hidden {
    visibility: hidden;
  }

  &.show {
    visibility: visible;
  }

  & .initial {
    visibility: hidden;
  }

  & .hidden {
    animation: fadeOut 250ms forwards;
  }

  & .show {
    animation: fadeIn 250ms forwards;
  }
  /* 
  visibility: hidden;
  opacity: ${(props) => (props.modalOpen ? 100 : 0)}; */
  /* visibility: ${(props) => (props.modalOpen ? "visible" : "hidden")}; */
  /* transition: opacity 1000ms linear; */

  @keyframes fadeOut {
    from {
      opacity: 1;
      visibility: visible;
    }
    to {
      opacity: 0;
      visibility: hidden; /* Optional: also set visibility to hidden at the end */
    }
  }

  /* Define keyframes for fade in */
  @keyframes fadeIn {
    from {
      opacity: 0;
      visibility: visible; /* Optional: ensure visibility is set to visible at the start */
    }
    to {
      opacity: 1;
      visibility: visible;
    }
  }
`;

const HeaderModalBackdrop = styled.div`
  /* background-color: white; */
  height: 100%;
  width: 100%;
  position: absolute;
`;

const HeaderModalContent = styled.div`
  width: 100%;
  max-width: 380px;
  background: rgba(222, 239, 255, 0.85);
  box-shadow: inset 4.39333px -4.39333px 4.39333px rgba(186, 201, 214, 0.454),
    inset -4.39333px 4.39333px 4.39333px rgba(255, 255, 255, 0.454);
  border-radius: 30px;
  padding: 33px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;

  @supports ((-webkit-backdrop-filter: none) or (backdrop-filter: none)) {
    & {
      background: rgba(222, 239, 255, 0.127);
      -webkit-backdrop-filter: blur(24.383px) opacity(1);
      backdrop-filter: blur(24.383px) opacity(1);
    }
  }
`;
