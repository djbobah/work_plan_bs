import React, { useState } from "react";
import axios from "axios";

const Done = ({ done, id }) => {
  const [doneState, setDoneState] = useState(done);

  const handleDoneClick = (id) => {
    console.log("sring of plans done/ id:", id);
    axios
      .patch("http://localhost:5000/api/plan/donestring", { id })
      .then((i) => {
        console.log("put----------------------", i.data);
      })
      .catch((e) => {
        console.log(e);
      });
    setDoneState(1);
  };

  if (doneState === 0) {
    return (
      <div>
        <span className=" text-danger fw-bold text-uppercase">
          Не выполнено
        </span>
        <button
          className="btn btn-sm btn-primary mt-2"
          onClick={() => handleDoneClick(id)}
        >
          Выполнить
        </button>
      </div>
    );
  } else {
    return (
      <span className="badge text-bg-success p-2 text-uppercase">
        Выполнено
      </span>
    );
  }
};

export default Done;
