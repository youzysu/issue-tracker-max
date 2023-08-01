import DropdownIndicator from "@components/Dropdown/DropdownIndicator";
import { User } from "@customTypes/index";
import useFetch from "@hooks/useFetch";
import { getUsers } from "api";
import styled from "styled-components";
import { Avatar } from "../Avatar";
import CheckGroup from "./CheckGroup";

type UserMap = {
  [key: number]: User;
};

export default function AddAssignee({
  assignees,
  onAssigneeChange,
}: {
  assignees: number[];
  onAssigneeChange: (assignees: number[]) => void;
}) {
  const userList = useFetch<User[]>([], getUsers);

  const userMap: UserMap = userList.reduce((map: UserMap, user: User) => {
    map[user.userAccountId] = user;
    return map;
  }, {});

  // TODO: dropdownList variant string type error 해결하기
  const assigneeDropdownList = userList.map((user) => ({
    id: user.userAccountId,
    variant: "withImg",
    name: "assignee",
    content: user.username,
    imgSrc: user.profileUrl,
  }));

  const generateAssignees = () => {
    return assignees.map((assignee) => {
      const currentAssignee = userMap[assignee];
      return (
        <Wrapper key={currentAssignee.userAccountId}>
          <Avatar
            src={currentAssignee.profileUrl}
            alt={`${currentAssignee.username}`}
            $size="S"
          />
          <Content>{currentAssignee.username}</Content>
        </Wrapper>
      );
    });
  };

  return (
    <CheckGroup values={assignees} onChange={onAssigneeChange}>
      <DropdownIndicator
        displayName="담당자"
        dropdownPanelVariant="select"
        dropdownName="assignee"
        dropdownList={assigneeDropdownList}
        dropdownPanelPosition="right"
        selectType="multiple"
      />
      {generateAssignees()}
    </CheckGroup>
  );
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Content = styled.span`
  font: ${({ theme: { font } }) => font.displayMD12};
  color: ${({ theme: { neutral } }) => neutral.text.strong};
`;
