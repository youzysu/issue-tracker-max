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
      <ButtonBox selected={false}>
        <Button variant="ghost" size="M">
          <img src={labelIcon} alt="label-icon" />
          <span>레이블({labelCount})</span>
        </Button>
      </ButtonBox>
      <ButtonBox selected={true}>
        <Button variant="ghost" size="M">
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
  gap: 1px;

  background-color: ${({ theme }) => theme.neutral.surface.default};
  border: ${({ theme }) =>
    `${theme.border.default} ${theme.neutral.border.default}`};
  border-radius: ${({ theme }) => theme.radius.m};

  & > div:first-child {
    border-radius: ${({ theme }) =>
      `${theme.radius.m} 0px 0px ${theme.radius.m}`};
  }
  & > div:last-child {
    border-radius: ${({ theme }) =>
      `0px ${theme.radius.m} ${theme.radius.m} 0px`};
    border-left: ${({ theme }) =>
      `${theme.border.default} ${theme.neutral.border.default}`};
  }
`;

// TODO: active에 따라 Button 내부 svg 색상 변경
const ButtonBox = styled.div<{ selected: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 50%;
  height: 100%;
  background-color: ${({ theme, selected }) =>
    selected ? theme.neutral.surface.bold : theme.neutral.surface.default};

  & > button {
    width: 100%;
    height: 100%;
    color: ${({ theme, selected }) =>
      selected ? theme.neutral.text.strong : theme.neutral.text.default};
    font: ${({ theme, selected }) =>
      selected ? theme.font.selectedBold16 : theme.font.availableMD16};
  }
`;
