import alertIcon from "@assets/icon/alertCircle.svg";
import archiveIcon from "@assets/icon/archive.svg";
import editIcon from "@assets/icon/edit.svg";
import Button from "@components/common/Button";
import useFetch from "@hooks/useFetch";
import { getIssue } from "api";
import { useCallback } from "react";
import { useParams } from "react-router-dom";
import { styled } from "styled-components";
import IssueDetailBody from "./IssueDetailBody";

export default function IssueDetailPage() {
  const { issueId } = useParams();
  const issueIdNumber = parseInt(issueId!);

  const issueInfo = useFetch(
    {},
    useCallback(() => getIssue(issueIdNumber), [issueIdNumber])
  );

  const { assignees, labels, milestone } = issueInfo;
  const isIssueDetailFetched = !!Object.keys(issueInfo).length;

  return (
    <>
      <Header>
        <TitleAndButtons>
          <TitleWrapper>
            <h1>FE 이슈트래커 디자인 시스템 구현</h1>
            <span>#2</span>
          </TitleWrapper>

          <ButtonsWrapper>
            <Button variant="outline" size="S">
              <img src={editIcon} alt="제목 편집" />
              <span>제목 편집</span>
            </Button>
            <Button variant="outline" size="S">
              <img src={archiveIcon} alt="이슈 닫기" />
              <span>이슈 닫기</span>
            </Button>
          </ButtonsWrapper>
        </TitleAndButtons>

        <IssueInfo>
          <IssueStateTag>
            <img src={alertIcon} alt="열린 이슈" />
            <span>열린 이슈</span>
          </IssueStateTag>

          <p>이 이슈는 3분전에 kakamotobi에 의해 열렸습니다 ∙ 코멘트 1개</p>
        </IssueInfo>
      </Header>

      {isIssueDetailFetched && (
        <IssueDetailBody
          {...{ issueId: issueIdNumber, assignees, labels, milestone }}
        />
      )}
    </>
  );
}

const Header = styled.header`
  width: 100%;
  margin-bottom: 24px;
`;

const TitleAndButtons = styled.div`
  width: 100%;
  margin-bottom: 16px;
  display: flex;
  justify-content: space-between;
`;

const TitleWrapper = styled.div`
  display: flex;
  gap: 8px;

  h1 {
    font: ${({ theme: { font } }) => font.displayBold32};
    color: ${({ theme: { neutral } }) => neutral.text.strong};
  }

  span {
    font: ${({ theme: { font } }) => font.displayBold32};
    color: ${({ theme: { neutral } }) => neutral.text.weak};
  }
`;

const ButtonsWrapper = styled.div`
  display: flex;
  gap: 16px;
`;

const IssueInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  p {
    font: ${({ theme: { font } }) => font.displayMD16};
    color: ${({ theme: { neutral } }) => neutral.text.weak};
  }
`;

const IssueStateTag = styled.div`
  height: 32px;
  padding-inline: 16px;
  display: flex;
  align-items: center;
  gap: 4px;
  background-color: ${({ theme: { palette } }) => palette.blue};
  border-radius: ${({ theme: { radius } }) => radius.l};

  img {
    filter: ${({ theme: { filter } }) => filter.brandTextDefault};
  }

  span {
    font: ${({ theme: { font } }) => font.displayMD12};
    color: ${({ theme: { brand } }) => brand.text.default};
  }
`;
