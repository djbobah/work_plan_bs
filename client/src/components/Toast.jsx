import React from "react";
const Toast = ({ show, message, onToastClose }) => {
  return (
    <div
      className={`toast position-absolute border-danger
       ${show ? "show" : "hide"}`}
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
      data-bs-autohide="true"
      data-bs-delay="3000"
    >
      <div className="toast-header ">
        <img src="..." className="rounded me-2" alt="..." />
        <strong className="me-auto text-danger">Внимание!</strong>
        <small></small>
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="toast"
          aria-label="Закрыть"
          onClick={onToastClose}
        ></button>
      </div>
      <div className="toast-body text-center text-dark">{message}</div>
    </div>
  );
};

export default Toast;
