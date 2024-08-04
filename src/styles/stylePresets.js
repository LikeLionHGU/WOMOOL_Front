import styled from "styled-components";

export const HoverImageSpan = styled.div`
  position: relative;
  & {
    cursor: pointer;
  }

  & .hover {
    display: none;
  }

  &:not(.disabled) .spinner {
    display: none;
  }

  &:not(.disabled):hover {
    .hover {
      display: inline;
    }
    img:not(.hover) {
      display: none;
    }
  }
`;
