import React, { ReactNode } from "react";
import { RowList } from "./Lists";

type HeaderProps = {
  className?: string;
  icon?: ReactNode;
  actions?: ReactNode[];
};

export const PrimaryHeader = ({ className, icon, actions }: HeaderProps) => {
  return (
    <div className={"header-primary " + className}>
      <div className="icon-container">{icon}</div>
      <div className="flex flex-1 justify-end">
        <RowList items={actions!} />
      </div>
    </div>
  );
};
