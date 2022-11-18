import React from "react";

import { convertDate } from "../utils/DateFunctions";

const TableRows = ({ columns, rows }) => {
  let number = 0;
  const renderContent = (column, row) => {
    // let number = 0;
    if (column === "number") {
      number++;
      return number;
    }
    if (column === "data_rabot") {
      return convertDate(row[column]);
    }

    return row[column];
  };
  return (
    <tbody>
      {rows.map((row) => (
        <tr key={row.id + row.id_sl}>
          {columns.map((column) => (
            <td className="border" key={column.id}>
              {
                // row[column.path]
                renderContent(column.path, row)
              }
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
};
export default TableRows;
