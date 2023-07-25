import styled from "styled-components";
import { BaseStyledButton } from "./BaseButton";
import { ButtonProps } from "./Button";

export default function GhostButton(props: ButtonProps) {
  return <StyledGhostButton {...props}>{props.children}</StyledGhostButton>;
}

export const StyledGhostButton = styled(BaseStyledButton)<ButtonProps>`
  padding: 0 24px;
  color: ${({ theme }) => theme.neutral.text.strong};
`;
