import paperClipIcon from "@assets/icon/paperclip.svg";
import styled from "styled-components";
import { Label } from "./Label";

export default function TextArea({
  name,
  value,
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <TextAreaContainer>
      {value && <Label htmlFor={name}>{props.placeholder}</Label>}
      <StyledTextArea id={name} {...props} />
      <FileUploadButton>
        <Label className="file-upload-label" htmlFor="file-upload-input">
          <img
            className="file-upload-icon"
            src={paperClipIcon}
            alt="파일 첨부 아이콘"
          />
          파일 첨부하기
        </Label>
        <input type="file" id="file-upload-input" />
      </FileUploadButton>
    </TextAreaContainer>
  );
}

const TextAreaContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  justify-content: "center";
  padding: 16px;
  gap: 8px;
  color: ${({ theme: { neutral } }) => neutral.text.weak};
  border-radius: ${({ theme: { radius } }) => `${radius.l}`};
  background-color: ${({ theme: { neutral } }) => neutral.surface.bold};
  &:focus-within {
    border: ${({ theme: { neutral, border } }) =>
      `${border.default} ${neutral.border.defaultActive}`};
    background-color: ${({ theme: { neutral } }) => neutral.surface.strong};
  }
  &:disabled {
    opacity: ${({ theme: { opacity } }) => opacity.disabled};
  }
`;

const StyledTextArea = styled.textarea`
  display: flex;
  width: 100%;
  height: 100%;
  color: ${({ theme: { neutral } }) => neutral.text.default};
  font: ${({ theme: { font } }) => font.displayMD16};
  caret-color: ${({ theme: { palette } }) => palette.blue};
  &::placeholder {
    color: ${({ theme: { neutral } }) => neutral.text.weak};
  }
  &:focus {
    color: ${({ theme: { neutral } }) => neutral.text.strong};
  }
`;

const FileUploadButton = styled.div`
  .file-upload-label {
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
