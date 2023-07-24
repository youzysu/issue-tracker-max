import { Logo } from "@components/common/Logo";
import styled, { ThemeProvider } from "styled-components";
import GlobalStyle from "styles/GlobalStyle";
import designSystem from "styles/designSystem";

export default function App() {
  return (
    <ThemeProvider theme={designSystem}>
      <GlobalStyle />
      <Logo width={200} height={40}></Logo>
      <H1>적용 되니?</H1>
    </ThemeProvider>
  );
}

const H1 = styled.h1`
  color: ${({ theme: { colors } }) => colors.navy};
  font: ${({ theme: { font } }) => font.displayMD12};
`;
