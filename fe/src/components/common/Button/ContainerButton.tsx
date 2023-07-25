import styled from "styled-components";
import { ButtonProps } from "./Button";
import { HEIGHT, WIDTH } from "./constants";

export default function ContainerButton(props: ButtonProps) {
  return (
    <StyledContainerButton {...props}>{props.children}</StyledContainerButton>
  );
}

const StyledContainerButton = styled.button<ButtonProps>`
  display: flex;
  justify-content: center;
  align-items: center;

  width: ${({ size }) => size && WIDTH[size]};
  height: ${({ size }) => size && HEIGHT[size]};
  border-radius: ${({ theme }) => theme.radius.m};
  background-color: ${({ theme }) => theme.brand.surface.default};
  color: ${({ theme }) => theme.brand.text.default};
  cursor: pointer;

  &:hover {
    opacity: ${({ theme }) => theme.opacity.hover};
  }
  &:disabled {
    opacity: ${({ theme }) => theme.opacity.disabled};
  }
`;
