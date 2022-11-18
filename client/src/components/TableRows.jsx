import React from "react";

import { convertDate } from "../utils/DateFunctions";

const TableRows = ({ columns, rows, works, objects }) => {
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
    if (column === "id_vid_rabot") {
      const work = works.filter((work) => work.id === row[column]);
      return work[0].name;
    }
    if (column === "sposob") {
      if (row[column] === "ss") {
        return "собственными силами";
      } else return "подрядная организация";
    }
    if (column === "id_object") {
      const object = objects.filter((object) => object.id === row[column]);
      return object[0].name;
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
