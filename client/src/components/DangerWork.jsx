import React, { useState } from "react";
import { shortFio } from "../utils/fioUtils";
import { getToday, convertDate, getTime } from "../utils/DateTimeFunctions";
import axios from "axios";
import config from "../config.json";

const DangerWork = ({ row, dangerWork, brigada }) => {
  // console.log("row", row);
  // console.log("dangerWork", dangerWork);
  // console.log("brigada", brigada);
  const [approveWork, setApproveWork] = useState(row["utv_opasn"]);
  const [work, setWork] = useState(undefined);

  const handleClickApprove = (id) => {
    console.log(" approve work with id: ", id);

    const user = "pds.kamensk";
    const remote_addr = "10.27.27.116";
    const date_utv = getToday();
    const time_utv = getTime();
    //рендерим компонент до записи, чтоб не выдавало ошибку, т.к. рендер происходит до записи в базу
    setWork({
      comment: "",
      date_utv: date_utv,
      id_rab: id,
      remote_addr: "10.27.27.116",
      time_utv: time_utv,
      user: "pds.kamensk",
    });
    axios
      .post(config.apiEndpoint + "danger/work", {
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

    setApproveWork(1);
  };

  if (row["OPASN"] === 0) {
    return "согласование не требуется";
  } else if (approveWork === 0) {
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
    // console.log("work------------===", work);
    if (work === undefined) {
      const filteredDangerWork = dangerWork.filter(
        (work) => row.id === work.id_rab
      );

      // console.log("dangerWork---", dangerWork);
      const filteredUser = brigada?.filter(
        (user) => filteredDangerWork[0].user === user.email
      );
      return (
        <div className="bg-success text-white rounded p-2">
          <span className="fw-bold">Cогласовано</span>
          {` ${convertDate(filteredDangerWork[0].date_utv)} ${
            filteredDangerWork[0].time_utv
          } ${shortFio(filteredUser[0]?.fio)}`}
        </div>
      );
    } else {
      const filteredUser = brigada?.filter((user) => work.user === user.email);
      return (
        <div className="bg-success text-white rounded p-2">
          <span className="fw-bold">Cогласовано</span>
          {` ${convertDate(work.date_utv)} ${work.time_utv} ${shortFio(
            filteredUser[0]?.fio
          )}`}
        </div>
      );
    }
  }
};

export default DangerWork;
