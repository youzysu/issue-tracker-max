import styled from "styled-components";
import AddAssignee from "./AddAssignee";
import AddLabel from "./AddLabel";
import AddMilestone from "./AddMilestone";

export default function Sidebar({
  assignees,
  labels,
  milestone,
  onAssigneeChange,
  onLabelChange,
  onMilestoneChange,
}: {
  assignees: number[];
  labels: number[];
  milestone: number;
  onAssigneeChange: (assignees: number[]) => void;
  onLabelChange: (labels: number[]) => void;
  onMilestoneChange: (milestone: number) => void;
}) {
  return (
    <StyledSidebar>
      <AddAssignee {...{ assignees, onAssigneeChange }} />
      <AddLabel {...{ labels, onLabelChange }} />
      <AddMilestone {...{ milestone, onMilestoneChange }} />
    </StyledSidebar>
  );
}

const StyledSidebar = styled.div`
  width: 288px;
  border: ${({ theme: { border, neutral } }) =>
    `${border.default} ${neutral.border.default}`};
  border-radius: ${({ theme: { radius } }) => radius.l};
  background-color: ${({ theme: { neutral } }) => neutral.surface.strong};

  > div:not(:last-child) {
    border-bottom: ${({ theme: { border, neutral } }) =>
      `${border.default} ${neutral.border.default}`};
  }

  #dropdown-indicator-assignee,
  #dropdown-indicator-label,
  #dropdown-indicator-milestone {
    width: 100%;
  }
`;
