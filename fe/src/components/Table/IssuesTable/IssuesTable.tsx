import alertIcon from "@assets/icon/alertCircle.svg";
import archiveIcon from "@assets/icon/archive.svg";
import Pagination from "@components/Pagination";
import InputCheckbox from "@components/common/Input/InputCheckbox";
import TabBar from "@components/common/TabBar";
import useFetch from "@hooks/useFetch";
import { getIssues } from "api";
import {
  useIssuesFilter,
  useIssuesFilterDispatch,
} from "context/IssuesFilterContext";
import { useCallback, useState } from "react";
import { styled } from "styled-components";
import {
  EmptyTableBodyItem,
  Table,
  TableBody,
  TableHeader,
} from "../Table.style";
import IssuesDropdownWrapper from "./IssuesDropdownWrapper";
import IssuesTableItem from "./IssuesTableItem";

export default function IssuesTable() {
  const [pageIndex, setPageIndex] = useState(1);

  const issuesFilter = useIssuesFilter();
  const issuesFilterDispatch = useIssuesFilterDispatch();

  const filterQuery = `${issuesFilter?.text}`;
  const { data: issuesList } = useFetch(
    useCallback(
      () => getIssues(filterQuery, pageIndex),
      [filterQuery, pageIndex]
    )
  );

  const IssuesStatus = issuesFilter?.state.status ?? "all";
  const openIssuesList = issuesList?.data.filter((issue) => issue.isOpen) || [];
  const closedIssuesList =
    issuesList?.data.filter((issue) => !issue.isOpen) || [];
  const currentIssuesList = {
    open: openIssuesList,
    closed: closedIssuesList,
    all: issuesList?.data || [],
  };

  const currentTabName = IssuesStatus && TAB_NAME[IssuesStatus];

  const tabBarLeftInfo = {
    name: TAB_NAME.open,
    count: openIssuesList.length,
    iconSrc: alertIcon,
    callback: () => {
      issuesFilterDispatch?.({ type: "SET_FILTER_BAR", payload: "open" });
    },
  };

  const tabBarRightInfo = {
    name: TAB_NAME.closed,
    count: closedIssuesList.length,
    iconSrc: archiveIcon,
    callback: () => {
      issuesFilterDispatch?.({ type: "SET_FILTER_BAR", payload: "closed" });
    },
  };

  const onPageChange = (page: number) => {
    setPageIndex(page);
  };

  const onPrevPageClick = () => {
    setPageIndex((prev) => prev - 1);
  };

  const onNextPageClick = () => {
    setPageIndex((prev) => prev + 1);
  };

  return (
    <TableWrapper>
      <Table>
        <TableHeader>
          <TableHeaderContents>
            <div className="left-wrapper">
              <InputCheckbox />
              <TabBar
                currentTabName={currentTabName}
                left={tabBarLeftInfo}
                right={tabBarRightInfo}
                borderStyle="none"
              />
            </div>
            <IssuesDropdownWrapper />
          </TableHeaderContents>
        </TableHeader>
        <TableBody>
          {currentIssuesList[IssuesStatus].length ? (
            <ul>
              {currentIssuesList[IssuesStatus].map((issue) => (
                <IssuesTableItem key={issue.issueNumber} issue={issue} />
              ))}
            </ul>
          ) : (
            <EmptyTableBodyItem>
              검색과 일치하는 결과가 없습니다.
            </EmptyTableBodyItem>
          )}
        </TableBody>
      </Table>
      {issuesList && (
        <Pagination
          currentPage={pageIndex}
          totalPages={issuesList.pagination.totalPages}
          {...{ onPageChange, onPrevPageClick, onNextPageClick }}
        />
      )}
    </TableWrapper>
  );
}

const TAB_NAME = {
  open: "열린 이슈",
  closed: "닫힌 이슈",
  all: "모든 이슈",
};

const TableWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

const TableHeaderContents = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .left-wrapper {
    display: flex;
    align-items: center;

    > *:first-child {
      margin-right: 32px;
    }

    > *:last-child {
      gap: 24px;
    }
  }
`;
