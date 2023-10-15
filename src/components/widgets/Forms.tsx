import React, { FormEvent, ReactNode } from "react";

type FormGroup = {
  name?: string;
  items: ReactNode[];
};

type FormProps = {
  className?: string;
  logo?: ReactNode;
  name?: string;
  formGroups: FormGroup[];
  actions: ReactNode[];
  onSubmit: (event: FormEvent) => void;
};

export const TinyForm = ({
  className,
  logo,
  name,
  formGroups,
  actions,
  onSubmit,
}: FormProps) => {
  return (
    <div className={"form-tiny " + className}>
      <form onSubmit={onSubmit}>
        {logo ? <div className="logo-container">{logo}</div> : null}
        <div className="form-name">{name}</div>
        {formGroups.map((group, groupIndex) => (
          <div className="form-group" key={groupIndex}>
            {group.name ? (
              <div className="form-group-name">{group.name}</div>
            ) : null}
            <div className="form-group-items">
              {group.items.map((item, itemIndex) => (
                <div key={itemIndex}>{item}</div>
              ))}
            </div>
          </div>
        ))}
        <div className="form-actions">
          {actions.map((action, actionIndex) => (
            <div key={actionIndex}>{action}</div>
          ))}
        </div>
      </form>
    </div>
  );
};

export const RegularForm = ({
  className,
  logo,
  name,
  formGroups,
  actions,
  onSubmit,
}: FormProps) => {
  return (
    <div className={"form-regular " + className}>
      <form onSubmit={onSubmit}>
        {logo ? <div className="logo-container">{logo}</div> : null}
        <div className="form-name">{name}</div>
        {formGroups.map((group, groupIndex) => (
          <div className="form-group" key={groupIndex}>
            {group.name ? (
              <div className="form-group-name">{group.name}</div>
            ) : null}
            <div className="form-group-items">
              {group.items.map((item, itemIndex) => (
                <div key={itemIndex}>{item}</div>
              ))}
            </div>
          </div>
        ))}
        <div className="form-actions">
          {actions.map((action, actionIndex) => (
            <div key={actionIndex}>{action}</div>
          ))}
        </div>
      </form>
    </div>
  );
};

export const FitForm = ({
  className,
  logo,
  name,
  formGroups,
  actions,
  onSubmit,
}: FormProps) => {
  return (
    <div className={"form-fit " + className}>
      <form onSubmit={onSubmit}>
        {logo ? <div className="logo-container">{logo}</div> : null}
        <div className="form-name">{name}</div>
        {formGroups.map((group, groupIndex) => (
          <div className="form-group" key={groupIndex}>
            {group.name ? (
              <div className="form-group-name">{group.name}</div>
            ) : null}
            <div className="form-group-items">
              {group.items.map((item, itemIndex) => (
                <div key={itemIndex}>{item}</div>
              ))}
            </div>
          </div>
        ))}
        <div className="form-actions">
          {actions.map((action, actionIndex) => (
            <div key={actionIndex}>{action}</div>
          ))}
        </div>
      </form>
    </div>
  );
};
