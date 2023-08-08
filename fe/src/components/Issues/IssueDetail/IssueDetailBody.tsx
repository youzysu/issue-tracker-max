import Sidebar from "@components/common/Sidebar/Sidebar";
import { IssueSidebar } from "@customTypes/index";
import useFetch from "@hooks/useFetch";
import { compareSet } from "@utils/compareSet";
import { getIssueSidebar, postEditField } from "api";
import { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";

export default function IssueDetailBody({
  issueNumber,
}: {
  issueNumber: number;
}) {
  const { data: issueSidebar, setData: updateIssueSidebar } =
    useFetch<IssueSidebar>(
      useCallback(() => getIssueSidebar(issueNumber), [issueNumber])
    );

  const [issueDetail, setIssueDetail] = useState<{
    assignees: Set<number>;
    labels: Set<number>;
    milestone: number;
  }>({
    assignees: new Set<number>(issueSidebar?.assignees),
    labels: new Set<number>(issueSidebar?.labels),
    milestone: issueSidebar?.milestone || 0,
  });

  const prevIssueSidebar = useRef(issueDetail);

  useEffect(() => {
    setIssueDetail((prev) => ({
      ...prev,
      assignees: new Set<number>(issueSidebar?.assignees),
      labels: new Set<number>(issueSidebar?.labels),
      milestone: issueSidebar?.milestone || 0,
    }));

    prevIssueSidebar.current = {
      assignees: new Set<number>(issueSidebar?.assignees),
      labels: new Set<number>(issueSidebar?.labels),
      milestone: issueSidebar?.milestone || 0,
    };
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
    setIssueDetail((prev) => ({ ...prev, assignees }));
  };

  const onLabelChange = (labels: Set<number>) => {
    setIssueDetail((prev) => ({ ...prev, labels }));
  };

  const onMilestoneChange = (milestone: number) => {
    setIssueDetail((prev) => ({ ...prev, milestone }));
  };

  const onEditIssue = async () => {
    try {
      const { addedElements, removedElements } = compareSet(
        prevIssueSidebar.current.assignees,
        issueDetail.assignees
      );

      const { statusText } = await postEditField(issueNumber, "assignees", {
        addUserAccountId: addedElements,
        removeUserAccountId: removedElements,
      });

      statusText === "OK" && updateIssueAssignee([...issueDetail.assignees]);
    } catch (e) {
      // TODO: error handling
      console.log(e);
    }
  };

  const onEditLabels = async () => {
    try {
      const { addedElements, removedElements } = compareSet(
        prevIssueSidebar.current.labels,
        issueDetail.labels
      );

      const { statusText } = await postEditField(issueNumber, "labels", {
        addLabelsId: addedElements,
        removeLabelsId: removedElements,
      });

      statusText === "OK" && updateIssueLabels([...issueDetail.labels]);
    } catch (e) {
      // TODO: error handling
      console.log(e);
    }
  };

  // TODO: 마일스톤 없는 이슈 DropdownItem 추가
  const onEditMilestone = async () => {
    try {
      const isNotModified =
        prevIssueSidebar.current.milestone === issueDetail.milestone;

      if (isNotModified) return;

      const { statusText } = await postEditField(issueNumber, "milestone", {
        milestoneId: issueDetail.milestone,
      });

      statusText === "OK" && updateIssueMilestone(issueDetail.milestone);
    } catch (e) {
      // TODO: error handling
      console.log(e);
    }
  };

  return (
    <Body>
      <div className="comments-container">
        {/* TODO: 이슈 Content Comment */}
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
