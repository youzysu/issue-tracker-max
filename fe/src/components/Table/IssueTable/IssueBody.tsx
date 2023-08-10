import { IssueItem as IssueItemType } from "@customTypes/index";
import { EmptyTableBodyItem, TableBody } from "../Table.style";
import TableBodyItemIssue from "./IssueBodyItem";

export default function TableBodyIssues({
  issuesList,
}: {
  issuesList: IssueItemType[] | null;
}) {
  return (
    <TableBody>
      {issuesList ? (
        <ul>
          {issuesList.map((issue) => (
            <TableBodyItemIssue key={issue.issueNumber} issue={issue} />
          ))}
        </ul>
      ) : (
        <EmptyTableBodyItem>등록된 이슈가 없습니다.</EmptyTableBodyItem>
      )}
    </TableBody>
  );
}
