import React from "react";
import clsx from "clsx";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Card: React.FunctionComponent<CardProps> = (props) => {
  return (
    <div
      className={clsx(
        "p-4 bg-blue-900 border border-blue-800 text-white rounded-md",
        props.className
      )}
    >
      {props.children}
    </div>
  );
};

export default Card;
