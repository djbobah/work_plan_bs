import React, { useState } from "react";
import axios from "axios";
import config from "../config.json";

const ApproveCar = ({ utvAvto, driver, avto, id, id_sl }) => {
  const [approveCarState, setApproveCarState] = useState(utvAvto);

  const handleApproveCarClick = (id) => {
    console.log("sring of plans done/ id:", id);

    const approveCarStatus = approveCarState === 0 ? 1 : 0;
    axios
      .patch(config.apiEndpoint + "plan/approveCar", { id, approveCarStatus })
      .then((i) => {
        // console.log("put----------------------", i.data);
      })
      .catch((e) => {
        console.log(e);
      });
    setApproveCarState(approveCarStatus);
  };

  if (approveCarState === 0) {
    return (
      <div>
        {id_sl === "16-а00135" && (
          <>
            <button
              className="btn btn-sm btn-primary mt-2"
              onClick={() => handleApproveCarClick(id)}
            >
              утвердить
            </button>
            <br />
            {avto[0].marka} <br />
            {avto[0].nomer}
            {driver ? (
              <>
                <span className="badge bg-secondary">Водитель: {driver}</span>
              </>
            ) : (
              ""
            )}
          </>
        )}
      </div>
    );
  } else {
    return (
      <>
        {/* <span className="badge bg-success">согласовано</span> */}
        {/* <br /> */}
        {avto[0].marka} <br />
        {avto[0].nomer}
        {driver ? (
          <>
            <span className="badge bg-secondary">Водитель: {driver}</span>
          </>
        ) : (
          ""
        )}
      </>
    );
  }
};

export default ApproveCar;
