import styled from "styled-components";
import { BaseStyledButton } from "./BaseButton";
import { ButtonProps } from "./Button";
import { HEIGHT, WIDTH } from "./constants";

export default function ContainerButton(props: ButtonProps) {
  return <StyledContainerButton {...props}></StyledContainerButton>;
}

export const StyledContainerButton = styled(BaseStyledButton)<ButtonProps>`
  width: ${({ size }) => size && WIDTH[size]};
  height: ${({ size }) => size && HEIGHT[size]};
  border-radius: ${({ theme, size }) =>
    size === "L" ? theme.radius.l : theme.radius.m};

  background-color: ${({ theme }) => theme.brand.surface.default};
  color: ${({ theme }) => theme.brand.text.default};

  & > img {
    filter: ${({ theme }) => theme.filter.brandTextDefault};
  }
`;
