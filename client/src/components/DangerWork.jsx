import React, { useState } from "react";
import { shortFio } from "../utils/fioUtils";
import { getToday, convertDate, getTime } from "../utils/DateTimeFunctions";
import axios from "axios";

const DangerWork = ({ row, dangerWork, brigada }) => {
  const handleClickApprove = (id) => {
    console.log(" approve work with id: ", id);

    const user = "pds.kamensk";
    const remote_addr = "10.27.27.116";
    const date_utv = getToday();
    const time_utv = getTime();

    axios
      .post("http://localhost:5000/api/danger/work", {
        id,
        user,
        remote_addr,
        date_utv,
        time_utv,
      })
      .then((work) => {
        console.log("post------------", work.data);
      })
      .catch((e) => {
        console.log(e);
      });
    // setApproveDangerWork(!approveDangerWork);
  };

  if (row["OPASN"] === 0) {
    return "согласование не требуется";
  } else if (row["utv_opasn"] === 0) {
    if (localStorage.getItem("id_sl") === "16-а00188") {
      return (
        <button
          className="btn btn-warning"
          onClick={() => handleClickApprove(row.id)}
        >
          Согласовать
        </button>
      );
    }
    return <div className="bg-warning rounded">На согласовании</div>;
  } else {
    const filteredDangerWork = dangerWork.filter(
      (work) => row.id === work.id_rab
    );
    const filteredUser = brigada.filter(
      (user) => filteredDangerWork[0].user === user.email
    );
    return (
      <div className="bg-success text-white rounded">
        <span className="fw-bold">Cогласовано</span>
        {` ${convertDate(filteredDangerWork[0].date_utv)} ${
          filteredDangerWork[0].time_utv
        } ${shortFio(filteredUser[0]?.fio)}`}
      </div>
    );
  }
};

export default DangerWork;
