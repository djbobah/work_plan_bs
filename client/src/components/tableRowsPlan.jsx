import React from "react";

import { convertDate } from "../utils/DateFunctions";
import { shortFio } from "../utils/fioUtils";
import deletePng from "../static/img/delete.png";
import editPng from "../static/img/edit.png";
import copyPng from "../static/img/copy-two-paper-sheets-interface-symbol_icon-icons.com_73283.svg";

const TableRowsPlan = ({
  columns,
  rows,
  works,
  objects,
  auto,
  gn,
  brigada,
  onDelete,
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
    if (column === "delete") {
      return (
        <div className="d-flex">
          <button
            className="btn btn-light border border-secondary rounded m-1 p-1 "
            onClick={() => onDelete(row.id)}
          >
            <svg
              width="25"
              height="25"
              color="primary"
              fill="bg-secondary"
              className="bi bi-pencil-square "
              viewBox="0 0 16 16"
            >
              <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
              <path
                fill-rule="evenodd"
                d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
              />
            </svg>
          </button>
          <button
            className="btn  btn-light border border-secondary rounded  m-1 p-1"
            onClick={() => onDelete(row.id)}
          >
            <img src={copyPng} width="30px" alt="Добавить копированием" />
          </button>
          <button
            className="btn btn-light border border-secondary rounded m-1 p-1"
            onClick={() => onDelete(row.id)}
          >
            <img src={deletePng} width="30px" alt="Удалить строку плана" />
          </button>
        </div>
      );
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
