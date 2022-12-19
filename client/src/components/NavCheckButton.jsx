import React from "react";
import styles from "./NavCheckButton.module.css";

const NavCheckButton = (props) => {
  //console.log(props.id);
  //console.log(props.title);
  return (
    <div className={`pe-1 fs-6  ${styles.setMinHeight}`}>
      {props.check ? (
        <div
          className={`form-check form-switch border  rounded  bg-success text-center d-flex align-items-center   ${styles.setMinHeight}`}
          role="button"
        >
          <input
            className={`form-check-input bg-primary border-light p-1 ${styles["form-check-input"]}`}
            type="checkbox"
            id={props.id}
            onClick={() => props.onCheck(props.id)}
            role="button"
          />
          <label
            className="form-check-label user-select-none p-1"
            htmlFor={props.id}
            role="button"
          >
            {props.title}
          </label>
        </div>
      ) : (
        <div
          className={`form-check form-switch border rounded  text-center d-flex align-items-center   ${styles.setMinHeight}`}
          role="button"
        >
          <input
            className={`form-check-input border-light p-1  ${styles["form-check-input"]}`}
            type="checkbox"
            id={props.id}
            onClick={() => props.onCheck(props.id)}
            role="button"
          />
          <label
            className="form-check-label user-select-none p-1"
            htmlFor={props.id}
            role="button"
          >
            {props.title}
          </label>
        </div>
      )}
    </div>
  );
};

export default NavCheckButton;
