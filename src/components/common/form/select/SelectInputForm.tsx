import * as React from "react";
import clsx from "clsx";

// import { Icon } from 'components/icon';
// import { Icons } from 'consts/icons';
import { Typography } from "../../typography";
import { InputProps } from "../../../../interfaces/common";

export const SelectInputForm: React.FC<
  InputProps & React.InputHTMLAttributes<HTMLInputElement>
> = ({
  arrayValues,
  register,
  name,
  rules,
  title,
  error,
  disabled,
  onChangeCustom,
  labelVisible,
}) => {
  //   const registerAux = register(name, rules);
  const [showLabel, setShowLabel] = React.useState(false);
  return (
    <>
      <div className="relative flex flex-col py-2 w-full">
        <select
          name={name}
          className={clsx(
            {
              "border-alert-error focus:border-alert-error placeholder-alert-error focus:ring-transparent text-alert-error":
                error,
            },
            "disabled:placeholder-color1 disabled:cursor-not-allowed disabled:text-color1",
            "block w-full bg-transparent pb-4 pt-4 pl-3 pr-10 text-base text-color1 font-montserrat border f-17 border-gray-500 w-full",
            "focus:outline-none focus:ring-transparent rounded-md"
          )}
          //   ref={registerAux && registerAux.ref}
          onChange={(e: any) => {
            // registerAux && registerAux.onChange(e); // method from hook form register
            onChangeCustom && onChangeCustom(e); // your method
            e.target.value === "" ? setShowLabel(false) : setShowLabel(true);
          }}
          disabled={disabled}
        >
          <option value="">{title}</option>
          {arrayValues &&
            arrayValues.map((type, index) => (
              <option key={index} value={type.value}>
                {type.title}
              </option>
            ))}
        </select>
        {error && error.message && (
          <span className="flex items-center mt-3 text-alert-error font-montserrat">
            {/* <div className="mr-1 w-4 h-3">
              <Icon
                src={Icons.exclamation}
                fillPath
                className="text-alert-error"
              />
            </div> */}
            <Typography type="caption" className="f-12">
              {error.message}
            </Typography>
          </span>
        )}
      </div>
    </>
  );
};
