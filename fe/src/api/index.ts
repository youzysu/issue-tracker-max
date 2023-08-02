import {
  IssueItem,
  Label,
  Milestone,
  NewIssueInfo,
  User,
} from "@customTypes/index";
import {
  fetcher,
  fetcherFormDataWithBearer,
  fetcherWithBearer,
} from "./fetcher";

export const postSignup = async (username: string, password: string) => {
  return await fetcher.post("/auth/signup", { username, password });
};

export const postLogin = async (username: string, password: string) => {
  return await fetcher.post("/auth/login", { username, password });
};

export const getIssues = async () => {
  return await fetcherWithBearer.get<IssueItem[]>("/issues");
};

export const getLabels = async () => {
  return await fetcherWithBearer.get<Label[]>("/labels");
};

export const getMilestones = async () => {
  return await fetcherWithBearer.get<Milestone[]>("/milestones");
};

export const getUsers = async () => {
  return await fetcherWithBearer.get<User[]>("/users");
};

export const postIssue = async (newIssueInfo: NewIssueInfo) => {
  return await fetcherWithBearer.post<{ issueId: number }>(
    "/issues",
    newIssueInfo
  );
};

export const postImage = async (file: File) => {
  const formData = new FormData();
  formData.append("image", file);

  return await fetcherFormDataWithBearer.post<{ fileUrl: string }>(
    "/upload",
    formData
  );
};
