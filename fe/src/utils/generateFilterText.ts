import { IssuesFilterState } from "@customTypes/index";

const filterBarText = {
  assignedToMe: "assignee:@me",
  commentedByMe: "commenter:@me",
};

export const generateFilterText = (filterState: IssuesFilterState) => {
  const { status, filterBar, author, assignees, labels, milestone } =
    filterState;

  const filterText = [];
  if (status) {
    filterText.push(`is:${status}`);
  }
  if (filterBar === "assignedToMe" || filterBar === "commentedByMe") {
    filterText.push(filterBarText[filterBar]);
  }
  if (author) {
    filterText.push(`author:"${author}"`);
  }
  if (assignees.size) {
    assignees.has("no")
      ? filterText.push("no:assignee")
      : [...assignees].map((assignee) =>
          filterText.push(`assignee:"${assignee}"`)
        );
  }
  if (labels.size) {
    labels.has("no")
      ? filterText.push("no:label")
      : [...labels].map((label) => filterText.push(`label:"${label}"`));
  }
  if (milestone) {
    milestone === "no"
      ? filterText.push("no:milestone")
      : filterText.push(`milestone:"${milestone}"`);
  }

  return filterText.join(" ");
};
