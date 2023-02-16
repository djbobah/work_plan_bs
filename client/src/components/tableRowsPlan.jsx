import React, { useState } from "react";

import { shortFio } from "../utils/fioUtils";

import deletePng from "../static/img/delete.png";
// import editPng from "../static/img/edit.png";
import copyPng from "../static/img/copy-two-paper-sheets-interface-symbol_icon-icons.com_73283.svg";
import Done from "./Done";
import { getToday, convertDate } from "../utils/DateTimeFunctions";
import DangerWork from "./DangerWork";
import AutoForTableRow from "./AutoForTableRow";
import GnForTableRows from "./gnForTableRows";

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
  dangerWork,
  onDelete,
  checkButtons,
  onEdit,
  onEditAuto,
  // onCopy,
}) => {
  // const [idAutoState, setIdAutoState] = useState(0);
  // const [department, setDepartment] = useState();
  let number = 0;
  let currentDay;
  const id_sl = localStorage.getItem("id_sl");

  const renderContent = (column, row) => {
    // let number = 0;
    if (column === "number") {
      number++;
      return (
        <>
          <div>{number}</div>
          <div className="text-light">{row.id}</div>
        </>
      );
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
      //для автотранспортного цеха
      // if (id_sl === "16-а00135") {
      //   // setIdAutoState(row[column]);
      //   return (
      //     <AutoForTableRow auto={auto} idAuto={row[column]} idRow={row.id} />
      //   );
      // } else {
      if (row[column] !== 1)
        return auto.filter((auto) => auto.id === Number(row[column]))[0]?.name;
      else return "не используется";
      // }
    }
    if (column === "id_gn") {
      if (gn) {
        // if (id_sl === "16-а00135") {
        //   // console.log("GN", gn);
        //   console.log("auto id", row["avto"]);
        //   return (
        //     <GnForTableRows
        //       autoId={row["avto"]}
        //       gn={gn}
        //       idGn={row[column]}
        //       idRow={row.id}
        //     />
        //   );
        // } else {
        const avtoNumber = gn.filter((gn) => gn.id === Number(row[column]));

        return avtoNumber[0].marka + " " + avtoNumber[0].nomer;
      }
    }
    if (column === "comment") {
      // if (row[column] === 0) {
      return row[column];
    }

    if (column === "OPASN") {
      // console.log()
      return <DangerWork row={row} dangerWork={dangerWork} brigada={brigada} />;
    }
    if (column === "vipolneno") {
      return <Done done={row[column]} id={row.id} />;
    }
    if (column === "add_auto") {
      return (
        <div className="d-flex">
          {" "}
          {currentDay >= getToday() && id_sl === "16-а00135" && (
            <button
              className="btn btn-light border border-secondary rounded m-1 p-1 "
              onClick={() => onEditAuto(row.id)}
              title="Добавить автомобиль..."
            >
              <svg
                fill="bg-secondary"
                color="primary"
                width="30"
                height="30"
                viewBox="-1 0 19 19"
                xmlns="http://www.w3.org/2000/svg"
                className="cf-icon-svg"
              >
                <path d="M16.417 9.583A7.917 7.917 0 1 1 8.5 1.666a7.917 7.917 0 0 1 7.917 7.917zm-3.948-1.455-.758-1.955a.816.816 0 0 0-.726-.498H6.054a.816.816 0 0 0-.727.498L4.57 8.128a1.43 1.43 0 0 0-1.052 1.375v2.046a.318.318 0 0 0 .317.317h.496v1.147a.238.238 0 0 0 .238.237h.892a.238.238 0 0 0 .237-.237v-1.147h5.644v1.147a.238.238 0 0 0 .237.237h.892a.238.238 0 0 0 .238-.237v-1.147h.496a.318.318 0 0 0 .317-.317V9.503a1.43 1.43 0 0 0-1.052-1.375zm-7.445.582a.792.792 0 1 0 .792.792.792.792 0 0 0-.792-.792zm5.96-2.402a.192.192 0 0 1 .137.094l.65 1.676H5.267l.65-1.676a.192.192 0 0 1 .136-.094h4.93zm1.04 2.402a.792.792 0 1 0 .792.792.792.792 0 0 0-.791-.792z" />
              </svg>
            </button>
          )}
        </div>
      );
    }
    if (column === "delete") {
      return (
        <div className="d-flex">
          {currentDay > getToday() && (
            <button
              className="btn btn-light border border-secondary rounded m-1 p-1 "
              onClick={() => onEdit(row.id, "edit")}
              title="Редактировать строку..."
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
            onClick={() => onEdit(row.id, "copy")}
            title="Копировать строку..."
          >
            <img src={copyPng} width="20px" alt="Добавить копированием..." />
          </button>
          {currentDay > getToday() && (
            <button
              className="btn btn-light border border-secondary rounded m-1 p-1"
              onClick={() => onDelete(row.id)}
              title="Удалить строку..."
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
              <td className="border text-center align-middle " key={column.id}>
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
          <td className="border text-center align-middle" key={column.id}>
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
                <td className="border text-center" key={column.id + column.id}>
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
