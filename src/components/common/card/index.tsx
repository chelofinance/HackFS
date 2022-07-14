import React from "react";
import clsx from "clsx";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Card: React.FunctionComponent<CardProps> = (props) => {
  return (
    <div className={clsx("p-4 bg-gray-900 opacity-50 text-white rounded-md", props.className)}>
      <div className="opacity-100 h-full w-full">{props.children}</div>
    </div>
  );
};

export default Card;
