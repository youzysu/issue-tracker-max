import Comment from "@components/Comment";
import Sidebar from "@components/common/Sidebar/Sidebar";
import { Label, Milestone, User } from "@customTypes/index";
import { compareSet } from "@utils/compareArray";
import { putEditField } from "api";
import _ from "lodash";
import { useRef, useState } from "react";
import styled from "styled-components";

export default function IssueDetailBody({
  issueId,
  assignees,
  labels,
  milestone,
}: {
  issueId: number;
  // TO-BE: assignees: number[]; labels: number[]; milestone: number;
  assignees: User[];
  labels: Label[];
  milestone: Milestone;
}) {
  // TODO: 이슈 상세 조회 API ID만 받도록 개선 필요
  const [issueDetail, setIssueDetail] = useState<{
    assignees: Set<number>;
    labels: Set<number>;
    milestone: number;
  }>({
    assignees: new Set<number>(
      assignees.map((assignee: User) => assignee.userAccountId)
    ),
    labels: new Set<number>(labels.map((label: Label) => label.labelId)),
    milestone: milestone.milestoneId,
  });

  const prevIssueDetail = useRef(_.cloneDeep(issueDetail));

  const onAssigneeChange = (assignees: Set<number>) => {
    setIssueDetail((prev) => ({ ...prev, assignees }));
  };

  const onLabelChange = (labels: Set<number>) => {
    setIssueDetail((prev) => ({ ...prev, labels }));
  };

  const onMilestoneChange = (milestone: number) => {
    setIssueDetail((prev) => ({ ...prev, milestone }));
  };

  const onEditIssues = () => {
    const editedInfo = compareSet(
      prevIssueDetail.current.assignees,
      issueDetail.assignees
    );
    putEditField(issueId, "assignees", editedInfo);
  };

  const onEditLabels = () => {
    const editedInfo = compareSet(
      prevIssueDetail.current.labels,
      issueDetail.labels
    );
    putEditField(issueId, "labels", editedInfo);
  };

  // TODO: 마일스톤 없는 이슈 DropdownItem 추가
  const onEditMilestone = () => {
    const isNotModified =
      prevIssueDetail.current.milestone === issueDetail.milestone;
    const isRemoved = issueDetail.milestone === 0;

    const editedInfo = {
      milestoneId: isRemoved ? null : issueDetail.milestone,
    };
    !isNotModified && putEditField(issueId, "milestone", editedInfo);
  };

  return (
    <Body>
      <div className="comments-container">
        <Comment
          {...{
            username: "Kakamotobi",
            profileUrl: "url",
            createdAt: "yesterday",
            content: "blahblahblahblah",
            isIssueAuthor: true,
          }}
        />

        {/* TODO: comments.map() */}

        {/* TODO: 새 코멘트 작성 text area */}
      </div>
      <Sidebar
        {...{
          assignees: issueDetail.assignees,
          labels: issueDetail.labels,
          milestone: issueDetail.milestone,
          onAssigneeChange,
          onLabelChange,
          onMilestoneChange,
          onEditIssues,
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
  gap: 32px;
  border-top: ${({ theme: { border, neutral } }) =>
    `${border.default} ${neutral.border.default}`};

  .comments-container {
    display: flex;
    flex-direction: column;
    gap: 24px;
    flex-grow: 1;
  }
`;
