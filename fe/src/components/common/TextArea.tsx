import paperClipIcon from "@assets/icon/paperclip.svg";
import { useState } from "react";
import styled from "styled-components";
import { Label } from "./Label";

export default function TextArea({
  name,
  value,
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const [isFocused, setIsFocused] = useState(false);

  const textAreaState = isFocused ? "active" : "enabled";
  const typingState = isFocused ? "onTyping" : "typed";

  return (
    <TextAreaContainer $state={textAreaState}>
      {value && <Label htmlFor={name}>{props.placeholder}</Label>}
      <StyledTextArea
        id={name}
        $typingState={typingState}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        {...props}
      />
      <FileUploadButton>
        <label className="file-upload-label" htmlFor="file-upload-input">
          <img
            className="file-upload-icon"
            src={paperClipIcon}
            alt="파일 첨부 아이콘"
          />
          파일 첨부하기
        </label>
        <input type="file" id="file-upload-input" />
      </FileUploadButton>
    </TextAreaContainer>
  );
}

const TextAreaContainer = styled.div<{
  $state: "enabled" | "active" | "disabled";
}>`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  justify-content: "center";
  padding: 16px;
  gap: 8px;
  color: ${({ theme: { neutral } }) => neutral.text.weak};
  border: ${({ $state, theme: { neutral, border } }) => {
    const type = {
      active: `${border.default} ${neutral.border.defaultActive}`,
      disabled: "none",
      enabled: "none",
    };
    return type[$state];
  }};
  border-radius: ${({ theme: { radius } }) => `${radius.l}`};
  background-color: ${({ $state, theme: { neutral } }) => {
    const type = {
      active: neutral.surface.strong,
      disabled: neutral.surface.bold,
      enabled: neutral.surface.bold,
    };
    return type[$state];
  }};
  opacity: ${({ $state, theme: { opacity } }) =>
    $state === "disabled" && opacity.disabled};
`;

const StyledTextArea = styled.textarea<{
  $typingState: "onTyping" | "typed";
}>`
  display: flex;
  width: 100%;
  height: 100%;
  font: ${({ theme: { font } }) => font.displayMD16};
  caret-color: ${({ theme: { palette } }) => palette.blue};
  &::placeholder {
    color: ${({ theme: { neutral } }) => neutral.text.weak};
  }
`;

const FileUploadButton = styled.div`
  font: ${({ theme: { font } }) => font.displayMD12};
  color: ${({ theme: { neutral } }) => neutral.text.default};

  .file-upload-label {
    display: flex;
    align-items: center;
    gap: 4px;
  }

  #file-upload-input {
    display: none;
  }

  .file-upload-icon {
    width: 16px;
    height: 16px;
    filter: ${({ theme: { filter } }) => filter.neutralTextDefault};
  }

  :hover {
    cursor: pointer;
  }
`;
