import paperClipIcon from "@assets/icon/paperclip.svg";
import { postImage } from "api";
import styled from "styled-components";
import { Label } from "./Label";

export default function TextArea({
  name,
  value,
  appendContent,
  ...props
}: {
  appendContent: (content: string) => void;
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const onFileInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const file = files[0];
    const filename = file.name;

    const {
      data: { fileUrl },
    } = await postImage(file);
    if (fileUrl) {
      appendContent(`![${filename}](${fileUrl})`);
    }
  };

  return (
    <TextAreaContainer>
      {value && <Label htmlFor={name}>{props.placeholder}</Label>}
      <StyledTextArea id={name} value={value} {...props} />
      <FileUploadWrapper>
        <Label className="file-upload-label" htmlFor="file-upload-input">
          <img
            className="file-upload-icon"
            src={paperClipIcon}
            alt="파일 첨부 아이콘"
          />
          파일 첨부하기
          <input
            type="file"
            id="file-upload-input"
            onChange={onFileInputChange}
          />
        </Label>
      </FileUploadWrapper>
    </TextAreaContainer>
  );
}

const TextAreaContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
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

const FileUploadWrapper = styled.div`
  border-top: ${({ theme: { border, neutral } }) =>
    `${border.dash} ${neutral.border.default}`};

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
