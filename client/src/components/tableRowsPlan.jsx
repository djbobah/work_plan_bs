import React, { useState } from "react";

import { convertDate } from "../utils/DateTimeFunctions";
import { shortFio } from "../utils/fioUtils";

import deletePng from "../static/img/delete.png";
// import editPng from "../static/img/edit.png";
import copyPng from "../static/img/copy-two-paper-sheets-interface-symbol_icon-icons.com_73283.svg";
import Done from "./Done";
import { getToday } from "../utils/DateTimeFunctions";

const TableRowsPlan = ({
  columns,
  rows,
  works,
  objects,
  auto,
  gn,
  brigada,
  department,
  contractingOrganization,
  onDelete,
  checkButtons,
}) => {
  // const [department, setDepartment] = useState();
  let number = 0;
  let currentDay;

  const renderContent = (column, row) => {
    // let number = 0;
    if (column === "number") {
      number++;
      return number;
    }
    if (column === "data_rabot") {
      currentDay = row[column];
      // console.log("today", getToday());
      // console.log("currentDay", currentDay);
      // console.log(getToday() < currentDay);
      return convertDate(row[column]);
    }
    if (column === "id_vid_rabot") {
      if (works) {
        return works.filter((work) => work.id === Number(row[column]))[0]?.name;
      }
    }

    // const id_podr_org = row["id_podr_org"];
    const podrOrgName = contractingOrganization.filter(
      (org) => org.id === row["id_podr_org"]
    )[0]?.name;

    if (column === "sposob") {
      if (row[column] === "ss") {
        return "собственными силами";
      } else return "подрядная организация";
    }
    if (column === "id_object") {
      return objects.filter((object) => object.id === Number(row[column]))[0]
        ?.name;
    }
    if (column === "Brigada") {
      // console.log("row[column]", row[column]);
      const idArr = row[column].split(";");
      // console.log("idArr---------------", idArr);
      let fioList = "";
      // console.log("brigada", brigada);
      brigada &&
        // idArr.length > 1 &&
        idArr.map((id) => {
          if (id !== "") {
            if (id === row["st_brigadi"]) {
              fioList +=
                shortFio(
                  brigada?.filter((brigada) => brigada.id === Number(id))[0]
                    ?.fio
                ) + "(ст.), ";
            } else {
              fioList +=
                shortFio(
                  brigada?.filter((brigada) => brigada.id === Number(id))[0]
                    ?.fio
                ) + ", ";
            }
          }
        });

      return (
        <>
          <div className="text-bg-secondary rounded">{podrOrgName}</div>
          <div>{fioList.trim().slice(0, -1)}</div>
        </>
      );
    }
    if (column === "avto") {
      if (row[column] !== 1)
        return auto.filter((auto) => auto.id === Number(row[column]))[0]?.name;
      else return "не используется";
    }
    if (column === "id_gn") {
      if (gn) {
        const avtoNumber = gn.filter((gn) => gn.id === Number(row[column]));
        // console.log("avtoNumber", avtoNumber);
        return avtoNumber[0].marka + " " + avtoNumber[0].nomer;
      }
    }
    if (column === "comment") {
      // if (row[column] === 0) {
      return row[column];
    }
    if (column === "OPASN") {
      if (row[column] === 0) {
        return "согласование не требуется";
      } else if (row["utv_opasn"] === 0) {
        return <div className="bg-warning rounded">на согласовании</div>;
      }
    }
    if (column === "vipolneno") {
      return <Done done={row[column]} id={row.id} />;
    }

    if (column === "delete") {
      return (
        <div className="d-flex">
          {currentDay > getToday() && (
            <button
              className="btn btn-light border border-secondary rounded m-1 p-1 "
              onClick={() => onDelete(row.id)}
            >
              <svg
                width="20"
                height="20"
                color="primary"
                fill="bg-secondary"
                className="bi bi-pencil-square "
                viewBox="0 0 16 16"
              >
                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                <path
                  fillRule="evenodd"
                  d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                />
              </svg>
            </button>
          )}
          <button
            className="btn  btn-light border border-secondary rounded  m-1 p-1"
            onClick={() => onDelete(row.id)}
          >
            <img src={copyPng} width="20px" alt="Добавить копированием" />
          </button>
          {currentDay > getToday() && (
            <button
              className="btn btn-light border border-secondary rounded m-1 p-1"
              onClick={() => onDelete(row.id)}
            >
              <img src={deletePng} width="20px" alt="Удалить строку плана" />
            </button>
          )}
        </div>
      );
    }
    // return row[column];
  };
  // console.log("checkButtons", checkButtons[0].checked);
  // console.log("rows", rows);
  let department_ = 0;

  const renderAllDepartment = (row) => {
    if (row.id_sl !== department_) {
      department_ = row.id_sl;
      const departmentName = department.filter(
        (dep) => dep.id_sl === row.id_sl
      )[0].name;
      // console.log(departmentName);
      return (
        <>
          {" "}
          <tr key={row.id + row.id_sl + row.id}>
            <td colSpan={columns.length} align={"center"} className="bg-info">
              {departmentName}
            </td>
          </tr>
          <tr key={row.id + row.id_sl}>
            {columns.map((column) => (
              <td className="border text-center" key={column.id}>
                {renderContent(column.path, row)}
              </td>
            ))}
          </tr>
        </>
      );
    }

    return (
      <tr key={row.id + row.id_sl}>
        {columns.map((column) => (
          <td className="border text-center" key={column.id}>
            {renderContent(column.path, row)}
          </td>
        ))}
      </tr>
    );
  };

  return (
    <tbody>
      {rows &&
        rows.map((row) =>
          !checkButtons[0].checked ? (
            <tr key={row.id + row.id_sl}>
              {columns.map((column) => (
                <td className="border text-center" key={column.id}>
                  {renderContent(column.path, row)}
                </td>
              ))}
            </tr>
          ) : (
            <>{renderAllDepartment(row)}</>
          )
        )}
    </tbody>
  );
};
export default TableRowsPlan;
