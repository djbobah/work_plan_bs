import { getTommorow, getToday } from "./DateFunctions";

export const validator = (data, config) => {
  const errors = {};

  function validate(validateMethod, data, config) {
    let statusValidate;
    switch (validateMethod) {
      case "isCorrectDate":
        // console.log("data", data);
        // console.log("getToday", getToday());
        // console.log("data <= getToday()", data <= getToday());
        statusValidate = data <= getToday();

        // const emailRegExp = /^\S+@\S+\.\S+$/g;
        // statusValidate = !emailRegExp.test(data);
        break;
      case "isRequired": {
        console.log("data", data);

        if (typeof data === "boolean") {
          statusValidate = !data;
        } else if (typeof data === "string") {
          statusValidate = data.trim() === "";
        } else statusValidate = data === null;
        break;
      }

      default:
        break;
    }
    if (statusValidate) return config.message;
  }
  for (const fieldName in data) {
    for (const validateMethod in config[fieldName]) {
      const error = validate(
        validateMethod,
        data[fieldName],
        config[fieldName][validateMethod]
      );
      if (error && !errors[fieldName]) {
        errors[fieldName] = error;
      }
    }
  }
  return errors;
};
