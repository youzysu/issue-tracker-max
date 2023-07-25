import styled from "styled-components";
import { ButtonProps } from "./Button";

export default function GhostButton(props: ButtonProps) {
  return <StyledGhostButton {...props}>{props.children}</StyledGhostButton>;
}

const StyledGhostButton = styled.button<ButtonProps>`
  display: flex;
  justify-content: center;
  align-items: center;

  padding: 0px, 24px, 0px, 24px;
  cursor: pointer;
  color: ${({ theme }) => theme.neutral.text.strong};

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
