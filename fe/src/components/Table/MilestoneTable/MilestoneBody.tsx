import { Milestone } from "@customTypes/index";
import { EmptyTableBodyItem, TableBody } from "../Table.style";
import MilestoneItem from "./MilestoneItem";

export default function MilestoneBody({
  milestoneList,
}: {
  milestoneList: Milestone[] | null;
}) {
  return (
    <TableBody>
      {milestoneList ? (
        <ul>
          {milestoneList.map((milestone) => (
            <MilestoneItem key={milestone.milestoneId} milestone={milestone} />
          ))}
        </ul>
      ) : (
        <EmptyTableBodyItem>등록된 마일스톤이 없습니다.</EmptyTableBodyItem>
      )}
    </TableBody>
  );
}
