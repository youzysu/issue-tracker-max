import { IssuesFilterAction, IssuesFilterState } from "@customTypes/index";
import { generateFilterText } from "@utils/generateFilterText";
import {
  Dispatch,
  ReactNode,
  createContext,
  useContext,
  useReducer,
} from "react";

const IssuesFilterContext = createContext<{
  state: IssuesFilterState;
  text: string;
} | null>(null);

const IssuesFilterDispatchContext =
  createContext<Dispatch<IssuesFilterAction> | null>(null);

const initialFilterState: IssuesFilterState = {
  status: "open",
  filterBar: "open",
  author: null,
  assignees: new Set(),
  labels: new Set(),
  milestone: null,
};

const issuesFilterReducer = (
  state: IssuesFilterState,
  action: IssuesFilterAction
): IssuesFilterState => {
  switch (action.type) {
    case "SET_AUTHOR":
      return { ...state, author: action.payload };
    case "SET_ASSIGNEES":
      return { ...state, assignees: action.payload };
    case "SET_LABELS":
      return { ...state, labels: action.payload };
    case "SET_MILESTONE":
      return { ...state, milestone: action.payload };
    case "SET_STATUS":
      return { ...state, status: action.payload };
    case "SET_FILTER_BAR": {
      if (action.payload === "open" || action.payload === "closed") {
        return { ...state, filterBar: action.payload, status: action.payload };
      }
      if (action.payload === "writtenByMe") {
        return { ...state, filterBar: action.payload, author: "@me" };
      }
      if (!action.payload) {
        return {
          ...state,
          filterBar: action.payload,
          author: null,
          status: null,
        };
      }
      return { ...state, filterBar: action.payload };
    }
    case "RESET_FILTER":
      return {
        status: "open",
        filterBar: "open",
        author: null,
        assignees: new Set(),
        labels: new Set(),
        milestone: null,
      };
  }
};

export const IssuesFilterProvider = ({ children }: { children: ReactNode }) => {
  const [issuesFilterState, issuesFilterDispatch] = useReducer(
    issuesFilterReducer,
    initialFilterState
  );
  const filterText = generateFilterText(issuesFilterState);

  return (
    <IssuesFilterContext.Provider
      value={{ state: issuesFilterState, text: filterText }}>
      <IssuesFilterDispatchContext.Provider value={issuesFilterDispatch}>
        {children}
      </IssuesFilterDispatchContext.Provider>
    </IssuesFilterContext.Provider>
  );
};

export function useIssuesFilter() {
  const context = useContext(IssuesFilterContext);

  if (!context) {
    throw new Error("Cannot find IssuesFilterProvider");
  }

  return context;
}

export function useIssuesFilterDispatch() {
  const context = useContext(IssuesFilterDispatchContext);

  if (!context) {
    throw new Error("Cannot find IssuesFilterProvider");
  }

  return context;
}
