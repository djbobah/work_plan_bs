import React from "react";
import CreatableSelect from "react-select/creatable";

const CreatableSelectModal = ({ name, options, onChange }) => {
  const handleChange = (value) => {
    onChange({ name: name, value });
  };
  const error = "ddddd";
  return (
    <>
      <CreatableSelect
        className="form-select is-invalid"
        // className="basic-multi-select is-invalid "
        required
        // isInvalid
        formatCreateLabel={(inputText) => `Добавить: "${inputText}"`}
        isClearable
        placeholder="Выберите или начните ввод..."
        name={name}
        // defaultOption=" Choose..."
        options={options}
        onChange={handleChange}
        // value={works}
      />{" "}
      {<div className="invalid-feedback">{error}</div>}
      {<div className="">{error}</div>}
    </>
  );
};

export default CreatableSelectModal;
