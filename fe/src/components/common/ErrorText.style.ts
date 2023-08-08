import styled from "styled-components";

export const ErrorText = styled.span`
  font: ${({ theme: { font } }) => font.displayMD12};
  color: ${({ theme: { danger } }) => danger.text.default};

  display: flex;
  justify-content: flex-end;
`;
