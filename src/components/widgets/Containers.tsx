import React, { ReactNode } from "react";

type ContainerProps = {
  className?: string;
  header?: ReactNode;
  actions?: ReactNode[];
  body: ReactNode;
};

export const PrimaryContainer = ({
  className,
  header,
  actions,
  body,
}: ContainerProps) => {
  return (
    <div className={"container-primary " + className}>
      <div className="container-header">
        <div className="container-title">{header}</div>
        <div className="container-actions">{actions}</div>
      </div>
      {body}
    </div>
  );
};
