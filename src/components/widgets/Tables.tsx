import React, { ReactNode } from "react";

type TableProps = {
  className?: string;
  headers?: ReactNode[];
  cols?: ReactNode[];
  rows?: ReactNode[][];
};

export const RowTable = ({ className, headers, rows }: TableProps) => {
  return (
    <table className={"table-type-row " + className}>
      {headers ? (
        <thead>
          {headers.map((header, index) => (
            <th key={index}>{header}</th>
          ))}
        </thead>
      ) : null}
      <tbody>
        {rows
          ? rows.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((cell, cellIndex) => (
                  <td key={cellIndex}>{cell}</td>
                ))}
              </tr>
            ))
          : null}
      </tbody>
    </table>
  );
};

export const ColumnTable = ({ headers, cols }: TableProps) => {
  return (
    <table className="table-type-col">
      <tbody>
        {cols
          ? cols.map((col, index) => (
              <tr key={index}>
                {headers ? <th>{headers[index]}</th> : null}
                <td>{col}</td>
              </tr>
            ))
          : null}
      </tbody>
    </table>
  );
};
