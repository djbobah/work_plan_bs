import React, { useState, useCallback, useMemo, useEffect } from "react";
// import SelectModal from "./modalPlan/SelectModal";
import Select from "react-select";
import axios from "axios";
import config from "../config.json";

const AutoForTableRow = ({ auto, idAuto, idRow }) => {
  const [dataAuto, setDataAuto] = useState({});

  const handleChangeAuto = (target) => {
    setDataAuto({
      label: target.label,
      value: target.value,
    });
    console.log("change auto id ", target);
    axios
      .patch(config.apiEndpoint + "plan/auto", { target, idRow })
      .then((plan) => {
        // console.log("post------------", plan.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const optionsAuto = useMemo(
    () =>
      auto?.map((car) => ({
        label: car.name,
        value: car.id,
      })),
    [auto]
  );

  const filteredAuto = auto.filter((item) => item.id === idAuto)[0];
  // console.log("filteredAuto", filteredAuto);
  useEffect(() => {
    setDataAuto(
      filteredAuto?.id === undefined
        ? {
            label: "не используется",
            value: 1,
          }
        : {
            label: filteredAuto.name,
            value: filteredAuto.id,
          }
    );
  }, [filteredAuto]);

  // const MemoizedSelectModal = React.memo(SelectModal);
  return (
    <Select
      name="auto"
      //isClearable
      placeholder="Выберите автомобиль..."
      //defaultOption=" Choose..."
      options={optionsAuto}
      onChange={handleChangeAuto}
      value={dataAuto}
    />
  );
};

export default AutoForTableRow;
