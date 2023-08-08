import IssueDetailBody from "@components/Issues/IssueDetail/IssueDetailBody";
import IssueDetailHeader from "@components/Issues/IssueDetail/IssueDetailHeader";
import { IssueDetails } from "@customTypes/index";
import useFetch from "@hooks/useFetch";
import { getIssueDetails } from "api";
import { useCallback } from "react";
import { useParams } from "react-router-dom";

export default function IssueDetailPage() {
  const { issueId } = useParams();
  const issueNumber = parseInt(issueId!);

  const { data: issueDetails, setData: setIssueDetails } =
    useFetch<IssueDetails>(
      useCallback(() => getIssueDetails(issueNumber), [issueNumber])
    );

  // TODO: comments useFetch

  const updateIssueTitle = (newTitle: string) => {
    setIssueDetails((prev) => {
      return prev ? { ...prev, title: newTitle } : prev;
    });
  };

  const updateIssueIsOpen = () => {
    setIssueDetails((prev) => {
      return prev ? { ...prev, isOpen: !prev.isOpen } : prev;
    });
  };

  return (
    <>
      <IssueDetailHeader
        {...{
          issueDetails,
          updateIssueTitle,
          updateIssueIsOpen,
          numComments: 0,
        }}
      />
      <IssueDetailBody {...{ issueNumber, issueDetails }} />
    </>
  );
}
