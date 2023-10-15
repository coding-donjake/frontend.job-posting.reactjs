import React, { ReactNode } from "react";

type ListProps = {
  className?: string;
  items: ReactNode[];
};

export const ColumnList = ({ className, items }: ListProps) => {
  return <div className={"list-column " + className}>{items}</div>;
};

export const RowList = ({ className, items }: ListProps) => {
  return <div className={"list-row " + className}>{items}</div>;
};
