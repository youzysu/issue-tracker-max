import { useState } from "react";
import styled from "styled-components";

type TextInputProps = {
  name: string;
  height: 40 | 56;
  placeholderText?: string;
  hasError?: boolean;
  helpText?: string;
};

export default function TextInput(props: TextInputProps) {
  const { name, height, placeholderText, hasError, helpText } = props;

  const [content, setContent] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const isHighHeight = height === 56;
  const textInputState = isFocused ? "active" : hasError ? "error" : "enabled";
  const typingState = isFocused
    ? "onTyping"
    : content
    ? "typed"
    : "placeholder";

  const onInputChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
      <InputContainer $height={height} $state={textInputState}>
        {isHighHeight && content && <Label htmlFor={name}>{name}</Label>}
        {!isHighHeight && <Label htmlFor={name}>{name}</Label>}
        <Input
          id={name}
          type="text"
          value={content}
          $typingState={typingState}
          placeholder={placeholderText || name}
          onChange={onInputChanged}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
      </InputContainer>
      {helpText && (
        <HelpTextArea $state={textInputState}>{helpText}</HelpTextArea>
      )}
    </div>
  );
}

const InputContainer = styled.div<{
  $height: number;
  $state: "enabled" | "active" | "disabled" | "error";
}>`
  display: flex;
  flex-direction: ${({ $height }) => ($height === 56 ? "column" : "row")};
  width: 100%;
  justify-content: ${({ $height }) =>
    $height === 56 ? "center" : "space-between"};
  padding: 0px 16px;
  gap: 8px;
  color: ${({ theme: { neutral } }) => neutral.text.weak};
  height: ${({ $height }) => $height}px;
  border: ${({ $state, theme: { neutral, border, danger } }) => {
    const type = {
      active: `${border.default} ${neutral.border.defaultActive}`,
      error: `${border.default} ${danger.border.default}`,
      disabled: "none",
      enabled: "none",
    };
    return type[$state];
  }};
  border-radius: ${({ $height, theme: { radius } }) =>
    $height === 56 ? `${radius.l}` : `${radius.m}`};
  background-color: ${({ $state, theme: { neutral } }) => {
    const type = {
      active: neutral.surface.strong,
      error: neutral.surface.strong,
      disabled: neutral.surface.bold,
      enabled: neutral.surface.bold,
    };
    return type[$state];
  }};
  ${({ $state, theme: { opacity } }) =>
    $state === "disabled" && `opacity: ${opacity.disabled};`}
`;

const Label = styled.label`
  display: flex;
  align-items: center;
  font: ${({ theme: { font } }) => font.displayMD12};
`;

const Input = styled.input<{
  $typingState: "placeholder" | "onTyping" | "typed";
}>`
  display: flex;
  width: 80%;
  color: ${({ $typingState, theme: { neutral } }) => {
    const type = {
      placeholder: neutral.text.weak,
      onTyping: neutral.text.strong,
      typed: neutral.text.default,
    };
    return type[$typingState];
  }};
  font: ${({ theme: { font } }) => font.displayMD16};
  caret-color: ${({ theme: { palette } }) => palette.blue};
`;

const HelpTextArea = styled.span<{
  $state: "enabled" | "active" | "disabled" | "error";
}>`
  display: flex;
  color: ${({ $state, theme: { neutral, danger } }) => {
    const textColor = {
      active: neutral.text.weak,
      error: danger.text.default,
      disabled: neutral.text.weak,
      enabled: neutral.text.weak,
    };
    return textColor[$state];
  }};
  font: ${({ theme: { font } }) => font.displayMD12};
  padding: 0px 16px;
`;
