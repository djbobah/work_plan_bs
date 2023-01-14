import React from "react";
import { Modal, Form, Row, Col, FloatingLabel } from "react-bootstrap";
import CreatableSelectModal from "../modalPlan//creatableSelectModal";
import SelectModal from "../modalPlan/selectModal";
import MultiSelectModal from "../modalPlan//multiSelectModal";

const ModalAuto = ({ show, onClose }) => {
  return (
    <>
      <Modal
        show={show}
        onHide={onClose}
        backdrop="static"
        keyboard={false}
        size="lg"
      >
        <Modal.Header className="bg-info" closeButton>
          <Modal.Title className="fs-5">Добавляем автомобиль...</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {/* onSubmit={handleSubmit} */}
            <Form.Group
              as={Row}
              className="mb-3"
              controlId="exampleFormControlInput1"
            >
              <Form.Label column sm="8" className="text-muted">
                Введите дату планируемой работы
              </Form.Label>
              <Col sm="4">
                <Form.Control
                  type="date"
                  name="dateOfWork"
                  // value={data.dateOfWork}
                  // onChange={handleChangeDate}
                  // isInvalid={errors.dateOfWork}
                />
                <Form.Control.Feedback type="invalid">
                  {/* {errors &&
                    `${errors.dateOfWork} ${convertDate(getTommorow())}`} */}
                </Form.Control.Feedback>
              </Col>
            </Form.Group>
            <hr />
            <Row>
              <Form.Group as={Col}>
                <button
                  className="btn btn-primary"
                  // disabled={!isValid}
                  type="submit"
                >
                  Сохранить
                </button>{" "}
                <button
                  className="btn btn-secondary"
                  // disabled={!isValid}
                  type="button"
                  // onClick={onClose}
                >
                  Отмена
                </button>
              </Form.Group>
            </Row>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ModalAuto;
