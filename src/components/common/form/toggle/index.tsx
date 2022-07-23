import {InputProps} from "../../../interfaces/input";
import * as React from "react";
import {Switch} from "@headlessui/react";

export interface ToggleProps {
  isActive: boolean;
  setActive: any;
  label: string;
}

export const Toggle: React.FC<
  ToggleProps & Omit<InputProps, "name" | "className"> & React.InputHTMLAttributes<HTMLInputElement>
> = ({isActive, name, label, setActive}) => {
  return (
    <>
      {label && <span className="whitespace-nowrap">{label}</span>}
      <input id={name} name={name} type="check" checked={isActive} className="hidden" readOnly />
      <Switch
        checked={isActive}
        onChange={setActive}
        className={`${isActive ? "bg-blue-400" : "bg-gray-200"
          } relative inline-flex items-center h-6 rounded-full w-16 outline-none focus:outline-none`}
      >
        <span className="sr-only">Enable notifications</span>
        <span
          className={`${isActive ? "translate-x-6 bg-gray-0" : "translate-x-1 bg-gray-0"
            } inline-block w-4 h-4 transform  bg-white rounded-full`}
        />
      </Switch>
    </>
  );
};
