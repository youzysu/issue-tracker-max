import styled from "styled-components";
import { ButtonProps } from "./Button";
import { HEIGHT, WIDTH } from "./constants";

export default function OutlineButton(props: ButtonProps) {
  return <StyledOutlineButton {...props}>{props.children}</StyledOutlineButton>;
}

const StyledOutlineButton = styled.button<ButtonProps>`
  display: flex;
  justify-content: center;
  align-items: center;

  width: ${({ size }) => size && WIDTH[size]};
  height: ${({ size }) => size && HEIGHT[size]};

  border: ${({ theme }) =>
    `${theme.border.default} ${theme.brand.border.default}`};
  border-radius: ${({ theme }) => theme.radius.m};
  color: ${({ theme }) => theme.brand.text.weak};
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
