import React, { useState } from "react";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";

const ToasT = ({ show, message, title, onToastClose }) => {
  // const [show, setShow] = useState(true);
  return (
    <ToastContainer position="top-start" className="p-5">
      <Toast
        onClose={onToastClose}
        show={show}
        delay={4000}
        autohide
        className="border-danger"
      >
        <Toast.Header className="bg-danger text-dark">
          <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
          <strong className="me-auto ">{title}</strong>
          {/* <small className="text-muted">just now</small> */}
        </Toast.Header>
        <Toast.Body className="text-dark">{message}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
};

export default ToasT;
