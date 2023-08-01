import { CheckContext, checkFn, toggleFn } from "context/checkContext";
import styled from "styled-components";

export default function CheckGroup({
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
    <StyledCheckGroup>
      <CheckContext.Provider value={{ isChecked, toggleCheck }}>
        {children}
      </CheckContext.Provider>
    </StyledCheckGroup>
  );
}
const StyledCheckGroup = styled.div`
  width: 100%;
  padding: 32px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
