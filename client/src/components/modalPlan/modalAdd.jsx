import React, { useState, useEffect } from "react";
import { validator } from "../../utils/validator";
// import CreatableSelect from "react-select/creatable";
import {
  Modal,
  Button,
  InputGroup,
  Form,
  Row,
  Col,
  FloatingLabel,
} from "react-bootstrap";
import { convertDate, getTommorow } from "../../utils/DateTimeFunctions";
import CreatableSelectModal from "./creatableSelectModal";
import SelectModal from "./selectModal";

const ModalAdd = ({
  show,
  onShow,
  onClose,
  title,
  works,
  objects,
  auto,
  contractingOrganization,
}) => {
  const [data, setData] = useState({
    dateOfWork: getTommorow(),
    typeOfWork: "",
    isDanger: false,
    objectForWork: "",
    auto: null,
    methodOfWork: { name: "ss", checked: true },
    contractingOrganization: "",
  });
  const [errors, setErrors] = useState({});

  const optionsTypeOfWorksArray = works.map((work) => ({
    label: work.name,
    value: work.id,
  }));

  const optionsObjectForWork = objects.map((object) => ({
    label: object.name,
    value: object.id,
  }));
  const optionsAuto = auto.map((auto) => ({
    label: auto.name,
    value: auto.id,
  }));
  const optionsContractingOrganization = contractingOrganization.map(
    (contract) => ({
      label: contract.name,
      value: contract.id,
    })
  );
  const handleChangeDate = ({ target }) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }));
    console.log(target.value);
  };

  const handleCheck = ({ target }) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.checked,
    }));
    console.log(target.checked);
  };
  const handleRadio = ({ target }) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: { name: target.value, checked: target.checked },
    }));
    // console.log(target.value);
  };

  const handleChange = (target) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }));
    // console.log(target);
  };

  const validatorConfig = {
    dateOfWork: {
      isCorrectDate: {
        message: "Дата не может быть меньше ",
      },
    },
    typeOfWork: {
      isRequired: { message: "Работа обязательна для заполнения" },
    },
    objectForWork: {
      isRequired: {
        message: "Место проведения работ обязательно для заполнения",
      },
    },
    auto: {
      // isCorrectDateAuto: {
      //   message: "Вы не можете заказать автомобиль на указанную дату ",
      // },
      isCorrectTimeAuto: {
        message:
          "Сегодня вы уже не можете заказать автомобиль. Ограничение по времени пн-чт до 15:00, пт до 14:00",
      },
    },

    contractingOrganization: {
      isRequired: {
        message: "Наименование организации обязательно для заполнения",
      },
    },
  };
  useEffect(() => {
    validate();
  }, [data]);

  const validate = () => {
    const errors = validator(data, validatorConfig);
    console.log("errors", errors);
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };
  const isValid = Object.keys(errors).length === 0;

  // const isValid = false;
  const handleSubmit = (e) => {
    e.preventDefault();
    // const isValid = validate();
    // if (!isValid) return;

    console.log(data);
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
          <Form onSubmit={handleSubmit}>
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
                  value={data.dateOfWork}
                  onChange={handleChangeDate}
                  isInvalid={errors.dateOfWork}
                />
                <Form.Control.Feedback type="invalid">
                  {errors &&
                    `${errors.dateOfWork} ${convertDate(getTommorow())}`}
                </Form.Control.Feedback>
              </Col>
            </Form.Group>
            <Row className="mb-3">
              <Form.Label className="text-muted">Планируемые работы</Form.Label>
              <Form.Group as={Col}>
                <CreatableSelectModal
                  name="typeOfWork"
                  options={optionsTypeOfWorksArray}
                  onChange={handleChange}
                  error={errors.typeOfWork}
                />
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Check
                  type="checkbox"
                  label="Работы повышенной опасности"
                  name="isDanger"
                  onChange={handleCheck}
                />
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Label className="text-muted">
                Место проведения работ
              </Form.Label>
              <Form.Group as={Col}>
                <CreatableSelectModal
                  name="objectForWork"
                  options={optionsObjectForWork}
                  onChange={handleChange}
                  error={errors.objectForWork}
                />
              </Form.Group>
            </Row>{" "}
            <Row className="mb-3">
              <Form.Label className="text-muted">
                Задействованный транспорт
              </Form.Label>
              <Form.Group as={Col}>
                <SelectModal
                  name="auto"
                  options={optionsAuto}
                  onChange={handleChange}
                  error={errors.auto}
                />
              </Form.Group>
            </Row>
            <hr />
            <Row>
              {" "}
              <Form.Group as={Col}>
                <Form.Label className="text-muted">
                  Способ проведения работ
                </Form.Label>
                <Form.Check
                  // inline
                  label="Собственными силами"
                  name="methodOfWork"
                  type="radio"
                  id="ss"
                  onChange={handleRadio}
                  value="ss"
                  checked={data.methodOfWork.name === "ss"}
                  //  checked
                />
                <Form.Check
                  // inline
                  label="Подрядная организация"
                  name="methodOfWork"
                  type="radio"
                  id="po"
                  value="po"
                  onChange={handleRadio}
                  checked={data.methodOfWork.name === "po"}
                />
              </Form.Group>
              {data.methodOfWork.name === "po" && (
                <Form.Group as={Col}>
                  <Form.Label className="text-muted">
                    Наименование подрядной организации
                  </Form.Label>
                  <CreatableSelectModal
                    name="contractingOrganization"
                    options={optionsContractingOrganization}
                    onChange={handleChange}
                    error={
                      data.methodOfWork.name === "po"
                        ? errors.contractingOrganization
                        : ""
                    }
                  />
                </Form.Group>
              )}
            </Row>
            <Form.Group className="mb-3" controlId="formGridAddress1">
              <Form.Label>Address</Form.Label>
              <Form.Control placeholder="1234 Main St" />
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
            <button
              className="btn btn-primary"
              disabled={!isValid}
              type="submit"
            >
              Сохранить
            </button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          {/* <Button variant="secondary" onClick={onClose}>
            Закрыть
          </Button> */}
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalAdd;
