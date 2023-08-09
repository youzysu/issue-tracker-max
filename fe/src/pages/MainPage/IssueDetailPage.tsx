import IssueDetailBody from "@components/Issues/IssueDetail/IssueDetailBody";
import IssueDetailHeader from "@components/Issues/IssueDetail/IssueDetailHeader";
import { IssueComment, IssueDetails } from "@customTypes/index";
import useFetch from "@hooks/useFetch";
import { getComments, getIssueDetails } from "api";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function IssueDetailPage() {
  const { issueId } = useParams();
  const issueNumber = parseInt(issueId!);

  const [cursor, setCursor] = useState<number>(0);
  const [comments, setComments] = useState<IssueComment[]>([]);

  const { data: issueDetails, setData: setIssueDetails } =
    useFetch<IssueDetails>(
      useCallback(() => getIssueDetails(issueNumber), [issueNumber])
    );

  const { data: issueComments } = useFetch<{
    data: IssueComment[];
    hasMore: boolean;
    nextCursor: number;
  }>(
    useCallback(() => getComments(issueNumber, cursor), [issueNumber, cursor])
  );

  useEffect(() => {
    issueComments && setComments((prev) => [...prev, ...issueComments.data]);
  }, [issueComments]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const clientHeight = window.innerHeight;

      const isBottom = scrollHeight - scrollTop === clientHeight;
      isBottom && issueComments?.hasMore && setCursor(issueComments.nextCursor);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [issueComments]);

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

  const onCommentAdd = (newComment: IssueComment) => {
    setComments((prev) => [...prev, newComment]);
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
      <IssueDetailBody
        {...{ issueNumber, issueDetails, comments, onCommentAdd }}
      />
    </>
  );
}
