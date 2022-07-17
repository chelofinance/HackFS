import React from "react";
import clsx from "clsx";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Card: React.FunctionComponent<CardProps> = (props) => {
  return (
    <div className={clsx(props.className)}>
      <div className="opacity-100 h-full w-full">{props.children}</div>
    </div>
  );
};

export default Card;
