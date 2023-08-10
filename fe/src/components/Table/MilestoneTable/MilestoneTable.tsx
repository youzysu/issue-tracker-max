import { Milestone } from "@customTypes/index";
import { useState } from "react";
import { Table } from "../Table.style";
import MilestoneBody from "./MilestoneBody";
import MilestoneHeader from "./MilestoneHeader";

type TabName = "열린 마일스톤" | "닫힌 마일스톤";

export default function MilestoneTable({
  openMilestone,
  closedMilestone,
}: {
  openMilestone: Milestone[] | null;
  closedMilestone: Milestone[] | null;
}) {
  const [currentTabName, setCurrentTabName] =
    useState<TabName>("열린 마일스톤");
  const currentList =
    currentTabName === "열린 마일스톤" ? openMilestone : closedMilestone;

  const numOpen = openMilestone?.length || 0;
  const numClosed = closedMilestone?.length || 0;

  const handleTabClick = (tabName: TabName) => {
    setCurrentTabName(tabName);
  };

  return (
    <Table>
      <MilestoneHeader
        {...{ currentTabName, handleTabClick, numOpen, numClosed }}
      />
      <MilestoneBody milestoneList={currentList} />
    </Table>
  );
}
