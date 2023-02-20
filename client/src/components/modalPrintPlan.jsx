import { Modal, Form, Row, Col } from "react-bootstrap";
import React from "react";

const ModalPrintPlan = ({ show, onShow, onClose }) => {
  console.log("modal print plan show", show);
  return (
    <>
      <Modal
        show={show}
        onHide={onClose}
        backdrop="static"
        keyboard={false}
        size="md"
        // size="md"
      >
        <Modal.Header className="bg-info" closeButton>
          <Modal.Title className="fs-5">
            Выберите параметры для печати...
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {" "}
            {/* //onSubmit={onSubmit} */}
            <Row className="mb-2">
              <Col>
                <Form.Label className="text-muted">Подразделение:</Form.Label>
              </Col>
              {/* <Col className="text-end">
                <Form.Text className="text-primary fs-6  ">
                  {filteredDepartment?.name}
                </Form.Text>
              </Col> */}
            </Row>
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
                  onClick={onClose}
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

export default ModalPrintPlan;
