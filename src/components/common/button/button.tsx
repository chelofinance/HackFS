import Link from "next/link";
import * as React from "react";
import {Typography} from "../typography";
import {Spinner} from "../spinner/spinner";
import clsx from "clsx";
export interface ButtonProps {
  label?: string;
  disabled?: boolean;
  onClick?: () => void;
  href?: string;
  loading?: boolean;
  className?: string;
  labelProps?: string;
  colored?: boolean;
  icon?: any;
  target?: any;
  iconProps?: string;
}

/**
 * Primary UI component for user interaction
 */
export const Button: React.FC<ButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>> = ({
  label,
  disabled,
  loading,
  onClick,
  className,
  labelProps,
  children,
  icon,
  iconProps,
  colored,
  href = null,
  ...props
}) => {
  const refButtom = React.useRef(null);

  return (
    <>
      {href ? (
        <Link href={href}>
          <button
            ref={refButtom}
            type="button"
            disabled={disabled}
            onClick={onClick}
            className={` rounded-lg  focus:outline-none ${className}`}
            {...props}
          >
            {label ? (
              <Typography type="smallTitle">
                <div className="flex items-center justify-center">
                  {loading && <Spinner type="loadingButton" />}
                  <span className={clsx(labelProps && labelProps)}>{label}</span>
                </div>
              </Typography>
            ) : (
              children
            )}
          </button>
        </Link>
      ) : (
        <button
          ref={refButtom}
          type="button"
          disabled={disabled}
          onClick={onClick}
          className={clsx(
            `rounded-lg focus:outline-none ${className}`,
            {
              "disabled:bg-gray-1 disabled:text-gray-0 ": disabled,
            },
            colored && "bg-gradient-to-b from-sky-500 to-blue-800"
          )}
          {...props}
        >
          {label ? (
            <Typography type="smallTitle">
              <div className="flex items-center justify-center ">
                {loading && <Spinner type="loadingButton" />}
                <span className={clsx(labelProps && labelProps)}>{label}</span>
              </div>
            </Typography>
          ) : (
            children
          )}
        </button>
      )}
    </>
  );
};

export const ButtonContent: React.FC<ButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>> =
  ({label, disabled, onClick, icon, href, children, labelProps, ...props}) => {
    return (
      <>
        {href ? (
          <Button
            icon={icon}
            label={label}
            disabled={disabled}
            labelProps={labelProps}
            href={href}
            {...props}
          />
        ) : (
          <Button
            icon={icon}
            label={label}
            disabled={disabled}
            onClick={onClick}
            href={href}
            labelProps={labelProps}
            {...props}
          >
            {children}
          </Button>
        )}
      </>
    );
  };
