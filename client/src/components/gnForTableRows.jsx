import React, { useState, useMemo, useEffect } from "react";
import Select from "react-select";
import axios from "axios";
const GnForTableRows = ({ autoId, gn, idGn, idRow }) => {
  const [dataGn, setDataGn] = useState({});

  const handleChangeAuto = (target) => {
    setDataGn({
      label: target.label,
      value: target.value,
    });
    console.log("change GN id ", target.value);
    axios
      .patch("http://localhost:5000/api/plan/gn", { target, idRow })
      .then((plan) => {
        // console.log("post------------", plan.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const filteredGn = gn.filter((item) => item.type === autoId);
  const optionsGn = useMemo(
    () =>
      filteredGn?.map((car) => ({
        label: car.marka + " " + car.nomer,
        value: car.id,
      })),
    [gn]
  );
  // console.log("filteredGn", filteredGn);

  const filteredIdGn = filteredGn.filter((item) => item.id === idGn);
  console.log("filteredIdGn", filteredIdGn);
  useEffect(() => {
    console.log("filteredIdGn use Effect", filteredIdGn);

    setDataGn(
      filteredIdGn?.id === undefined
        ? null
        : {
            label: filteredIdGn.marka + " " + filteredIdGn.nomer,
            value: filteredIdGn.id,
          }
    );
  }, []);

  // const MemoizedSelectModal = React.memo(SelectModal);
  return (
    <Select
      name="gn"
      // isClearable
      placeholder="Выберите автомобиль..."
      //defaultOption=" Choose..."
      options={optionsGn}
      onChange={handleChangeAuto}
      value={dataGn}
    />
  );
};

export default GnForTableRows;
