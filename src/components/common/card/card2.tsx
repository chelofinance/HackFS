import React from "react";
import clsx from "clsx";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Card2: React.FunctionComponent<CardProps> = (props) => {
  return (
    <div className={clsx("rounded-xl", props.className)}>
      <div className="h-full w-full">{props.children}</div>
    </div>
  );
};

export default Card2;
