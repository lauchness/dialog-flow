import styled from "@emotion/styled";
import { color, mediaQuery, font } from "../theme";

export const ChatSessionContainer = styled.div`
  position: fixed;
  width: 95%;
  height: 95%;
  max-height: ${({ open }) => (open ? "95%" : "7rem")};
  bottom: 2.5%;
  right: 2.5%;
  border-radius: 0.4rem;
  background: ${color.lightGray};
  overflow: hidden;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: ${({ open }) => (open ? "7rem 1fr 5rem" : "7rem 0 0")};

  ${mediaQuery.large} {
    width: 30rem;
    height: 45rem;
    max-height: ${({ open }) => (open ? "45rem" : "7rem")};
    bottom: 1rem;
    right: 1rem;
  }
`;

export const ChatHeader = styled.div`
  height: 7rem;
  background: ${color.purple};
  color: ${color.white};
  font-size: ${font.size.large};
  padding: 0 2rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;

  &:hover {
    & div {
      & svg {
        opacity: 1;
      }
    }
  }

  & div {
    display: flex;
    height: 100%;
    flex: 1 0 auto;
    align-items: center;
    justify-content: flex-start;

    &.flip {
      justify-content: flex-end;
    }

    & svg {
      height: 4rem;
      margin-left: 1rem;
    }

    & button {
      justify-self: end;
      background: transparent;
      color: ${color.white};
      border: none;
      outline: none;
      cursor: pointer;

      & svg {
        opacity: 0;
        height: 4rem;
        transition: all 0.25s linear;
      }

      &.closed {
        & svg {
          transform: rotateZ(180deg);
        }
      }
    }
  }
`;
