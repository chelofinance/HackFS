import React from "react";
import clsx from "clsx";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {render?: boolean}

export const Card: React.FunctionComponent<CardProps> = (props) => {
  return (
    props.render 
    ? <div className={clsx("bg-gray-800/40 rounded-xl p-4", props.className)}>
        <div className="h-full w-full">{props.children}</div>
      </div> 
    : <div></div>
  );
};

export default Card;
