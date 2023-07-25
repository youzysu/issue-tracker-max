import React from "react";
import ContainerButton from "./ContainerButton";
import GhostButton from "./GhostButton";
import OutlineButton from "./OutlineButton";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant: "container" | "outline" | "ghost";
  size: "S" | "M" | "L";
}

export default function Button(props: ButtonProps) {
  const buttonVariant = props.variant || "container";

  const buttonComponent = {
    container: <ContainerButton {...props} />,
    outline: <OutlineButton {...props} />,
    ghost: <GhostButton {...props} />,
  };

  return <div>{buttonComponent[buttonVariant]}</div>;
}
