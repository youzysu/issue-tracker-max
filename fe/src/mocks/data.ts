export const loginInfo: Record<string, string> = {
  zoeyzoey: "zoeyzoey",
};

export const users = [
  {
    userAccountId: 1,
    username: "bruni",
    profileUrl: "http://s3.image.123",
  },
  {
    userAccountId: 2,
    username: "bean",
    profileUrl: "http://s3.image.1233",
  },
];

export const milestoneList = [
  {
    milestoneId: 1,
    milestoneName: "Sprint #1",
    openIssueCount: 1,
    closedIssueCount: 0,
  },
  {
    milestoneId: 2,
    milestoneName: "Sprint #2",
    openIssueCount: 2,
    closedIssueCount: 0,
  },
];

export const issueList = [
  {
    issueNumber: 1,
    isOpen: true,
    title: "메인화면 UI 설계",
    labels: [
      {
        name: "bug",
        fontColor: "#FFF",
        backgroundColor: "#D73A4A",
      },
      {
        name: "docs",
        fontColor: "#FFF",
        backgroundColor: "#2675CA",
      },
    ],
    milestone: "Sprint #1",
    authorName: "bruni",
    assignees: [
      {
        username: "bruni",
        profileUrl: "https://avatars.githubusercontent.com/u/79886384?v=4",
      },
    ],
    createdAt: "2023-07-31 18:02:32",
  },
  {
    issueNumber: 2,
    isOpen: true,
    title: "Mock data 설정",
    labels: [
      {
        name: "feat",
        fontColor: "#000",
        backgroundColor: "#FACA02",
      },
    ],
    milestone: "Sprint #2",
    authorName: "Kakamotobi",
    assignees: [
      {
        username: "Kakamotobi",
        profileUrl: "https://avatars.githubusercontent.com/u/79886384?v=4",
      },
      {
        username: "Zoey",
        profileUrl: "https://avatars.githubusercontent.com/u/111998760?v=4",
      },
    ],
    createdAt: "2023-07-26 13:22:10",
  },
  {
    issueNumber: 3,
    isOpen: true,
    title: "API 연동",
    labels: [
      {
        name: "feat",
        fontColor: "#000",
        backgroundColor: "#FACA02",
      },
    ],
    milestone: "Sprint #2",
    authorName: "Zoey",
    assignees: [
      {
        username: "Kakamotobi",
        profileUrl: "https://avatars.githubusercontent.com/u/79886384?v=4",
      },
      {
        username: "Zoey",
        profileUrl: "https://avatars.githubusercontent.com/u/111998760?v=4",
      },
    ],
    createdAt: "2023-05-25 10:42:40",
  },
  {
    issueNumber: 4,
    isOpen: false,
    title: "프로젝트 초기화",
    labels: [
      {
        name: "feat",
        fontColor: "#000",
        backgroundColor: "#FACA02",
      },
    ],
    milestone: "",
    authorName: "Kakamotobi",
    assignees: [
      {
        username: "Kakamotobi",
        profileUrl: "https://avatars.githubusercontent.com/u/79886384?v=4",
      },
    ],
    createdAt: "2022-12-31 10:42:40",
  },
];

export const labelList = [
  {
    name: "bug",
    fontColor: "#FFF",
    backgroundColor: "#D73A4A",
  },
  {
    name: "docs",
    fontColor: "#FFF",
    backgroundColor: "#2675CA",
  },
  {
    name: "feat",
    fontColor: "#000",
    backgroundColor: "#FACA02",
  },
];
