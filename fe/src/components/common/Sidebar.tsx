import DropdownIndicator from "@components/Dropdown/DropdownIndicator";
import LabelTag from "@components/LabelTag";
import { Label, Milestone, User } from "@customTypes/index";
import useFetch from "@hooks/useFetch";
import { getLabels, getMilestones, getUsers } from "api";
import styled from "styled-components";
import { Avatar } from "./Avatar";

export default function Sidebar({
  assigneeList,
  labelList,
}: {
  assigneeList: User[];
  labelList: Label[];
}) {
  const userList = useFetch<User[]>([], getUsers);
  const allLabels = useFetch<Label[]>([], getLabels);
  const milestonesList = useFetch<Milestone[]>([], getMilestones);

  // TODO: variant string type
  const assigneeDropdownList = userList.map((user) => ({
    variant: "withImg",
    name: "assignee",
    content: user.username,
    imgSrc: user.profileUrl,
  }));

  const labelDropdownList = allLabels.map((label) => ({
    variant: "withColor",
    name: "label",
    content: label.name,
    colorFill: label.backgroundColor,
  }));

  const milestoneDropdownList = milestonesList.map((milestone) => ({
    variant: "plain",
    name: "milestone",
    content: milestone.milestoneName,
  }));

  const generateAssigneeList = () => {
    return assigneeList.map((assignee) => {
      return (
        <div>
          <Avatar
            src={assignee.profileUrl}
            alt={`${assignee.username}`}
            $size="S"
          />
          <Content>{assignee.username}</Content>
        </div>
      );
    });
  };

  const generateLabelList = () => {
    return labelList.map((label) => {
      return (
        <div>
          <LabelTag {...{ label }} />
        </div>
      );
    });
  };

  // const onAssigneeClick = (e: React.MouseEvent<HTMLDivElement>) => {
  //   const targetValue = e.currentTarget.textContent;
  //   const targetUser = userList.find((user) => user.username === targetValue);
  // };

  return (
    <StyledSidebar>
      <Option>
        <DropdownIndicator
          displayName="담당자"
          dropdownPanelVariant="select"
          dropdownName="assignee"
          dropdownList={assigneeDropdownList}
          dropdownPanelPosition="right"
        />
        {generateAssigneeList()}
      </Option>
      <Option>
        <DropdownIndicator
          displayName="레이블"
          dropdownPanelVariant="select"
          dropdownName="label"
          dropdownList={labelDropdownList}
          dropdownPanelPosition="right"
        />
        {generateLabelList()}
      </Option>
      <Option>
        <DropdownIndicator
          displayName="마일스톤"
          dropdownPanelVariant="select"
          dropdownName="milestone"
          dropdownList={milestoneDropdownList}
          dropdownPanelPosition="right"
        />
        {/* TODO: progress bar */}
      </Option>
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

const Option = styled.div`
  width: 100%;
  padding: 32px;
`;

const Content = styled.span``;
