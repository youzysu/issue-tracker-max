import { Label } from "@customTypes/index";
import { EmptyTableBodyItem, TableBody } from "../Table.style";
import TableBodyItemLabel from "./LabelBodyItem";

export default function TableBodyLabels({
  labelsList,
}: {
  labelsList: Label[] | null;
}) {
  return (
    <TableBody>
      {labelsList ? (
        <ul>
          {labelsList.map((label) => (
            <TableBodyItemLabel key={label.labelId} label={label} />
          ))}
        </ul>
      ) : (
        <EmptyTableBodyItem>등록된 이슈가 없습니다.</EmptyTableBodyItem>
      )}
    </TableBody>
  );
}
