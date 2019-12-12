import styled from '@emotion/styled';
import { color } from '../../theme';

export const ChatAreaContainer = styled.div`
  background: transparent;
  max-height: ${({ open }) => (open ? '100%' : '0')};
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    background: transparent;
    width: 0.5rem;
  }
`;

export const Message = styled.div`
  position: relative;
  background: ${color.darkGray};
  color: ${color.white};
  border-radius: 0.8rem;
  margin: 0.5rem 0;
  padding: 1rem;
  max-width: 80%;

  &::after {
    position: absolute;
    content: '';
    height: 1rem;
    width: 1rem;
    transform: rotateZ(45deg);
    background-color: ${color.darkGray};
    top: calc(100% - 0.75rem);
    left: 0.75rem;
  }

  &.request {
    align-self: flex-end;
    background-color: ${color.purple};

    &::after {
      background-color: ${color.purple};
      left: unset;
      right: 0.75rem;
    }
  }
`;
