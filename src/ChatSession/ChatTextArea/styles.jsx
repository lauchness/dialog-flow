import styled from "@emotion/styled";
import { color, font } from "../../theme";

export const ChatTextAreaContainer = styled.div`
  max-height: ${({ open }) => (open ? "100%" : "0")};
  position: relative;
  background: ${color.white};

  & textarea {
    width: calc(100% - 6rem);
    height: calc(100% - 1rem);
    outline-color: ${color.lightPurple};
    resize: none;
    border: none;
    padding: ${({ open }) => (open ? "0.5rem" : "0")};
    font-family: ${font.family.regular};
    color: ${color.darkGray};
  }

  & button {
    position: absolute;
    width: 4rem;
    height: 4rem;
    right: 0.5rem;
    top: 0.5rem;
    border-radius: 0.4rem;
    background: ${color.lightPurple};
    outline: none;
    border: none;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    & svg {
      height: 4rem;
    }
  }
`;
