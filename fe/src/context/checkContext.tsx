import { createContext } from "react";

export type checkFn = (value: number) => boolean;
export type toggleFn = ({
  checked,
  value,
}: {
  checked: boolean;
  value: number;
}) => void;

export const CheckContext = createContext<{
  isChecked: checkFn;
  toggleCheck: toggleFn;
} | null>(null);
