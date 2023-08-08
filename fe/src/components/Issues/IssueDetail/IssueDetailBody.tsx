import plusIcon from "@assets/icon/plus.svg";
import Comment from "@components/Comment";
import Button from "@components/common/Button";
import Sidebar from "@components/common/Sidebar/Sidebar";
import TextAreaContainer from "@components/common/TextArea/TextAreaContainer";
import { IssueComment, IssueDetails, IssueSidebar } from "@customTypes/index";
import useFetch from "@hooks/useFetch";
import { compareSet } from "@utils/compareSet";
import { getIssueSidebar, postComment, postEditField } from "api";
import { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";

export default function IssueDetailBody({
  issueNumber,
  issueDetails,
  comments,
  onCommentAdd,
}: {
  issueNumber: number;
  issueDetails: IssueDetails | null;
  comments: IssueComment[];
  onCommentAdd: (newComment: IssueComment) => void;
}) {
  const { data: issueSidebar, setData: updateIssueSidebar } =
    useFetch<IssueSidebar>(
      useCallback(() => getIssueSidebar(issueNumber), [issueNumber])
    );

  const { author, createdAt, content } = issueDetails || {
    author: { username: "", profileUrl: "" },
    createdAt: new Date().toISOString(),
    content: "",
  };

  const [newIssueSidebar, setNewIssueSidebar] = useState<{
    assignees: Set<number>;
    labels: Set<number>;
    milestone: number;
  }>({
    assignees: new Set<number>(issueSidebar?.assignees),
    labels: new Set<number>(issueSidebar?.labels),
    milestone: issueSidebar?.milestone || 0,
  });

  const [newComment, setNewComment] = useState<string>("");
  const isFilled = !!newComment;

  const prevIssueSidebar = useRef(newIssueSidebar);

  useEffect(() => {
    if (issueSidebar) {
      prevIssueSidebar.current = {
        assignees: new Set<number>(issueSidebar.assignees),
        labels: new Set<number>(issueSidebar.labels),
        milestone: issueSidebar.milestone,
      };

      setNewIssueSidebar({
        assignees: new Set<number>(issueSidebar.assignees),
        labels: new Set<number>(issueSidebar.labels),
        milestone: issueSidebar.milestone,
      });
    }
  }, [issueSidebar]);

  const updateIssueAssignee = (assignees: number[]) => {
    updateIssueSidebar((prev) => {
      return prev ? { ...prev, assignees } : prev;
    });
  };

  const updateIssueLabels = (labels: number[]) => {
    updateIssueSidebar((prev) => {
      return prev ? { ...prev, labels } : prev;
    });
  };

  const updateIssueMilestone = (milestone: number) => {
    updateIssueSidebar((prev) => {
      return prev ? { ...prev, milestone } : prev;
    });
  };

  const onAssigneeChange = (assignees: Set<number>) => {
    setNewIssueSidebar((prev) => ({ ...prev, assignees }));
  };

  const onLabelChange = (labels: Set<number>) => {
    setNewIssueSidebar((prev) => ({ ...prev, labels }));
  };

  const onMilestoneChange = (milestone: number) => {
    setNewIssueSidebar((prev) => ({ ...prev, milestone }));
  };

  const onContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const targetValue = e.target.value;
    setNewComment(targetValue);
  };

  const appendContent = (content: string) => {
    setNewComment((prev) => `${prev} ${content}`);
  };

  const onEditIssue = async () => {
    try {
      const { addedElements, removedElements } = compareSet(
        prevIssueSidebar.current.assignees,
        newIssueSidebar.assignees
      );

      const { statusText } = await postEditField(issueNumber, "assignees", {
        addUserAccountId: addedElements,
        removeUserAccountId: removedElements,
      });

      statusText === "OK" &&
        updateIssueAssignee([...newIssueSidebar.assignees]);
    } catch (e) {
      // TODO: error handling
      console.log(e);
    }
  };

  const onEditLabels = async () => {
    try {
      const { addedElements, removedElements } = compareSet(
        prevIssueSidebar.current.labels,
        newIssueSidebar.labels
      );

      const { statusText } = await postEditField(issueNumber, "labels", {
        addLabelsId: addedElements,
        removeLabelsId: removedElements,
      });

      statusText === "OK" && updateIssueLabels([...newIssueSidebar.labels]);
    } catch (e) {
      // TODO: error handling
      console.log(e);
    }
  };

  // TODO: 마일스톤 없는 이슈 DropdownItem 추가
  const onEditMilestone = async () => {
    try {
      const isNotModified =
        prevIssueSidebar.current.milestone === newIssueSidebar.milestone;

      if (isNotModified) return;

      const { statusText } = await postEditField(issueNumber, "milestone", {
        milestoneId: newIssueSidebar.milestone,
      });

      statusText === "OK" && updateIssueMilestone(newIssueSidebar.milestone);
    } catch (e) {
      // TODO: error handling
      console.log(e);
    }
  };

  const onCommentSubmit = async () => {
    try {
      const { status, data } = await postComment(issueNumber, {
        content: newComment,
      });
      if (status === 201) {
        setNewComment("");
        onCommentAdd(data);
      }
    } catch (error) {
      // TODO: error handling
      console.log(error);
    }
  };

  const commentList = comments.map((comment) => (
    <Comment
      key={comment.commentId}
      author={{ username: comment.username, profileUrl: comment.profileUrl }}
      createdAt={comment.createdAt}
      content={comment.content}
      isIssueAuthor={comment.username === author.username}
    />
  ));

  return (
    <Body>
      <div className="comments-container">
        <Comment {...{ author, createdAt, content, isIssueAuthor: true }} />
        {commentList}
        <TextAreaContainer
          name="comment"
          placeholder="코멘트를 입력하세요"
          value={newComment}
          rows={5}
          onChange={onContentChange}
          appendContent={appendContent}
        />
        <Button
          variant="container"
          size="S"
          disabled={!isFilled}
          onClick={onCommentSubmit}>
          <img src={plusIcon} alt="" />
          <span>코멘트 작성</span>
        </Button>
      </div>
      <Sidebar
        {...{
          assignees: newIssueSidebar.assignees,
          labels: newIssueSidebar.labels,
          milestone: newIssueSidebar.milestone,
          onAssigneeChange,
          onLabelChange,
          onMilestoneChange,
          onEditIssue,
          onEditLabels,
          onEditMilestone,
        }}
      />
    </Body>
  );
}

const Body = styled.div`
  width: 100%;
  padding-top: 24px;
  display: flex;
  justify-content: center;
  gap: 32px;
  border-top: ${({ theme: { border, neutral } }) =>
    `${border.default} ${neutral.border.default}`};

  .comments-container {
    display: flex;
    flex-direction: column;
    gap: 24px;
    flex-grow: 1;

    align-items: flex-end;
  }
`;
