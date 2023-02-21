import { Modal, Form, Row, Col } from "react-bootstrap";
import React, { useState } from "react";

const ModalPrintPlan = ({ show, onShow, onClose, department }) => {
  const initialData = department.map((item) => ({
    value: item.id,
    name: item.name,
    checked: true,
  }));
  const [data, setData] = useState(initialData);
  const [AllDepartments, SetAllDepartments] = useState(true);
  // console.log("modal print data", data);

  const handleCheck = ({ target }) => {
    // console.log("target id",target.id);
    // console.log("target value",target.value);
    // console.log("checked",target.checked);

    setData(
      data.map((item) =>
        item.value === Number(target.value)
          ? { ...item, checked: target.checked }
          : item
      )
    );
  };
  const handleCheckAllDepartments = ({ target }) => {
    SetAllDepartments(target.checked);
    setData(data.map((item) => ({ ...item, checked: target.checked })));
  };
  return (
    <>
      <Modal
        show={show}
        onHide={onClose}
        backdrop="static"
        keyboard={false}
        size="lg"
        // size="md"
      >
        <Modal.Header className="bg-info" closeButton>
          <Modal.Title className="fs-5">
            Выберите параметры для печати...
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {/* //onSubmit={onSubmit} */}
            <Row>
              <Col>
                <Form.Check
                  type="checkbox"
                  label="Все подразделения"
                  name="AllDepartments"
                  onChange={handleCheckAllDepartments}
                  id="AllDepartments"
                  value={AllDepartments}
                  checked={AllDepartments}
                />
              </Col>
            </Row>
            <hr />
            {data.map((item) => (
              <Row>
                <Col>
                  {/* <div className="form-check"> */}
                  <Form.Check
                    type="checkbox"
                    label={item.name}
                    name={item.name}
                    id={item.name + item.value}
                    onChange={handleCheck}
                    value={item.value}
                    // checked={data.isDanger}
                    checked={item.checked}
                  />
                  {/* </div> */}
                </Col>
              </Row>
            ))}
            <hr />
            <Row>
              <Form.Group as={Col}>
                <button
                  className="btn btn-primary"
                  // disabled={!isValid}
                  type="submit"
                >
                  Печать
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
