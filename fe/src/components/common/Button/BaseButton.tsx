import styled from "styled-components";

export const BaseStyledButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  gap: 4px;
  cursor: pointer;

  &:hover {
    opacity: ${({ theme }) => theme.opacity.hover};
  }
  &:active {
    opacity: ${({ theme }) => theme.opacity.press};
  }
  &:disabled {
    opacity: ${({ theme }) => theme.opacity.disabled};
  }
`;
