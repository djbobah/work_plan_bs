import React, { useState } from "react";
import SelectModal from "./modalPlan/SelectModal";

const AutoForTableRow = ({ auto, idAuto, idRow }) => {
  const [dataAuto, setDataAuto] = useState({});
  const optionsAuto = auto.map((car) => ({
    label: car.name,
    value: car.id,
  }));
  const handleChangeAuto = (id) => {
    console.log("change auto id ", id);
  };
  const filteredAuto = auto.filter((item) => item.id === idAuto)[0];
  console.log("filteredAuto", filteredAuto);
  setDataAuto(
    filteredAuto?.id === undefined
      ? null
      : {
          label: filteredAuto.name,
          value: filteredAuto.id,
        }
  );
  return (
    <SelectModal
      name="auto"
      label="Выберите автомобиль..."
      options={optionsAuto}
      onChange={() => handleChangeAuto(idRow)}
      value={dataAuto}
    />
  );
};

export default AutoForTableRow;
