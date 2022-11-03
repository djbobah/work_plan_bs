import React, { useState } from "react";
import { Modal, Button, InputGroup, Form } from "react-bootstrap";

const ModalAdd = ({ show, onShow, onClose, title }) => {
  // const [show, setShow] = useState(false);

  // const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);
  return (
    <>
      <Modal show={show} onHide={onClose} backdrop="static" keyboard={false}>
        <Modal.Header className="bg-info" closeButton>
          <Modal.Title className="fs-5">{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Введите дату планируемой работы</Form.Label>
              <Form.Control type="email" placeholder="name@example.com" />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          {/* <Button variant="secondary" onClick={onClose}>
            Закрыть
          </Button> */}
          <Button variant="primary">Сохранить</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalAdd;
