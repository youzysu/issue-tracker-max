import { CheckboxContext, checkFn, toggleFn } from "context/checkboxContext";
import { Fieldset } from "./common";

export default function CheckboxGroup({
  children,
  values,
  onChange,
}: {
  children: React.ReactNode;
  values: number[];
  onChange: (values: number[]) => void;
}) {
  const isChecked: checkFn = (value) => values.includes(value);
  const toggleCheck: toggleFn = ({ checked, value }) => {
    if (checked) {
      onChange([...values, value]);
    } else {
      onChange(values.filter((v) => v !== value));
    }
  };

  return (
    <Fieldset>
      <CheckboxContext.Provider value={{ isChecked, toggleCheck }}>
        {children}
      </CheckboxContext.Provider>
    </Fieldset>
  );
}
