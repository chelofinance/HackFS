import React from "react";
import clsx from "clsx";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Card: React.FunctionComponent<CardProps> = (props) => {
  return (
    <div className={clsx("bg-gray-800/40 rounded-xl p-4", props.className)}>
      <div className="h-full w-full">{props.children}</div>
    </div>
  );
};

export default Card;
