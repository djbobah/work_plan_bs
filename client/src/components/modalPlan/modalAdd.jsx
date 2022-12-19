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
import MultiSelectModal from "./multiSelectModal";

const ModalAdd = ({
  show,
  onShow,
  onClose,
  title,
  works,
  objects,
  auto,
  contractingOrganization,
  brigada,
}) => {
  const [data, setData] = useState({
    dateOfWork: getTommorow(),
    typeOfWork: "",
    isDanger: false,
    objectForWork: "",
    auto: null,
    methodOfWork: { name: "ss", checked: true },
    contractingOrganization: "",
    brigada: [],
    brigadier: "",
  });
  const [errors, setErrors] = useState({});

  let optionsBrigadier = [];
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
    // console.log("target.name ", data[target.name]["name"]);
    if (data[target.name]["name"] === "po") {
      setData((prevState) => ({
        ...prevState,
        [target.name]: { name: target.value, checked: target.checked },
        ["contractingOrganization"]: "",
      }));
      //   console.log("po");
    } else {
      console.log("ss");
      setData((prevState) => ({
        ...prevState,
        [target.name]: { name: target.value, checked: target.checked },
      }));
    }
    //console.log("target.value", target.value);
    // console.log(target.value);
  };

  const handleChangeBrigada = (target) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }));

    // optionsBrigadier = data.brigada.map((brigadier) => ({
    //   label: brigadier.name,
    //   value: brigadier.id,
    // }));
    // const optionsBrigadier = data.brigada;
    // console.log("data.brigada", data.brigada);
    // console.log("optionsBrigadier", optionsBrigadier);
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
      isRequiredPo: {
        message: "Наименование организации обязательно для заполнения",
      },
    },
  };
  useEffect(() => {
    validate();
  }, [data]);

  // useEffect(() => {
  //   optionsBrigadier = data.brigada;
  //   console.log("data.brigada", data.brigada);
  //   console.log("optionsBrigadier", optionsBrigadier);
  // }, [data.brigada]);

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
                  label="Выберите желаемый автомобиль(если необходимо)..."
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
                        : undefined
                    }
                    value={data.contractingOrganization}
                  />
                </Form.Group>
              )}
            </Row>
            <br />
            <Row className="mb-3">
              <Form.Group as={Col}>
                <Form.Label className="text-muted">Состав бригады</Form.Label>
                {/* <SelectModal
                  name="auto"
                  options={optionsAuto}
                  onChange={handleChange}
                  error={errors.auto}
                /> */}
                {/* {console.log("brigada", brigada)} */}
                <MultiSelectModal
                  onChange={handleChangeBrigada}
                  name="brigada"
                  options={brigada}
                />
              </Form.Group>{" "}
              <Form.Group as={Col}>
                <Form.Label className="text-muted">Старший</Form.Label>
                {console.log("optionsBrigadier", optionsBrigadier)}
                <SelectModal
                  name="brigadier"
                  label="Необходимо указать старшего бригады..."
                  options={optionsBrigadier}
                  onChange={handleChange}
                  error={errors.auto}
                />
              </Form.Group>
            </Row>
            <Row>
              {" "}
              <Form.Group className="mb-3">
                <Form.Label className="text-muted">Комментарий</Form.Label>
                <Form.Control as="textarea" rows={2} />
              </Form.Group>
            </Row>
            <hr />
            <Row>
              <Form.Group as={Col}>
                <button
                  className="btn btn-primary"
                  disabled={!isValid}
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

export default ModalAdd;
