import React, { ReactNode } from "react";
import { ColumnList } from "./Lists";

type NavigationProps = {
  className?: string;
  logo?: ReactNode;
  title?: string;
  actions?: ReactNode[];
};

export const SideNavigation = ({
  className,
  logo,
  title,
  actions,
}: NavigationProps) => {
  return (
    <div className={"navigation-side " + className}>
      <div className="logo-container">{logo}</div>
      <div className="navigation-title">{title}</div>
      <ColumnList className="flex-1" items={actions!} />
    </div>
  );
};
