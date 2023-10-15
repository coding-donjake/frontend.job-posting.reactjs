import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { ChangeEvent } from "react";

type PrimaryInputProps = {
  className?: string;
  type: string;
  name: string;
  id: string;
  options?: [string, string][];
  min?: number | string;
  max?: number | string;
  label?: string;
  value?: string;
  onChange?: (
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  readonly?: boolean;
};

interface SearchInputProps {
  className?: string;
  name: string;
  id: string;
  label?: string;
  value?: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export const PrimaryInput = ({
  className,
  type,
  name,
  id,
  options,
  min,
  max,
  label,
  value,
  onChange,
  readonly,
}: PrimaryInputProps) => {
  let commonProps = {};
  readonly
    ? (commonProps = {
        name,
        id,
        min,
        max,
        defaultValue: value,
        onChange,
        autoComplete: "off",
        readOnly: readonly,
      })
    : (commonProps = {
        name,
        id,
        min,
        max,
        defaultValue: value,
        onChange,
        autoComplete: "off",
      });

  return (
    <div className={"input-classic input-primary " + className}>
      {label ? <label htmlFor={id}>{label}</label> : null}
      {type === "textarea" ? (
        <textarea {...commonProps} />
      ) : type === "select" ? (
        <select {...commonProps} value={value}>
          {options?.map(([displayText, optionValue], index) =>
            optionValue === "" ? (
              <option className="hidden" key={index} value={optionValue}>
                {displayText}
              </option>
            ) : (
              <option key={index} value={optionValue}>
                {displayText}
              </option>
            )
          )}
        </select>
      ) : (
        <input type={type} {...commonProps} />
      )}
    </div>
  );
};

export const SearchInput = ({
  className,
  name,
  id,
  label,
  value,
  onChange,
  onClick,
}: SearchInputProps) => {
  const commonProps = {
    name,
    id,
    placeholder: label,
    defaultValue: value,
    onChange,
    autoComplete: "off",
  };

  return (
    <div className={"input-search " + className}>
      <input type="text" {...commonProps} />
      <span className="input-search-icon" onClick={onClick}>
        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </span>
    </div>
  );
};
