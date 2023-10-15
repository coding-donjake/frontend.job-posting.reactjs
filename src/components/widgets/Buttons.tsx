import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { ReactNode } from "react";

type ButtonProps = {
  className?: string;
  type?: "button" | "submit";
  icon?: ReactNode;
  text?: string;
  hint?: string;
  processing?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

export const PrimaryButton = ({
  className,
  type = "button",
  icon,
  text,
  processing,
  onClick,
}: ButtonProps) => {
  return (
    <button
      type={type}
      className={"button-classic button-primary " + className}
      onClick={onClick}
    >
      {icon ? (
        <span className={"button-icon" + (processing ? " spin-cw" : "")}>
          {processing ? <FontAwesomeIcon icon={faCircleNotch} /> : icon}
        </span>
      ) : null}
      {text ? <span className="button-text">{text}</span> : null}
    </button>
  );
};

export const SecondaryButton = ({
  className,
  type = "button",
  icon,
  text,
  processing,
  onClick,
}: ButtonProps) => {
  return (
    <button
      type={type}
      className={"button-classic button-secondary " + className}
      onClick={onClick}
    >
      {icon ? (
        <span className={"button-icon" + (processing ? " spin-cw" : "")}>
          {processing ? <FontAwesomeIcon icon={faCircleNotch} /> : icon}
        </span>
      ) : null}
      {text ? <span className="button-text">{text}</span> : null}
    </button>
  );
};

export const DangerButton = ({
  className,
  type = "button",
  icon,
  text,
  processing,
  onClick,
}: ButtonProps) => {
  return (
    <button
      type={type}
      className={"button-classic button-danger " + className}
      onClick={onClick}
    >
      {icon ? (
        <span className={"button-icon" + (processing ? " spin-cw" : "")}>
          {processing ? <FontAwesomeIcon icon={faCircleNotch} /> : icon}
        </span>
      ) : null}
      {text ? <span className="button-text">{text}</span> : null}
    </button>
  );
};

export const SuccessButton = ({
  className,
  type = "button",
  icon,
  text,
  processing,
  onClick,
}: ButtonProps) => {
  return (
    <button
      type={type}
      className={"button-classic button-success " + className}
      onClick={onClick}
    >
      {icon ? (
        <span className={"button-icon" + (processing ? " spin-cw" : "")}>
          {processing ? <FontAwesomeIcon icon={faCircleNotch} /> : icon}
        </span>
      ) : null}
      {text ? <span className="button-text">{text}</span> : null}
    </button>
  );
};

export const PrimaryCircleButton = ({
  className,
  type = "button",
  icon,
  text,
  processing,
  onClick,
}: ButtonProps) => {
  return (
    <button
      type={type}
      className={"button-circle button-primary " + className}
      onClick={onClick}
    >
      {icon ? (
        <span className={"button-icon" + (processing ? " spin-cw" : "")}>
          {processing ? <FontAwesomeIcon icon={faCircleNotch} /> : icon}
        </span>
      ) : null}
      {text ? <span className="button-text">{text}</span> : null}
    </button>
  );
};

export const SecondaryCircleButton = ({
  className,
  type = "button",
  icon,
  text,
  hint,
  processing,
  onClick,
}: ButtonProps) => {
  return (
    <button
      type={type}
      className={"button-circle button-secondary " + className}
      title={hint}
      onClick={onClick}
    >
      {icon ? (
        <span className={"button-icon" + (processing ? " spin-cw" : "")}>
          {processing ? <FontAwesomeIcon icon={faCircleNotch} /> : icon}
        </span>
      ) : null}
      {text ? <span className="button-text">{text}</span> : null}
    </button>
  );
};

export const DangerCircleButton = ({
  className,
  type = "button",
  icon,
  text,
  processing,
  onClick,
}: ButtonProps) => {
  return (
    <button
      type={type}
      className={"button-circle button-danger " + className}
      onClick={onClick}
    >
      {icon ? (
        <span className={"button-icon" + (processing ? " spin-cw" : "")}>
          {processing ? <FontAwesomeIcon icon={faCircleNotch} /> : icon}
        </span>
      ) : null}
      {text ? <span className="button-text">{text}</span> : null}
    </button>
  );
};

export const SuccessCircleButton = ({
  className,
  type = "button",
  icon,
  text,
  processing,
  onClick,
}: ButtonProps) => {
  return (
    <button
      type={type}
      className={"button-circle button-success " + className}
      onClick={onClick}
    >
      {icon ? (
        <span className={"button-icon" + (processing ? " spin-cw" : "")}>
          {processing ? <FontAwesomeIcon icon={faCircleNotch} /> : icon}
        </span>
      ) : null}
      {text ? <span className="button-text">{text}</span> : null}
    </button>
  );
};
