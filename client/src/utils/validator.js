import {
  getTommorow,
  getToday,
  getCurrentTime,
  getCurrentDay,
} from "./DateTimeFunctions";

export const validator = (data, config) => {
  const errors = {};

  function validate(
    validateMethod,
    data,
    config,
    methodOfWork,
    dateOfWork,
    brigada
  ) {
    let statusValidate;

    switch (validateMethod) {
      case "isCorrectDate":
        statusValidate = data <= getToday();
        break;
      case "isRequired": {
        if (typeof data === "boolean") {
          statusValidate = !data;
        } else if (typeof data === "string") {
          statusValidate = data.trim() === "";
        } else statusValidate = data === null;
        break;
      }
      case "isCorrectTimeAuto": {
        if (typeof data !== null) {
          if (dateOfWork <= getTommorow()) {
            if (getCurrentDay() === 5 && getCurrentTime() > "1400") {
              statusValidate = data;
              break;
            }
            if (getCurrentTime() > "1500") {
              statusValidate = data;
              break;
            }
          }
        }
        break;
      }
      case "isRequiredPo": {
        if (methodOfWork === "po") {
          if (typeof data === "string") {
            statusValidate = data.trim() === "";
          } else statusValidate = data === null;
          break;
        }
        break;
      }
      case "isRequiredBrigadier": {
        if (brigada.length !== 0) {
          // console.log("brigada est", brigada);

          if (typeof data === "string") {
            statusValidate = data.trim() === "";
            break;
          }
        }
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
        config[fieldName][validateMethod],
        data["methodOfWork"]["name"],
        data["dateOfWork"],
        data["brigada"]
      );
      if (error && !errors[fieldName]) {
        errors[fieldName] = error;
      }
    }
  }
  return errors;
};
