import { useState } from "react";
import styled, { css } from "styled-components";
import Button from "./Button";

type TabBarInfo = {
  iconSrc: string;
  name: string;
  count: number;
};

type Props = {
  left: TabBarInfo;
  right: TabBarInfo;
  borderType: "default" | "none";
};

export default function TabBar({ left, right, borderType }: Props) {
  const [selectedTab, setSelectedTab] = useState<string | null>(null);

  const isRightSelected = selectedTab === right.name;
  const isLeftSelected = selectedTab === left.name;
  const isDefaultBorder = borderType === "default";

  const onLeftClick = () => setSelectedTab(left.name);
  const onRightClick = () => setSelectedTab(right.name);

  return (
    <StyledTabBar $isDefaultBorder={isDefaultBorder}>
      <StyledTabButton
        $selected={isLeftSelected}
        $isDefaultBorder={isDefaultBorder}>
        <Button variant="ghost" size="M" onClick={onLeftClick}>
          <img
            className="tab-button-icon"
            src={left.iconSrc}
            alt={`${left.name}-icon`}
          />
          <span className="tab-button-text">
            {left.name}({left.count})
          </span>
        </Button>
      </StyledTabButton>
      <StyledTabButton
        $selected={isRightSelected}
        $isDefaultBorder={isDefaultBorder}>
        <Button variant="ghost" size="M" onClick={onRightClick}>
          <img
            className="tab-button-icon"
            src={right.iconSrc}
            alt={`${right.name}-icon`}
          />
          <span className="tab-button-text">
            {right.name}({right.count})
          </span>
        </Button>
      </StyledTabButton>
    </StyledTabBar>
  );
}

const StyledTabBar = styled.div<{ $isDefaultBorder: boolean }>`
  display: flex;

  ${({ $isDefaultBorder }) =>
    $isDefaultBorder &&
    css`
      width: 320px;
      height: 40px;
      border: ${({ theme: { border, neutral } }) =>
        `${border.default} ${neutral.border.default}`};
      border-radius: ${({ theme: { radius } }) => radius.m};

      & > div:first-child {
        border-radius: 11px 0 0 11px;
      }

      & > div:last-child {
        border-radius: 0 11px 11px 0;
        border-left: ${({ theme: { border, neutral } }) =>
          `${border.default} ${neutral.border.default}`};
      }
    `}
`;

const StyledTabButton = styled.div<{
  $selected: boolean;
  $isDefaultBorder: boolean;
}>`
  width: 50%;
  height: 100%;

  & > button {
    width: 100%;
    height: 100%;
  }

  background-color: ${({ theme: { neutral }, $selected, $isDefaultBorder }) =>
    $isDefaultBorder && $selected
      ? neutral.surface.bold
      : neutral.surface.default};

  .tab-button-icon {
    filter: ${({ theme: { filter }, $selected }) =>
      $selected ? filter.neutralTextStrong : filter.neutralTextDefault};
  }

  .tab-button-text {
    font: ${({ theme: { font }, $selected }) =>
      $selected ? font.selectedBold16 : font.availableMD16};
    color: ${({ theme: { neutral }, $selected }) =>
      $selected ? neutral.text.strong : neutral.text.default};
  }
`;
