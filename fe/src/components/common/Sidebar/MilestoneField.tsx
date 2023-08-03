import DropdownIndicator from "@components/Dropdown/DropdownIndicator";
import { DropdownItemType } from "@components/Dropdown/types";
import { Milestone } from "@customTypes/index";
import useFetch from "@hooks/useFetch";
import { getMilestones } from "api";
import RadioGroup from "../Group/RadioGroup";
import ProgressBar from "../ProgressBar";
import { Container } from "./Container";

type MilestoneMap = {
  [key: number]: Milestone;
};

export default function MilestoneField({
  milestone: milestoneId,
  onMilestoneChange,
}: {
  milestone: number;
  onMilestoneChange: (milestoneId: number) => void;
}) {
  const milestonesList = useFetch<Milestone[]>([], getMilestones);
  const milestoneMap: MilestoneMap = milestonesList.reduce(
    (map: MilestoneMap, milestone: Milestone) => {
      map[milestone.milestoneId] = milestone;
      return map;
    },
    {}
  );

  const milestoneDropdownList: DropdownItemType[] = milestonesList.map(
    (milestone) => ({
      id: milestone.milestoneId,
      variant: "plain",
      name: "milestone",
      content: milestone.milestoneName,
    })
  );

  const generateMilestone = () => {
    const { milestoneName, openIssueCount, closedIssueCount } =
      milestoneMap[milestoneId];
    return (
      <ProgressBar
        name={milestoneName}
        openCount={openIssueCount}
        closeCount={closedIssueCount}
      />
    );
  };

  return (
    <Container>
      <RadioGroup value={milestoneId} onChange={onMilestoneChange}>
        <DropdownIndicator
          displayName="마일스톤"
          dropdownPanelVariant="select"
          dropdownName="milestone"
          dropdownList={milestoneDropdownList}
          dropdownPanelPosition="right"
        />
      </RadioGroup>
      {!!milestoneId && generateMilestone()}
    </Container>
  );
}
