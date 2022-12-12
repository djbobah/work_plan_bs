import React from "react";
import Select from "react-select";

const SelectModal = ({ name, options, onChange, error }) => {
  const handleChange = (value) => {
    onChange({ name: name, value });
  };
  // const error = "ddddd";
  return (
    <>
      <Select
        className=" is-invalid"
        // className="basic-multi-select is-invalid "
        //required
        //isInvalid
        // formatCreateLabel={(inputText) => `Добавить: "${inputText}"`}
        isClearable
        placeholder="Выберите желаемый автомобиль(если необходимо)..."
        name={name}
        // defaultOption=" Choose..."
        options={options}
        onChange={handleChange}
        // value={works}
      />{" "}
      {<div className="invalid-feedback">{error}</div>}
      {/* {<div className="">{error}</div>} */}
    </>
  );
};

export default SelectModal;
