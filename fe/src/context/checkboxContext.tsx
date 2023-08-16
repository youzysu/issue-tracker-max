import { createContext } from "react";

type CheckboxContextType<T> = {
  isChecked: (value: T) => boolean;
  toggleCheck: ({ checked, value }: { checked: boolean; value: T }) => void;
};

// TODO: any 개선
export const CheckboxContext = createContext<CheckboxContextType<any> | null>(
  null
);
