import React from "react";
import Select from "react-select";

const MultiSelectModal = ({ options, onChange, name }) => {
  // console.log("options", options);

  // if (!Array.isArray(options) && typeof options === "object") {
  //   Object.keys(options).map((optionName) => {
  //     console.log("options[optionName]", options[optionName]);
  //   });
  // } else {
  //   console.log("options------------", options);
  // }

  const optionsArray =
    !Array.isArray(options) && typeof options === "object"
      ? Object.keys(options).map((optionName) => ({
          label: options[optionName].fio,
          value: options[optionName].id,
        }))
      : options.map((optionName) => ({
          label: optionName.fio,
          value: optionName.id,
        }));
  const handleChange = (value) => {
    onChange({ name: name, value });
  };
  return (
    <Select
      isMulti
      closeMenuOnSelect={false}
      // defaultValue={defaultValue}
      options={optionsArray}
      className="basic-multi-select"
      classNamePrefix="select"
      onChange={handleChange}
      name={name}
    />
  );
};

export default MultiSelectModal;
