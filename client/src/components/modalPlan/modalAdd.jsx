import React, { useState } from "react";
import CreatableSelect from "react-select/creatable";
import {
  Modal,
  Button,
  InputGroup,
  Form,
  Row,
  Col,
  FloatingLabel,
} from "react-bootstrap";
import { getToday, getTommorow } from "../../utils/DateFunctions";

const ModalAdd = ({ show, onShow, onClose, title, works }) => {
  // const [show, setShow] = useState(false);

  // const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);
  //console.log("works", works);
  //console.log("works[0].name", works[0].name);
  // worksOptions=

  const optionsArray = works.map((work) => ({
    label: work.name,
    value: work.id,
  }));

  // const handleChange = (value) => {
  //   onChange({ name: name, value });
  // };

  // const handleChange = (target) => {
  //   setData((prevState) => ({
  //       ...prevState,
  //       [target.name]: target.value
  //   }));
  const handleChange = (e) => {
    console.log(e);
  };

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
          <Modal.Title className="fs-5">Добавляем работу...</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group
              as={Row}
              className="mb-3"
              controlId="exampleFormControlInput1"
            >
              <Form.Label column sm="8" className="text-muted">
                Введите дату планируемой работы
              </Form.Label>
              <Col sm="4">
                <Form.Control type="date" value={getTommorow()} />
              </Col>
            </Form.Group>

            <Row className="mb-3">
              <Form.Label>Планируемые работы</Form.Label>
              <Form.Group as={Col} controlId="formGridEmail">
                <CreatableSelect
                  formatCreateLabel={(inputText) => `Добавить: "${inputText}"`}
                  isClearable
                  placeholder="Выберите или начните ввод..."
                  name="works"
                  // defaultOption=" Choose..."
                  options={optionsArray}
                  onChange={handleChange}
                  // value={works}
                />
              </Form.Group>
              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Check
                  type="checkbox"
                  label="Работы повышенной опасности"
                />
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group>
                <FloatingLabel
                  controlId="floatingInput"
                  label="Планируемые работы"
                  className="mb-3"
                >
                  <datalist id="datalistOptions">
                    {works &&
                      works.map((work) => {
                        // console.log(work.name);
                        <option key={work.id} value={work.name} />;
                      })}
                    {/* <option value="San Francisco" />
                      <option value="New York" />
                      <option value="Seattle" />
                      <option value="Los Angeles" />
                      <option value="Chicago" /> */}
                  </datalist>
                  <input
                    className="form-control"
                    list="datalistOptions"
                    id="exampleDataList"
                    placeholder="Планируемые работы"
                  />
                </FloatingLabel>
              </Form.Group>
            </Row>

            <Form.Group className="mb-3" controlId="formGridAddress1">
              <Form.Label>Address</Form.Label>
              <Form.Control placeholder="1234 Main St" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGridAddress2">
              <Form.Label>Address 2</Form.Label>
              <Form.Control placeholder="Apartment, studio, or floor" />
            </Form.Group>

            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridCity">
                <Form.Label>City</Form.Label>
                <Form.Control />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridState">
                <Form.Label>State</Form.Label>
                <Form.Select defaultValue="Choose...">
                  <option>Choose...</option>
                  <option>...</option>
                </Form.Select>
              </Form.Group>

              <Form.Group as={Col} controlId="formGridZip">
                <Form.Label>Zip</Form.Label>
                <Form.Control />
              </Form.Group>
            </Row>

            <Form.Group className="mb-3" id="formGridCheckbox">
              <Form.Check type="checkbox" label="Check me out" />
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
