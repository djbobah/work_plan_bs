import React from "react";

import { convertDate } from "../utils/DateFunctions";

const TableRows = ({ columns, rows, works, objects, auto, gn }) => {
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
      return works.filter((work) => work.id === row[column])[0].name;
    }
    if (column === "sposob") {
      if (row[column] === "ss") {
        return "собственными силами";
      } else return "подрядная организация";
    }
    if (column === "id_object") {
      return objects.filter((object) => object.id === row[column])[0].name;
    }
    if (column === "avto") {
      return auto.filter((auto) => auto.id === row[column])[0].name;
    }
    if (column === "id_gn") {
      if (gn) {
        const avtoNumber = gn.filter((gn1) => gn1.type === row[column]);
        return avtoNumber[0].marka + " " + avtoNumber[0].nomer;
      }
    }
    return row[column];
  };
  return (
    <tbody>
      {rows.map((row) => (
        <tr key={row.id + row.id_sl}>
          {columns.map((column) => (
            <td className="border text-center" key={column.id}>
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
