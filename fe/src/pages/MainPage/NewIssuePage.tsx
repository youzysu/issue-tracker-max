import XIcon from "@assets/icon/xSquare.svg";
import { Avatar } from "@components/common/Avatar";
import Button from "@components/common/Button";
import Sidebar from "@components/common/Sidebar";
import TextArea from "@components/common/TextArea";
import TextInput from "@components/common/TextInput";
import { Label, User } from "@customTypes/index";
import { postIssue } from "api";
import { useAuth } from "context/authContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

export default function NewIssuePage() {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [assigneeList, setAssigneeList] = useState<User[]>([]);
  const [labelList, setLabelList] = useState<Label[]>([]);

  const { userInfo } = useAuth();
  const navigate = useNavigate();

  const isFilled = !!title;

  const onTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const targetValue = e.target.value;
    setTitle(targetValue);
  };

  const onCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const targetValue = e.target.value;
    setContent(targetValue);
  };

  const moveToMainPage = () => navigate("/");

  const onIssueSubmit = async () => {
    const res = await postIssue({
      title,
      content,
    });
  };

  return (
    <StyledNewIssuePage>
      <Title>새로운 이슈 작성</Title>
      <Line />
      <div className="wrapper">
        <Avatar
          src={userInfo.profileUrl}
          alt={`${userInfo.loginId}-avatar`}
          $size="M"
        />
        <div className="form">
          <TextInput
            name="title"
            variant="tall"
            placeholder="제목"
            value={title}
            hasError={!isFilled}
            helpText="이슈 제목은 필수로 입력해주세요!"
            onChange={onTitleChange}
          />
          <TextArea
            name="comment"
            placeholder="코멘트를 입력하세요"
            value={content}
            rows={30}
            onChange={onCommentChange}
          />
        </div>
        <div>
          <Sidebar {...{ assigneeList, labelList }} />
        </div>
      </div>

      <Line />
      <footer className="footer">
        <Button variant="ghost" size="M" onClick={moveToMainPage}>
          <img src={XIcon} alt="" />
          <span>작성 취소</span>
        </Button>
        <Button
          variant="container"
          size="L"
          onClick={onIssueSubmit}
          disabled={!isFilled}>
          완료
        </Button>
      </footer>
    </StyledNewIssuePage>
  );
}

const StyledNewIssuePage = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 24px;

  .line {
    border-bottom: ${({ theme: { border, neutral } }) =>
      `${border.default} ${neutral.border.default}`};
  }

  .wrapper {
    display: flex;
    width: 100%;
    gap: 24px;
  }

  .form {
    display: flex;
    flex-grow: 1;
    flex-direction: column;
    gap: 8px;
  }

  .footer {
    display: flex;
    justify-content: flex-end;
    gap: 32px;
  }
`;

const Title = styled.span`
  font: ${({ theme: { font } }) => font.displayBold32};
  color: ${({ theme: { neutral } }) => neutral.text.strong};
`;

const Line = styled.div`
  border-bottom: ${({ theme: { border, neutral } }) =>
    `${border.default} ${neutral.border.default}`};
`;
