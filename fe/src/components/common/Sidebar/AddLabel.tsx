import DropdownIndicator from "@components/Dropdown/DropdownIndicator";
import { DropdownItemType } from "@components/Dropdown/types";
import LabelTag from "@components/LabelTag";
import { Label } from "@customTypes/index";
import useFetch from "@hooks/useFetch";
import { getLabels } from "api";
import styled from "styled-components";
import CheckGroup from "./CheckGroup";

type LabelMap = {
  [key: number]: Label;
};

export default function AddLabel({
  labels,
  onLabelChange,
}: {
  labels: number[];
  onLabelChange: (labels: number[]) => void;
}) {
  const labelList = useFetch<Label[]>([], getLabels);
  const labelMap: LabelMap = labelList.reduce((map: LabelMap, label: Label) => {
    map[label.labelId] = label;
    return map;
  }, {});

  const labelDropdownList: DropdownItemType[] = labelList.map((label) => ({
    id: label.labelId,
    variant: "withColor",
    name: "label",
    content: label.name,
    colorFill: label.backgroundColor,
  }));

  const generateLabels = () => {
    return labels.map((label) => {
      return <LabelTag key={label} label={labelMap[label]} />;
    });
  };

  return (
    <CheckGroup values={labels} onChange={onLabelChange}>
      <DropdownIndicator
        displayName="레이블"
        dropdownPanelVariant="select"
        dropdownName="label"
        dropdownList={labelDropdownList}
        dropdownPanelPosition="right"
      />
      {!!labels.length && <Wrapper>{generateLabels()}</Wrapper>}
    </CheckGroup>
  );
}

const Wrapper = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;
