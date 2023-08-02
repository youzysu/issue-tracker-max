import { IssueItem, Label, Milestone, User } from "@customTypes/index";
import { fetcher, fetcherWithBearer } from "./fetcher";

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

export const postIssue = async (body: PostIssueBody) => {
  return await fetcherWithBearer.post<{ issueId: number }>("/issues", body);
};

type PostIssueBody = {
  title: string;
  content?: string;
  assignees?: number[];
  labels?: number[];
  milestone?: number;
};
