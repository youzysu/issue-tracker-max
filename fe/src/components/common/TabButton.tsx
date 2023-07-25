import labelIcon from "@assets/icon/label.svg";
import milestoneIcon from "@assets/icon/milestone.svg";
import styled from "styled-components";
import Button from "./Button";

export default function TabButton({
  labelCount,
  milestoneCount,
}: {
  labelCount: number;
  milestoneCount: number;
}) {
  return (
    <StyledTabButton>
      <ButtonBox selected={true}>
        <Button variant="ghost" size="M" onClick={() => {}}>
          <img src={labelIcon} alt="label-icon" />
          <span>레이블({labelCount})</span>
        </Button>
      </ButtonBox>
      <ButtonBox selected={false}>
        <Button variant="ghost" size="M" onClick={() => {}}>
          <img src={milestoneIcon} alt="milestone-icon" />
          <span>마일스톤({milestoneCount})</span>
        </Button>
      </ButtonBox>
    </StyledTabButton>
  );
}

const StyledTabButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 320px;
  height: 40px;

  border: ${({ theme }) =>
    `${theme.border.default} ${theme.neutral.border.default}`};
  border-radius: ${({ theme }) => theme.radius.m};

  & > div:first-child {
    border-radius: 11px 0 0 11px;
  }
  & > div:last-child {
    border-radius: 0 11px 11px 0;
    border-left: ${({ theme }) =>
      `${theme.border.default} ${theme.neutral.border.default}`};
  }
`;

const ButtonBox = styled.div<{ selected: boolean }>`
  width: 100%;
  height: 100%;

  & > button {
    width: 100%;
    height: 100%;
  }

  background-color: ${({ theme, selected }) =>
    selected ? theme.neutral.surface.bold : theme.neutral.surface.default};

  & span {
    font: ${({ theme, selected }) =>
      selected ? theme.font.selectedBold16 : theme.font.availableMD16};
    color: ${({ theme, selected }) =>
      selected ? theme.neutral.text.strong : theme.neutral.text.default};
  }

  & img {
    filter: ${({ theme, selected }) =>
      selected
        ? theme.filter.neutralTextStrong
        : theme.filter.neutralTextDefault};
  }
`;
