import React from "react";

import { convertDate } from "../utils/DateFunctions";
import { shortFio } from "../utils/fioUtils";

const TableRowsPlan = ({
  columns,
  rows,
  works,
  objects,
  auto,
  gn,
  brigada,
}) => {
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
    if (column === "brigada") {
      console.log(row[column]);
      const idArr = row[column].split(",");
      let fioList = "";
      brigada &&
        idArr.map((id) => {
          // console.log(row["st_brigadi"]);
          if (id === row["st_brigadi"]) {
            fioList +=
              shortFio(brigada.filter((brigada) => brigada.id === id)[0].fio) +
              "(ст.), ";
          } else {
            fioList +=
              shortFio(brigada.filter((brigada) => brigada.id === id)[0].fio) +
              ", ";
          }
        });
      return fioList.trim().slice(0, -1);
    }

    if (column === "avto") {
      return auto.filter((auto) => auto.id === row[column])[0].name;
    }
    if (column === "id_gn") {
      if (gn) {
        const avtoNumber = gn.filter((gn) => gn.type === row[column]);
        return avtoNumber[0].marka + " " + avtoNumber[0].nomer;
      }
    }
    if (column === "opasn") {
      if (row[column] === "0") {
        return "согласование не требуется";
      } else if (row["utv_opasn"] === "0") {
        return "на согласовании";
      }
    }
    if (column === "vipolneno") {
      if (row[column] === "0") {
        return "не выполнено";
      } else {
        return "выполнено";
      }
    }
    // return row[column];
  };
  return (
    <tbody>
      {rows &&
        rows.map((row) => (
          <tr key={row.id + row.id_sl}>
            {columns.map((column) => (
              <td className="border text-center" key={column.id}>
                {renderContent(column.path, row)}
              </td>
            ))}
          </tr>
        ))}
    </tbody>
  );
};
export default TableRowsPlan;
